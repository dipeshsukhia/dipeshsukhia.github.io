var staticCacheName = "pwa-v" + new Date().getTime();
var filesToCache = [
    '/',

    'manifest.json',
    'assets/vendor/aos/aos.css',
    'assets/vendor/bootstrap/css/bootstrap.min.css',
    'assets/vendor/bootstrap-icons/bootstrap-icons.css',
    'assets/vendor/boxicons/css/boxicons.min.css',
    'assets/vendor/glightbox/css/glightbox.min.css',
    'assets/vendor/swiper/swiper-bundle.min.css',
    'assets/css/style.css',
    'assets/vendor/boxicons/fonts/boxicons.woff2',
    'assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff2?856008caa5eb66df68595e734e59580d',
    'assets/vendor/bootstrap-icons/fonts/bootstrap-icons.woff?856008caa5eb66df68595e734e59580d',
    'assets/vendor/boxicons/fonts/boxicons.woff',

    'assets/img/favicon/favicon.png',
    'assets/img/favicon/android-launchericon-512-512.png',
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
    'assets/img/testimonials/hemali-gadani.jpg',
    'assets/img/testimonials/jigar-patel.jpg',
    'assets/img/testimonials/viral-panchal.jpg',
    'assets/img/testimonials/vatsal-rami.jpg',
    'assets/img/testimonials/desai-richa.jpg',
    'assets/img/testimonials/nikita-vagadiya.jpg',
    'assets/img/testimonials/tanay-sharma.jpg',
    'assets/img/testimonials/bhavin-gajjar.jpg',
    'assets/img/testimonials/prashant-shah.jpg',
    'assets/img/testimonials/monika-prajapati.jpg',
    'assets/img/testimonials/karan-dave.jpg',
    'assets/img/testimonials/rajnesh-rathor.jpg',
    'assets/img/testimonials/fenil-chauhan.jpg',

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

    /*'https://fonts.gstatic.com/s/raleway/v22/1Ptug8zYS_SKggPNyC0ITw.woff2',
    'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2',
    'https://fonts.gstatic.com/s/opensans/v26/memtYaGs126MiZpBA-UFUIcVXSCEkx2cmqvXlWqWuU6F.woff2',
    'https://fonts.gstatic.com/s/opensans/v26/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2',
    'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2',
    'https://fonts.googleapis.com/icon?family=Material+Icons+Extended',
    'https://www.gstatic.com/_/freebird/_/ss/k=freebird.v.2fkh4skn3txy.L.W.O/d=1/rs=AMjVe6h_nvRNliQ0VqwAatd15Ve6irIk9Q',
    'https://fonts.googleapis.com/css?family=Google+Sans:400,500|Roboto:300,400,400i,500,700&subset=latin,vietnamese,latin-ext,cyrillic,greek,cyrillic-ext,greek-ext',
    'https://fonts.googleapis.com/css?family=Product+Sans&subset=latin,vietnamese,latin-ext,cyrillic,greek,cyrillic-ext,greek-ext',
    'https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_dark_clr_74x24px.svg',
    'https://www.gstatic.com/_/freebird/_/js/k=freebird.v.en.mgUK68J9j1o.O/d=1/rs=AMjVe6jwZYrUeaU0MnW-5qv7PW11oBi5xw/m=viewer_base',
    'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i'*/

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