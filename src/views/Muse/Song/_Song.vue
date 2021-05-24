<template>
  <div id="Song">
    <h1>Output</h1>

    <div class="notelist bezel" tabindex="0">
      <SongNote v-for="(note, i) in notes" :key="i" :note="note" />
    </div>

    <div class="controls bezel">
      <button @click="checkbox" :class="{ active: autoplay }">Autoplay</button>
      -
      <button @click="addRest">Add Rest</button>
      —
      <button @click="save">save</button>
      -
      <button @click="load">load</button>
      —
      <button @click="clear">clear</button>
      -
      <button @click="dump" class="dev">console</button>
    </div>
  </div>
</template>

<script>
  import store from '@/store';
  import makeCue from '@/libs/makeCue.js';

  import SongNote from './SongNote';

  export default {
    props: {
      notes: Array,
      songname: {
        type: String,
        default: 's1',
      },
    },
    components: {
      SongNote,
    },
    data() {
      return {
        saved: false,
      };
    },
    methods: {
      addRest() {
        let rest = makeCue(0, 1);
        this.notes.push(rest);
      },
      clear() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      load() {
        let song = JSON.parse(this.songs[this.songname]);
        this.clear();

        song.forEach(e => {
          let note = makeCue(...e.split(' '));
          this.notes.push(note);
        });
      },
      save() {
        store.commit('saveSong', {
          name: this.songname,
          json: this.json,
        });
      },
      dump() {
        console.log(this.json);
      },
      checkbox() {
        store.commit('setAutoplay', !this.autoplay);
      },
    },
    computed: {
      autoplay() {
        return store.getters.getAutoplay;
      },
      json() {
        let dump = this.notes.filter(e => e.duration).map(e => e.toString());

        return JSON.stringify(dump);
      },
      songs() {
        return store.getters.getSongs;
      },
    },
    mounted() {
      this.load();
      this.dump();
    },
  };
</script>

<style lang="scss">
  #Song {
    columns: 1;
    margin: 1rem 0;
    text-align: center;

    .notelist {
      padding: 1rem;
      text-align: left;
    }
    .active {
      // for control buttons
      background-color: gray;
      color: white;
    }
  }
</style>
