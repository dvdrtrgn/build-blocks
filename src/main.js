// import './glob.js';

// import Vue from 'vue';
import { createApp } from 'vue'
import App from './App.vue';
import store from './store';

// Vue.config.productionTip = false;
createApp(App)
  .use(store)
  // .use(router)
  .mount('#app')

// const app = createApp({
//   store,
//   beforeCreate() {
//     store.commit('initStore');
//   },
//   render: h => h(App),
// }).mount('#app');

// store.commit('bumpLoads', 'foo');
