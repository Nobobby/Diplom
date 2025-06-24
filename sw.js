const CACHE_NAME = 'NextLevelFit-v1';
var APP_PREFIX = 'diplom_';
var VERSION = 'version_00';
var GHPATH = '/Diplom';

const urlsToCache = [
    '${GHPATH}/',
    '${GHPATH}/index.html',
    '${GHPATH}/style.css',
    '${GHPATH}/script.js',
    '${GHPATH}/manifest.webmanifest',
    '${GHPATH}/icon.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    '${GHPATH}/video/rest.webp',
    // Workout
    '${GHPATH}/video/jumping_jacks.webp',
    '${GHPATH}/video/high_knees.webp',
    '${GHPATH}/video/burpees.webp',
    '${GHPATH}/video/mountain_climbers.webp',
    '${GHPATH}/video/squat_jumps.webp',
    '${GHPATH}/video/lunges.webp',
    '${GHPATH}/video/butt_kicks.webp',
    '${GHPATH}/video/plank_jacks.webp',
    '${GHPATH}/video/skaters.webp',
    '${GHPATH}/video/box_jumps.webp',
    '${GHPATH}/video/jump_rope.webp',
    // Warm-up
    '${GHPATH}/video/arm_circles.webp',
    '${GHPATH}/video/leg_swings.webp',
    '${GHPATH}/video/torso_twists.webp',
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
