import './glob.js';

import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

createApp(App)
  // .use(router)
  .use(store)
  .mount('#app');

store.commit('bumpLoads', 'foo');
