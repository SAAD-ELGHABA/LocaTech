let notifications = [];
const subscribers = new Set();

export function sendNotification(notification) {
  const notif = {
    id: Date.now(),
    message: notification,
    date: new Date().toLocaleString(),
  };
  notifications.push(notif);
  subscribers.forEach((cb) => cb([...notifications]));
}

export function subscribe(callback) {
  subscribers.add(callback);
  callback([...notifications]); // initial state
  return () => subscribers.delete(callback); // unsubscribe
}
