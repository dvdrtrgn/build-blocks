<template>
  <div id="ShowNotes">
    <button @click="dump">dump</button>
    <button @click="clear">clear</button>

    <button @click="save" :class="{ dirty: !saved }">save</button>
    <button @click="load">load</button>

    <label>
      <input type="checkbox" v-model="autoplay" @change="checkbox" /> autoplay
    </label>

    <hr />

    <div class="notes" tabindex="0">
      <ShowNote
        v-for="(note, i) in notes"
        tabindex="0"
        :key="i"
        :note="note"
        @play="play"
        @focus="play(note)"
      />
    </div>
  </div>
</template>

<script>
  import Store from '@/store';
  import ShowNote from './ShowNote';

  import makeSynth from './make-synth.js';
  import makeNote from './make-note.js';
  import focusNext from './focus-next.js';

  export default {
    props: ['notes'],
    components: {
      ShowNote,
    },
    data() {
      return {
        synth: makeSynth(),
        autoplay: Store.getters.getAutoplay,
        saved: false,
        songname: 's1',
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
  #ShowNotes {
    background-color: silver;
    columns: 1;

    .notes {
      background-color: rgba(white, 0.5);
    }
    .dirty {
      font-weight: bold;
    }
  }
</style>
