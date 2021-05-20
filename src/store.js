import Vue from 'vue';
import Vuex from 'vuex';

const C = console;
const Key = 'build-blocks';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loads: 0,
    sustain: 0,
    songs: {},
  },
  getters: {
    getTime(state) {
      return state.sustain;
    },
    getAutoplay(state) {
      return state.autoplay;
    },
    getSongs(state) {
      return state.songs;
    },
  },
  mutations: {
    bumpLoads(state) {
      C.log(`load # ${(state.loads += 1)}`);
    },
    setTime(state, num) {
      C.log(`time = ${(state.sustain = num)}`);
    },
    setAutoplay(state, bool) {
      C.log(`autoplay = ${(state.autoplay = bool)}`);
    },
    saveSong(state, obj) {
      C.log(`state.songs <- ${obj.name} = ${obj.json}`);
      state.songs[obj.name] = obj.json;
    },
    initStore(state) {
      const str = localStorage.getItem(Key) || '{}';
      const obj = JSON.parse(str);

      this.replaceState(Object.assign(state, obj));

      C.log('initStore', obj);
    },
  },
  actions: {},
});

store.subscribe((mutation, state) => {
  // called after every mutation{type,payload}
  localStorage.setItem(Key, JSON.stringify(state));
});

export default store;
