const CACHE_NAME = 'version-1';

const urlsToCache = [
    'index.html',
    'favicon.ico',
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            console.log('Openend cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
            return fetch(event.request);
        })
    );
});


self.addEventListener('activate', function(event) {
    const cacheWhitelist = [];
    cacheWhitelist.push(CACHE_NAME);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheNames) {
                    if (!cacheWhitelist.includes(cacheNames)) {
                        return caches.delete(cacheNames);
                    }
                })
            );
        })
    );
});

