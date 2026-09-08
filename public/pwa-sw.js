self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('tst-v1').then(cache =>
            cache.addAll([
                '/',
                '/audio/',
                '/styles.css'
            ])
        )
    );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(caches.match(e.request).then((r) => r || fetch(e.request)));
});

// notification
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Mở app và chuyển thẳng hướng tới anchor #calendar
  event.waitUntil(clients.openWindow("/#calendar"));
});
