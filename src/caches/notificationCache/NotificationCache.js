export default {
  notifications: [],
  async getNotifications(callback) {
    return this.notifications;
  },
  getNotificationByUrl(url) {
    console.log('INSIDE THE CACHE METHOD');
    console.log(url);
    
    let b = [];
    this.notifications.then().forEach((a) => {b.push(a)});
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    console.log(this.notifications);
    console.log(b);

    this.notifications.forEach(n => console.log('A'));

    for(let i = 0; i<this.notifications.length ; i++){
      const urlNot = this.notifications[i].urlNotification;
      console.log(urlNot);
      if (urlNot === url){
        return this.notifications[i];
      }
    }
    
    return null;
  },
  setNotifications(result) {
    this.notifications.push(result);
  },
  clear() {
    this.notifications = [];
  },
};
