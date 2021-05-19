import Vue from 'vue';
import Vuex from 'vuex';

const C = console;
const Key = 'build-blocks';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loads: 0,
    duration: 2,
  },
  getters: {
    getTime(state) {
      return state.duration;
    },
  },
  mutations: {
    bumpLoads(state) {
      C.log(`load # ${(state.loads += 1)}`);
    },
    setTime(state, num) {
      C.log(`time = ${(state.duration = num)}`);
    },
    initStore(state) {
      const str = localStorage.getItem(Key) || '{}';
      const obj = JSON.parse(str);

      this.replaceState(Object.assign({ _key_: Key }, state, obj));

      C.log('initStore', str, [store]);
    },
  },
  actions: {},
});

store.subscribe((mutation, state) => {
  // called after every mutation{type,payload}
  localStorage.setItem(Key, JSON.stringify(state));
});

export default store;
