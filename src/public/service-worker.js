const CACHE_NAME = 'story-app-v1';
const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'favicon.png',
  'images/logo.png',
  'manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
];

const DB_NAME = 'story-app-db';
const STORE_NAME_OUTBOX = 'outbox';

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching App Shell...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Strategy for API Data (Stale-While-Revalidate)
  if (url.hostname === 'story-api.dicoding.dev') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchedResponse = fetch(request).then((networkResponse) => {
            // Only cache GET requests
            if (request.method === 'GET' && networkResponse.status === 200) {
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => {
            // If network fails and no cache, return error or fallback
            return cachedResponse;
          });

          return cachedResponse || fetchedResponse;
        });
      })
    );
    return;
  }

  // Strategy for App Shell and Assets (Cache-First)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        // Cache new assets on the fly
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Offline fallback for navigation
        if (request.mode === 'navigate') {
          return caches.match('index.html');
        }
      });
    })
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-stories') {
    console.log('[Service Worker] Syncing new stories...');
    event.waitUntil(syncStories());
  }
});

async function syncStories() {
  const db = await openDB();
  const stories = await getAllFromOutbox(db);
  
  for (const story of stories) {
    try {
      const formData = new FormData();
      formData.append('description', story.value.description);
      formData.append('photo', story.value.photo);
      if (story.value.lat) formData.append('lat', story.value.lat);
      if (story.value.lon) formData.append('lon', story.value.lon);

      const response = await fetch('https://story-api.dicoding.dev/v1/stories', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${story.value.token}`,
        },
        body: formData,
      });

      const result = await response.json();
      if (!result.error) {
        console.log('[Service Worker] Successfully synced story:', story.key);
        await deleteFromOutbox(db, story.key);
      }
    } catch (error) {
      console.error('[Service Worker] Failed to sync story:', story.key, error);
    }
  }
}

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function getAllFromOutbox(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME_OUTBOX, 'readonly');
    const store = transaction.objectStore(STORE_NAME_OUTBOX);
    const request = store.openCursor();
    const results = [];
    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        results.push({ key: cursor.key, value: cursor.value });
        cursor.continue();
      } else {
        resolve(results);
      }
    };
    request.onerror = () => reject(request.error);
  });
}

function deleteFromOutbox(db, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME_OUTBOX, 'readwrite');
    const store = transaction.objectStore(STORE_NAME_OUTBOX);
    const request = store.delete(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

self.addEventListener('push', (event) => {
  console.log('[Service Worker] Push Received.');

  const data = event.data ? event.data.json() : {};
  const title = data.title || 'New Notification';
  const options = {
    body: data.options?.body || 'You have a new message.',
    icon: data.options?.icon || 'favicon.png',
    badge: data.options?.badge || 'favicon.png',
    data: data.options?.data || {},
    actions: [
      {
        action: 'view-detail',
        title: 'Lihat Detail',
      },
    ],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;

  notification.close();

  // Extract story ID from data.url if it exists
  // Example URL: https://story-api.dicoding.dev/v1/stories/story-id
  let targetUrl = './#/';
  if (notification.data && notification.data.url) {
    const segments = notification.data.url.split('/');
    const storyId = segments[segments.length - 1];
    if (storyId) {
      targetUrl = `./#/detail/${storyId}`;
    }
  }

  if (action === 'view-detail' || !action) {
    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
        for (let i = 0; i < windowClients.length; i++) {
          const client = windowClients[i];
          // Check if the client is already at the targetUrl or just any app window
          if (client.url.includes(location.origin) && 'focus' in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
    );
  }
});
