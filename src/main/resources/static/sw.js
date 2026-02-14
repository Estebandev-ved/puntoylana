// Service Worker para Punto y Lana PWA
const CACHE_NAME = 'puntoylana-v1';
const OFFLINE_URL = '/offline.html';

// Recursos a cachear inmediatamente
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/offline.html'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
    console.log('🧶 Service Worker: Instalando...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('📦 Cache abierto, precacheando assets...');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activar Service Worker
self.addEventListener('activate', (event) => {
    console.log('✅ Service Worker: Activado');

    // Limpiar caches antiguos
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('🗑️ Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Solo manejar requests del mismo origen
    if (url.origin !== location.origin) {
        return;
    }

    // Ignorar requests de API (siempre ir a la red)
    if (url.pathname.startsWith('/api/')) {
        return;
    }

    // Estrategia: Network First con fallback a cache
    event.respondWith(
        fetch(request)
            .then((response) => {
                // Si la respuesta es válida, guardar en cache
                if (response.status === 200) {
                    const responseClone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(request, responseClone);
                    });
                }
                return response;
            })
            .catch(async () => {
                // Si falla la red, buscar en cache
                const cachedResponse = await caches.match(request);
                if (cachedResponse) {
                    return cachedResponse;
                }

                // Si es una navegación y no hay cache, mostrar página offline
                if (request.mode === 'navigate') {
                    const offlinePage = await caches.match(OFFLINE_URL);
                    if (offlinePage) {
                        return offlinePage;
                    }
                }

                // Fallback genérico
                return new Response('Contenido no disponible sin conexión', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
    );
});

// Escuchar mensajes del cliente
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Push notifications (para futuro uso)
self.addEventListener('push', (event) => {
    if (!event.data) return;

    const data = event.data.json();
    const options = {
        body: data.body || '¡Tienes una notificación!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            url: data.url || '/'
        },
        actions: [
            { action: 'open', title: 'Ver' },
            { action: 'close', title: 'Cerrar' }
        ]
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Punto y Lana', options)
    );
});

// Click en notificación
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'close') return;

    const urlToOpen = event.notification.data?.url || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true })
            .then((windowClients) => {
                // Si hay una ventana abierta, enfocarla
                for (const client of windowClients) {
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // Si no, abrir una nueva
                return clients.openWindow(urlToOpen);
            })
    );
});

console.log('🧶 Service Worker cargado - Punto y Lana');
