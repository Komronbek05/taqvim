const CACHE_NAME = 'ramazan-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap'
];

// Установка: Кэшируем важные файлы
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Активация
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Сначала ищем в кэше, если нет - в интернет
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((cached) => {
      return cached || fetch(e.request);
    })
  );
});

// Обработка уведомлений (если приложение закрыто, но процесс жив)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('./index.html')
    );
});
