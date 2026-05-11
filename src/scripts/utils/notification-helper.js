import CONFIG from '../config';
import { postSubscribeNotification, deleteUnsubscribeNotification } from '../data/api';

const NotificationHelper = {
  async sendSubscriptionToServer(subscription) {
    try {
      const response = await postSubscribeNotification(subscription);
      console.log('Successfully subscribed to push notifications:', response);
    } catch (error) {
      console.error('Failed to subscribe to push notifications:', error);
    }
  },

  async sendUnsubscriptionToServer(endpoint) {
    try {
      const response = await deleteUnsubscribeNotification(endpoint);
      console.log('Successfully unsubscribed from push notifications:', response);
    } catch (error) {
      console.error('Failed to unsubscribe from push notifications:', error);
    }
  },

  async isSubscribed() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return !!subscription;
  },

  async subscribe() {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this._urlBase64ToUint8Array(CONFIG.PUSH_MSG_VAPID_PUBLIC_KEY),
      });
      await this.sendSubscriptionToServer(subscription);
      return true;
    } catch (error) {
      console.error('Could not subscribe to push notifications', error);
      return false;
    }
  },

  async unsubscribe() {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      await subscription.unsubscribe();
      await this.sendUnsubscriptionToServer(subscription.endpoint);
      return true;
    }
    return false;
  },

  _urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  },
};

export default NotificationHelper;
