var staticCacheName = "pwa-v" + new Date().getTime();
var filesToCache = [
    '/',

    'assets/vendor/aos/aos.css',
    'assets/vendor/bootstrap/css/bootstrap.min.css',
    'assets/vendor/bootstrap-icons/bootstrap-icons.css',
    'assets/vendor/boxicons/css/boxicons.min.css',
    'assets/vendor/glightbox/css/glightbox.min.css',
    'assets/vendor/swiper/swiper-bundle.min.css',
    'assets/css/style.css',

    'assets/img/hero-bg.jpg',
    'assets/img/profile-img.jpg',
    'assets/img/service/laravel.svg',
    'assets/img/service/codeigniter.png',
    'assets/img/service/wordpress.png',
    'assets/img/service/php.svg',
    'assets/img/service/bootstrap.png',
    'assets/img/service/jquery.jpg',
    'assets/img/service/git.png',
    'assets/img/service/composer.png',
    'assets/img/testimonials/jigar-patel.jpg',
    'assets/img/testimonials/tanay-sharma.jpg',
    'assets/img/testimonials/bhavin-gajjar.jpg',
    'assets/img/testimonials/prashant-shah.jpg',
    'assets/img/testimonials/monika-prajapati.jpg',
    'assets/img/testimonials/karan-dave.jpg',
    'assets/img/testimonials/karan-dave.jpg',
    'assets/img/testimonials/rajnesh-rathor.jpg',
    'assets/img/testimonials/fenil-chauhan.jpg',
    'assets/img/hero-bg.jpg',

    'assets/vendor/aos/aos.js',
    'assets/vendor/bootstrap/js/bootstrap.bundle.min.js',
    'assets/vendor/glightbox/js/glightbox.min.js',
    'assets/vendor/isotope-layout/isotope.pkgd.min.js',
    'assets/vendor/php-email-form/validate.js',
    'assets/vendor/purecounter/purecounter.js',
    'assets/vendor/swiper/swiper-bundle.min.js',
    'assets/vendor/typed.js/typed.min.js',
    'assets/vendor/waypoints/noframework.waypoints.js',
    'assets/js/main.js',
    'assets/js/darkmode-js.min.js',
];

// Cache on install
self.addEventListener("install", event => {
  this.skipWaiting();
  event.waitUntil(
      caches.open(staticCacheName)
          .then(cache => {
            return cache.addAll(filesToCache);
          })
  )
});

// Clear cache on activate
self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
            cacheNames
                .filter(cacheName => (cacheName.startsWith("pwa-")))
                .filter(cacheName => (cacheName !== staticCacheName))
                .map(cacheName => caches.delete(cacheName))
        );
      })
  );
});

// Serve from Cache
self.addEventListener("fetch", event => {
  if (event.request.method === "POST") {
    return;
  }
  event.respondWith(
      caches.match(event.request)
          .then(response => {
            return response || fetch(event.request);
          })
          .catch(() => {
            return caches.match('/');
          })
  )
});