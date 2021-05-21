<template>
  <div id="Song">
    <h1>Song</h1>
    <div class="notelist" tabindex="0">
      <SongNote v-for="(note, i) in notes" :key="i" :note="note" @play="play" />
    </div>

    <div class="controls">
      <button @click="checkbox" :class="{ active: autoplay }">autoplay</button>
      |
      <button @click="dump">dump</button>
      <button @click="clear">clear</button>
      |
      <button @click="save" :class="{ active: !saved }">save</button>
      <button @click="load">load</button>
    </div>
  </div>
</template>

<script>
  import Store from '@/store';
  import SongNote from './SongNote';

  import makeSynth from '@/libs/make-synth.js';
  import makeNote from '@/libs/make-note.js';
  import focusNext from '@/libs/focus-next.js';

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
        synth: makeSynth(),
        autoplay: Store.getters.getAutoplay,
        saved: false,
      };
    },
    methods: {
      play(arg) {
        this.synth.play(arg, this.autoplay ? focusNext() : '');
      },
      clear() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      load() {
        let song = JSON.parse(this.songs[this.songname]);
        this.clear();

        song.forEach(e => {
          let note = makeNote(...e.split(' '));
          this.notes.push(note);
        });
      },
      save() {
        Store.commit('saveSong', {
          name: this.songname,
          json: this.json,
        });
      },
      dump() {
        console.log(this.json);
      },
      checkbox() {
        this.autoplay = !this.autoplay;
        Store.commit('setAutoplay', this.autoplay);
      },
    },
    computed: {
      json() {
        let dump = this.notes.map(e => e.vitals());

        return JSON.stringify(dump);
      },
      songs() {
        return Store.getters.getSongs;
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

    > div {
      // rounded wrappers
      background-color: rgba(white, 0.5);
      border: 1px solid silver;
      border-radius: 1rem;
    }
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
