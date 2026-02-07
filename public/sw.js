/* eslint-disable no-restricted-globals */
self.addEventListener('push', function(event) {
  const data = event.data?.json() || {};
  const title = data.title || 'UPS Planner';
  const options = {
    body: data.message || 'Nueva notificación del sistema',
    icon: '/vite.svg',
    badge: '/vite.svg',
    data: data.url
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.notification.data) {
    event.waitUntil(
      clients.openWindow(event.notification.data)
    );
  }
});
