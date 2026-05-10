import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';
import NotificationHelper from '../utils/notification-helper';

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;
  #header = null;

  constructor({ navigationDrawer, drawerButton, content, header }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;
    this.#header = header;

    this.#setupDrawer();
  }

  #setupDrawer() {
    // Skip to content focus management
    const skipLink = document.querySelector('.skip-to-content');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        this.#content.setAttribute('tabindex', '-1');
        this.#content.focus();
        window.scrollTo(0, 0);
      });
    }

    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
      const isOpen = this.#navigationDrawer.classList.contains('open');
      this.#drawerButton.setAttribute('aria-expanded', isOpen);
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        if (this.#navigationDrawer.classList.contains('open')) {
          this.#navigationDrawer.classList.remove('open');
          this.#drawerButton.setAttribute('aria-expanded', 'false');
        }
      }

      this.#navigationDrawer.querySelectorAll('a, button').forEach((link) => {
        if (link.contains(event.target)) {
          // Don't close drawer if it's the notification toggle
          if (link.id === 'notification-toggle') return;

          this.#navigationDrawer.classList.remove('open');
          this.#drawerButton.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.#navigationDrawer.classList.contains('open')) {
        this.#navigationDrawer.classList.remove('open');
        this.#drawerButton.setAttribute('aria-expanded', 'false');
        this.#drawerButton.focus();
      }
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    this.#manageHeaderVisibility(url);
    await this.#renderNavigation();

    const updateContent = async () => {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    };

    if (!document.startViewTransition) {
      await updateContent();
      return;
    }

    document.startViewTransition(() => updateContent());
  }

  async #renderNavigation() {
    const navList = document.querySelector('#nav-list');
    const token = localStorage.getItem('user_token');

    const commonLinks = `
      <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/">Beranda</a></li>
      <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/favorite">Favorit</a></li>
      <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/about">About</a></li>
    `;

    if (token) {
      const isSubscribed = await NotificationHelper.isSubscribed();
      navList.innerHTML = `
        ${commonLinks}
        <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/add">Tambah Cerita</a></li>
        <li>
          <button id="notification-toggle" class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all flex items-center gap-2 w-full lg:w-auto cursor-pointer" aria-label="Toggle Push Notification">
            <span id="notification-icon">${isSubscribed ? '🔔' : '🔕'}</span>
            <span id="notification-text">${isSubscribed ? 'Disable Notification' : 'Enable Notification'}</span>
          </button>
        </li>
        <li><button id="logout-button" class="px-6 py-2 ml-0 lg:ml-4 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 hover:scale-105 active:scale-95 transition-all block w-full lg:w-auto text-center shadow-lg cursor-pointer" aria-label="Logout dari aplikasi">Logout</button></li>
      `;

      this.#setupNotificationToggle();

      document.querySelector('#logout-button').addEventListener('click', () => {
        localStorage.removeItem('user_token');
        window.location.hash = '#/login';
      });
    } else {
      navList.innerHTML = `
        ${commonLinks}
        <li><a class="px-4 py-2 rounded-xl text-gray-800 font-bold hover:bg-white/40 lg:hover:bg-black/5 transition-all block" href="#/register">Register</a></li>
        <li><a class="px-6 py-2 ml-0 lg:ml-4 rounded-full bg-gray-900 text-white font-bold hover:bg-gray-800 hover:scale-105 active:scale-95 transition-all block text-center shadow-lg" href="#/login">Login</a></li>
      `;
    }
  }

  #setupNotificationToggle() {
    const notificationToggle = document.querySelector('#notification-toggle');
    const notificationIcon = document.querySelector('#notification-icon');
    const notificationText = document.querySelector('#notification-text');

    notificationToggle.addEventListener('click', async () => {
      const isSubscribed = await NotificationHelper.isSubscribed();

      if (isSubscribed) {
        const success = await NotificationHelper.unsubscribe();
        if (success) {
          notificationIcon.innerText = '🔕';
          notificationText.innerText = 'Enable Notification';
        }
      } else {
        const success = await NotificationHelper.subscribe();
        if (success) {
          notificationIcon.innerText = '🔔';
          notificationText.innerText = 'Disable Notification';
        } else {
          alert('Failed to subscribe to notifications. Please check your browser settings.');
        }
      }
    });
  }

  #manageHeaderVisibility(url) {
    const authRoutes = ['/login', '/register'];
    if (authRoutes.includes(url)) {
      this.#header.style.display = 'none';
    } else {
      this.#header.style.display = 'block';
    }
  }
}

export default App;
