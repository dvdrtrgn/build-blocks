import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
  store,
  beforeCreate() {
    store.commit('initStore');
  },
  render: h => h(App),
}).$mount('#app');

store.commit('bumpLoads', 'foo');
