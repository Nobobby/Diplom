const CACHE_NAME = 'NextLevelFit-v1';
var APP_PREFIX = 'diplom_';
var VERSION = 'version_00';

const urlsToCache = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '/video/rest.webp',
    // Workout
    '/video/jumping_jacks.webp',
    '/video/high_knees.webp',
    '/video/burpees.webp',
    '/video/mountain_climbers.webp',
    '/video/squat_jumps.webp',
    '/video/lunges.webp',
    '/video/butt_kicks.webp',
    '/video/plank_jacks.webp',
    '/video/skaters.webp',
    '/video/box_jumps.webp',
    '/video/jump_rope.webp',
    // Warm-up
    '/video/arm_circles.webp',
    '/video/leg_swings.webp',
    '/video/torso_twists.webp',
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});