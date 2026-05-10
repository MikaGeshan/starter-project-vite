const DB_NAME = 'story-app-db';
const DB_VERSION = 1;
const STORE_NAME_FAVORITES = 'favorites';
const STORE_NAME_OUTBOX = 'outbox';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME_FAVORITES)) {
        db.createObjectStore(STORE_NAME_FAVORITES, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_NAME_OUTBOX)) {
        db.createObjectStore(STORE_NAME_OUTBOX, { autoIncrement: true });
      }
    };
  });
};

const DBHelper = {
  // Favorites Methods
  async getAllFavorites() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME_FAVORITES, 'readonly');
      const store = transaction.objectStore(STORE_NAME_FAVORITES);
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async getFavorite(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME_FAVORITES, 'readonly');
      const store = transaction.objectStore(STORE_NAME_FAVORITES);
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async putFavorite(story) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME_FAVORITES, 'readwrite');
      const store = transaction.objectStore(STORE_NAME_FAVORITES);
      const request = store.put(story);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async deleteFavorite(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME_FAVORITES, 'readwrite');
      const store = transaction.objectStore(STORE_NAME_FAVORITES);
      const request = store.delete(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  // Outbox Methods (for Background Sync)
  async addToOutbox(storyData) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME_OUTBOX, 'readwrite');
      const store = transaction.objectStore(STORE_NAME_OUTBOX);
      const request = store.add(storyData);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },

  async getAllFromOutbox() {
    const db = await openDB();
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
  },

  async deleteFromOutbox(key) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME_OUTBOX, 'readwrite');
      const store = transaction.objectStore(STORE_NAME_OUTBOX);
      const request = store.delete(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  },
};

export default DBHelper;
