<template>
  <div id="Song1">
    <div class="notes" tabindex="0">
      <SongNote
        v-for="(note, i) in notes"
        tabindex="0"
        :key="i"
        :note="note"
        @play="play"
        @focus="play(note)"
      />
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
  import SongNote from '@/views/Synth/SongNote';

  import makeSynth from './make-synth.js';
  import makeNote from './make-note.js';
  import focusNext from './focus-next.js';

  export default {
    props: ['notes'],
    components: {
      SongNote,
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
  #Song1 {
    columns: 1;
    margin: 1rem 0;
    text-align: center;

    > div {
      background-color: rgba(white, 0.5);
      border: 1px solid silver;
      border-radius: 1rem;
    }
    .notes {
      padding: 1rem;
      text-align: left;
    }
    .active {
      background-color: gray;
      color: white;
    }
  }
</style>
