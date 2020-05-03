export default {
  notifications: [],
  async getNotifications(callback) {
    return this.notifications;
  },
  setNotifications(result) {
    this.notifications.push(result);
  },
  clear() {
    this.notifications = [];
  },
};
