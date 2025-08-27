// Service Worker Sederhana untuk PWA

const CACHE_NAME = 'kontrol-cerdas-cache-v1';
const urlsToCache = [
  '/',
  'kontrol.html',
  // Anda bisa menambahkan file lain di sini jika ada, misal file CSS atau gambar
];

// Event 'install': menyimpan file-file penting ke cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache dibuka');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event 'fetch': menyajikan file dari cache jika offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika file ada di cache, berikan dari cache. Jika tidak, ambil dari jaringan.
        return response || fetch(event.request);
      })
  );
});
