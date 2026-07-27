const CACHE_NAME = "excelsior-league-v1";

const ASSETS_TO_CACHE = [
  "./", "./index.html", "./fixtures.html", "./match.html", "./teams.html",
  "./team.html", "./table.html", "./stats.html", "./news.html", "./article.html",
  "./admin.html", "./css/style.css",
  "./js/firebase-config.js", "./js/firebase-init.js", "./js/league-data.js",
  "./js/utils.js", "./js/standings.js", "./js/fixture-row.js", "./js/nav.js",
  "./js/live-banner.js", "./js/home.js", "./js/fixtures.js", "./js/match.js",
  "./js/teams.js", "./js/team.js", "./js/table.js", "./js/stats.js",
  "./js/news.js", "./js/article.js", "./js/admin.js",
  "./manifest.json", "./icons/icon-192.png", "./icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  if (new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => {
          if (event.request.mode === "navigate") return caches.match("./index.html");
        });
    })
  );
});
