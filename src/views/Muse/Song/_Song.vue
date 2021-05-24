<template>
  <div id="Song">
    <h1>Output</h1>

    <div class="controls bezel">
      <div class="group">
        <button @click="togAutoplay" :class="{ active: autoplay }">
          Autoplay
        </button>
        <button @click="togMode" :class="{ active: mode === 'interval' }">
          Interval Mode
        </button>
      </div>
      <button @click="addRest">Add Rest</button>
      <div class="group">
        <button @click="runSave">save</button>
        <button @click="clearCues">clear</button>
        <button @click="runLoad">load</button>
      </div>
      <button @click="logCues" class="dev">console</button>
    </div>

    <div class="notelist bezel" :class="mode" tabindex="0">
      {{ songname }}
      <SongNote v-for="(note, i) in notes" :key="i" :note="note" />
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
      clearCues() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      runLoad() {
        let song = JSON.parse(this.songs[this.songname]);
        this.clearCues();

        song.forEach(e => {
          let note = makeCue(...e.split(' '));
          this.notes.push(note);
        });
      },
      togMode() {
        store.commit('setMode', this.mode === 'pitch' ? 'interval' : 'pitch');
      },
      runSave() {
        store.commit('saveSong', {
          name: this.songname,
          json: this.json,
        });
      },
      logCues() {
        console.log(this.json);
      },
      togAutoplay() {
        store.commit('setAutoplay', !this.autoplay);
      },
    },
    computed: {
      autoplay() {
        return store.getters.getAutoplay;
      },
      mode() {
        return store.getters.getMode;
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
      this.runLoad();
      this.logCues();
    },
  };
</script>

<style lang="scss">
  $root: 1.2rem;

  #Song {
    columns: 1;
    margin: $root 0;
    text-align: center;

    .active {
      // for control buttons
      background-color: gray;
      color: white;
    }
    .controls {
      .group {
        background: silver;
        display: inline-block;
        margin: $root/2;
      }
      button {
        margin: $root/4;
        padding: $root/2;
      }
    }
    .notelist {
      padding: $root;
      text-align: left;
    }
  }
</style>
