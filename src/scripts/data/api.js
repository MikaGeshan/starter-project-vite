import CONFIG from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  NOTIFICATIONS_SUBSCRIBE: `${CONFIG.BASE_URL}/notifications/subscribe`,
  NOTIFICATIONS_UNSUBSCRIBE: `${CONFIG.BASE_URL}/notifications/unsubscribe`,
};

export async function postRegister({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  });
  return await response.json();
}

export async function postLogin({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  return await response.json();
}

export async function postStory({ description, photo, lat, lon }) {
  const token = localStorage.getItem('user_token');
  const formData = new FormData();
  formData.append('description', description);
  formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);

  const response = await fetch(ENDPOINTS.STORIES, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return await response.json();
}

export async function getData() {
  const token = localStorage.getItem('user_token');
  const response = await fetch(`${ENDPOINTS.STORIES}?location=1`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function getDetailData(id) {
  const token = localStorage.getItem('user_token');
  const response = await fetch(`${ENDPOINTS.STORIES}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
}

export async function postSubscribeNotification(subscription) {
  const token = localStorage.getItem('user_token');
  const response = await fetch(ENDPOINTS.NOTIFICATIONS_SUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });
  return await response.json();
}

export async function postUnsubscribeNotification(endpoint) {
  const token = localStorage.getItem('user_token');
  const response = await fetch(ENDPOINTS.NOTIFICATIONS_UNSUBSCRIBE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint }),
  });
  return await response.json();
}