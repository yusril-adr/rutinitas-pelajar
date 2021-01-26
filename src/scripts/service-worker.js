import 'regenerator-runtime';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { NavigationRoute, registerRoute } from 'workbox-routing';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

precacheAndRoute([
  { url: '/index.html', revision: '1' },
  { url: '/logo.png', revision: '1' },
]);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  allowlist: [
    /\/tugas(\/)?/,
    /\/jadwal(\/)?/,
    /\/nilai(\/)?/,
    /\/resolusi(\/)?/,
    /\/simpan(\/)?/,
    /\/pengaturan(\/)?/,
  ],
  denylist: [
    /\/tugas(\/)?../,
    /\/resolusi(\/)?../,
    /\/simpan(\/)?../,
    /\/pengaturan(\/)?../,
  ],
});
registerRoute(navigationRoute);
