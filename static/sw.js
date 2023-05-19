self.addEventListener('install', (e) => {
	e.waitUntil(caches.open('brain-store').then((cache) => cache.addAll(['/favicon.png'])));
});

self.addEventListener('fetch', (e) => {
	console.log(e.request.url);
	e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});
