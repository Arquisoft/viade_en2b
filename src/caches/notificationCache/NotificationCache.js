

export default {
  notifications: [], 
  async getNotifications(callback) {
    if (this.routes.length !== 0) {
      return this.notifications;
    }
    
  },
  
  clear() {
    this.notifications = [];
  }
};
