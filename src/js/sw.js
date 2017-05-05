this.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
  event.waitUntil(
    caches.open(version).then(function(cache) {
      return cache.addAll(cachepages);
    })
  );
});
this.addEventListener('fetch', function(event) {
  var cacheWhitelist = [version];

  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (cacheWhitelist.indexOf(key) === -1) {
          return caches.delete(key)
        }
      }))
    })
  )
  event.respondWith(
    caches.match(event.request)
      .then(
        function (response) {
          if (response) {
            this.registration.update();
            return response;
          }
                  let fetchRequest = event.request.clone();

                  return fetch(fetchRequest)
                      .then((response) => {
                          if (!response || response.status !== 200 || response.type !== 'basic') {
                              return response;
                          }
                          let responseToCache = response.clone();

                          caches.open(version)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                          return response;
                      });
              })
  );
});

this.addEventListener('activate', function(event) {
    event.waitUntil(self.clients.claim());
  });