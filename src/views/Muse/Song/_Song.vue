<template>
  <div id="Song">
    <h1>Output</h1>

    <div class="controls bezel">
      <div class="group">
        <button @click="togAutoplay" :class="{ active: autoplay }">
          Autoplay
        </button>
        <button @click="togMode" :class="{ active: mode === 'interval' }">
          Show Intervals
        </button>
      </div>
      <div class="group">
        <button @click="doSave">Store notes</button>
        <button @click="doLoad">Restore</button>
        <button @click="doClear">Clear</button>
      </div>
      <button @click="logCues" class="dev" style="float: right;">
        console.log
      </button>
    </div>

    <div class="bezel" tabindex="0">
      <draggable
        :class="mode"
        class="cuelist"
        draggable="button"
        v-bind="dragOptions"
      >
        <div slot="header" style="float: left;">“{{ songname }}”&nbsp;</div>

        <SongNote
          v-for="(note, i) in notes"
          :key="`k${i}`"
          :note="note"
        ></SongNote>

        <div slot="footer" style="float: right;">
          <button @click="addRest">&lt; Append Rest</button>
        </div>
      </draggable>

      <!-- https://github.com/SortableJS/Vue.Draggable -->
      <small>Notes are draggable with “Autoplay&nbsp;off”</small>
    </div>
  </div>
</template>

<script>
  import store from '@/store';
  import makeCue from '@/libs/makeCue.js';

  import SongNote from './SongNote';
  import draggable from 'vuedraggable';

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
      draggable,
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
      doClear() {
        this.notes.length = 0;
        this.notes.pop(); // trigger the update
      },
      doLoad() {
        let song = JSON.parse(this.songs[this.songname]);
        this.doClear();

        song.forEach(e => {
          let note = makeCue(...e.split(' '));
          this.notes.push(note);
        });
      },
      togMode() {
        store.commit('setMode', this.mode === 'pitch' ? 'interval' : 'pitch');
      },
      doSave() {
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
      dragOptions() {
        return {
          animation: 200,
          disabled: false,
          ghostClass: 'ghost',
        };
      },
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
      this.doLoad();
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
    .cuelist {
      text-align: left;

      button:active {
        cursor: move;
      }
      .ghost {
        background: black;
        opacity: 0.5;
      }
    }
  }
</style>
