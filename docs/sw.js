this.addEventListener('install', function(event) {
  event.waitUntil(self.skipWaiting());
  event.waitUntil(
    caches.open('v5').then(function(cache) {
      return cache.addAll([
        '/',
        '/.htaccess',
        '/index.html',
        '/404.html',
        '/about.html',
        '/access.html',
        '/events.html',
        '/food.html',
        '/goods.html',
        '/invmatch.html',
        '/notices.html',
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
        '/assets/img/X-SUIRAN-t-144-f-fs8.png',
        '/assets/img/andro_icon_600.png',
        '/assets/img/andro_icon_144.png',
        '/api/',
        '/api/v1/',
        '/api/v1/index.json',
        '/files/',
        '/files/2017/',
        '/files/2017/bgimages/',
        '/files/2017/bgimages/v2.0/',
        '/files/2017/bgimages/v2.0/background-g.png',
        '/files/2017/bgimages/v2.0/background-n.png',
        '/files/2017/bgimages/v2.0/background-s.png',
        '/files/2017/font-awesome/',
        '/files/2017/font-awesome/4.7.0/',
        '/files/2017/font-awesome/4.7.0/fonts/',
        '/files/2017/font-awesome/4.7.0/fonts/fontawesome-webfont.woff2',
        '/files/2017/font-awesome/4.7.0/css/',
        '/files/2017/font-awesome/4.7.0/css/font-awesome.min.css',
        '/files/2017/icons/',
        '/files/2017/icons/v1.1.1/',
        '/files/2017/icons/v1.1.1/thsicons.css',
        '/files/2017/icons/v1.1.1/fonts/',
        '/files/2017/icons/v1.1.1/fonts/icomoon.woff2',
        '/files/2017/img/',
        '/files/2017/img/top/',
        '/files/2017/img/top/saya_modified5.svg',
        '/files/2017/img/top/saya_modified5.svgz',
        '/files/2017/img/top/poster2017_ex.jpg'
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
                  let fetchRequest = event.request.clone();

                  return fetch(fetchRequest)
                      .then((response) => {
                          if (!response || response.status !== 200 || response.type !== 'basic') {
                              return response;
                          }
                          let responseToCache = response.clone();

                          caches.open(CACHE_NAME)
                                .then((cache) => {
                                    cache.put(event.request, responseToCache);
                                });

                          return response;
                      });
              })
  );
});
this.addEventListener('fetch', function(event) {
  var cacheWhitelist = ['v5'];

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