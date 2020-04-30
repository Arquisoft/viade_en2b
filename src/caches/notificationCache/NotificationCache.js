export default {
  notifications: [],
  async getNotifications(callback) {
    return this.notifications;
  },
  setNotifications(result) {
    this.notifications = result;
  },
  clear() {
    this.notifications = [];
  },
};
