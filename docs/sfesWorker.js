var cachepages = [
    "/",
    "/assets/main.min.js",
    "/assets/style.min.css",
    "/assets/img/andro_icon_144.png",
    "/assets/img/andro_icon_600.png",
    "/assets/img/X-SUIRAN-t-144-f-fs8.png",
    "/assets/img/X-SUIRAN-t-600-f-fs8.png",
    "/assets/img/TwitterCard7.png",
    "/assets/fonts/GenShinGothic-Heavy.woff2",
    "/assets/fonts/GenShinGothic-Bold.woff2",
    "/assets/fonts/GenShinGothic-Medium.woff2",
    "/assets/fonts/GenShinGothic-Regular.woff2",
    "/assets/fonts/GenShinGothic-Normal.woff2",
    "/assets/fonts/GenShinGothic-Light.woff2",
    "/api/v1/index.json",
    "/manifest.json",
    "/notices",
    "/access",
    "/pantene",
    "/food",
    "/food?tab=stall",
    "/food?tab=bakery",
    "/food?tab=cafe",
    "/events",
    "/events?tab=stage",
    "/events?tab=gym",
    "/events?tab=kaikan",
    "/goods",
    "/invmatch",
    "/invmatch?tab=day1",
    "/invmatch?tab=day2",
    "/radio",
    "/about",
    "/pantene?modal=pantene_modal_wanage",
    "/pantene?modal=pantene_modal_paperplane",
    "/pantene?modal=pantene_modal_PhotoArt",
    "/pantene?modal=pantene_modal_bokemon",
    "/pantene?modal=pantene_modal_Western",
    "/pantene?modal=pantene_modal_sugoroku",
    "/pantene?modal=pantene_modal_HumanScience",
    "/pantene?modal=pantene_modal_SSSH",
    "/pantene?modal=pantene_modal_magnet",
    "/pantene?modal=pantene_modal_cheering",
    "/pantene?modal=pantene_modal_newspaper",
    "/pantene?modal=pantene_modal_alpine",
    "/pantene?modal=pantene_modal_palace",
    "/pantene?modal=pantene_modal_fortune_telling",
    "/pantene?modal=pantene_modal_casino",
    "/pantene?modal=pantene_modal_arashi",
    "/pantene?modal=pantene_modal_cafe1",
    "/pantene?modal=pantene_modal_cafe2",
    "/pantene?modal=pantene_modal_Home",
    "/pantene?modal=pantene_modal_tsushin2",
    "/pantene?modal=pantene_modal_tsushin1",
    "/pantene?modal=pantene_modal_tekken",
    "/pantene?modal=pantene_modal_mathematics",
    "/pantene?modal=pantene_modal_physics",
    "/pantene?modal=pantene_modal_chemistry",
    "/pantene?modal=pantene_modal_IgoShogi",
    "/pantene?modal=pantene_modal_literary",
    "/events?tab=stage&collapse=event_collapse_stage_Otokogumi_1",
    "/events?tab=stage&collapse=event_collapse_stage_Ms_THS_Con_preA",
    "/events?tab=stage&collapse=event_collapse_stage_Quiz_SUIRAN",
    "/events?tab=stage&collapse=event_collapse_stage_Ms_THS_Con_preB",
    "/events?tab=stage&collapse=event_collapse_stage_Comedians_Acrobats_andOthers",
    "/events?tab=stage&collapse=event_collapse_stage_Ms_THS_Con_preC",
    "/events?tab=stage&collapse=event_collapse_stage_Otokogumi_2",
    "/events?tab=stage&collapse=event_collapse_stage_Maji_Singers_Cup",
    "/events?tab=stage&collapse=event_collapse_stage_Muscle_Kingdom",
    "/events?tab=stage&collapse=event_collapse_stage_Champion_of_THS",
    "/events?tab=stage&collapse=event_collapse_stage_Yasai",
    "/events?tab=stage&collapse=event_collapse_stage_Ms_THS_Con_FINAL",
    "/events?tab=stage&collapse=event_collapse_stage_Grand_Finale",
    "/events?tab=gym&collapse=event_collapse_gym_SUIRAN_STATION",
    "/events?tab=kaikan&collapse=event_collapse_kaikan_TWO_1stDay",
    "/invmatch?collapse=invmatch_collapse_BasketBall_1stDay",
    "/invmatch?collapse=invmatch_collapse_BaseBall_2ndDay",

];
var version = '2.0.0-delta.1';
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