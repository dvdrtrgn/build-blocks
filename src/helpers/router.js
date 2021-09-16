const MODE =
  process.env.NODE_ENV === 'production'
    ? createWebHistory
    : createWebHashHistory;

import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';

import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Muse',
    name: 'Muse',
    component: () =>
      import(/* webpackChunkName: "Muse" */ '../views/muse/Muse.vue'),
  },
  {
    path: '/Synth',
    name: 'Synth',
    component: () =>
      import(/* webpackChunkName: "Synth" */ '../views/synth/Synth.vue'),
  },
  {
    path: '/Notate',
    name: 'Notate',
    component: () =>
      import(/* webpackChunkName: "Notate" */ '../views/notate/Notate.vue'),
  },
  {
    path: '/Guitar',
    name: 'Guitar',
    component: () =>
      import(/* webpackChunkName: "Guitar" */ '../views/guitar/Neck.vue'),
  },
  {
    path: '/Modes',
    name: 'Modes',
    component: () =>
      import(/* webpackChunkName: "Modes" */ '../views/modes/Vscale.vue'),
  },
];

const router = createRouter({
  history: MODE(process.env.BASE_URL),
  routes,
});

const DEFAULT_TITLE = document.title;
router.afterEach(to => {
  document.title = to.meta.title || DEFAULT_TITLE;
});

export default router;
