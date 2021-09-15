const MODE =
  process.env.NODE_ENV === 'production'
    ? createWebHistory
    : createWebHashHistory;

import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router';

import Home from '../views/Main.vue';

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
      import(/* webpackChunkName: "Synth" */ '../views/Synth.vue'),
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
