import './helpers/glob';

import { createApp } from 'vue';
import App from './App.vue';
import store from './helpers/store';
import router from './helpers/router';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');

store.commit('bumpLoads', 'foo');
