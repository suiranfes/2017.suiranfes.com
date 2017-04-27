this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v2').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/404.html',
        '/about.html',
        '/access.html',
        '/events.html',
        '/food.html',
        '/goods.html',
        '/invmatch.html',
        '/pantene.html',
        '/radio.html',
        '/favicon.ico',
        '/favicon.png',
        '/assets/',
        '/assets/main.min.js',
        '/assets/style.min.css',
        '/assets/img/',
        '/assets/img/TwitterCard7.png',
        '/assets/img/X-SUIRAN-t-600-f-fs8.png',
        '/api/',
        '/api/v1/',
        '/api/v1/index.json'
      ]);
    })
  );
});
this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(
        function (response) {
          if (response) {
            return response;
          }
          return fetch(event.request);
        })
  );
});
this.addEventListener('activate', function(event) {
  var cacheWhitelist = ['v2'];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
});