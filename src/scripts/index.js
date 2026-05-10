// CSS imports
import '../styles/styles.css';

import App from './pages/app';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
    header: document.querySelector('header'),
  });

  if (!window.location.hash) {
    window.location.hash = '#/login';
  }

  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });

  // Register Service Worker
  if ('serviceWorker' in navigator) {
    try {
      await navigator.serviceWorker.register('./service-worker.js');
      console.log('Service Worker registered successfully.');
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
});
