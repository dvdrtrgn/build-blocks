import Vue from 'vue';
import Vuex from 'vuex';

const C = console;
const Key = 'build-blocks';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    autoplay: 0,
    loads: 0,
    mode: 'pitch',
    sustain: 0,
    songs: {
      s1: '["C4 0.44","D4 0.22","F4 0.25"]',
    },
  },
  getters: {
    getTime(state) {
      return state.sustain;
    },
    getAutoplay(state) {
      return state.autoplay;
    },
    getMode(state) {
      return state.mode;
    },
    getSongs(state) {
      return state.songs;
    },
  },
  mutations: {
    bumpLoads(state) {
      C.log('bumpLoads', (state.loads += 1));
    },
    setTime(state, num) {
      C.log('setTime', (state.sustain = num));
    },
    setAutoplay(state, bool) {
      C.log('setAutoplay', (state.autoplay = bool));
    },
    setMode(state, mode) {
      C.log('setMode', (state.mode = mode));
    },
    saveSong(state, obj) {
      C.log('saveSong', obj);
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
