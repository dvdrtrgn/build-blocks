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
      <!-- <draggable
        :class="mode"
        class="cuelist"
        draggable="button"
        v-bind="dragOptions"
        v-model="notes"
        item-key="order"
      > -->
      <!-- <template #header> -->
      <div style="float: left;">“{{ songname }}”&nbsp;</div>
      <!-- </template> -->

      <!-- <template #item="{note}"> -->
      <SongNote v-for="note in notes" :key="note.order" :note="note"></SongNote>
      <!-- </template> -->

      <!-- <template #footer> -->
      <div style="float: right;">
        <button @click="addRest">&lt; Append Rest</button>
      </div>
      <!-- </template> -->
      <!-- </draggable> -->

      <!-- https://github.com/SortableJS/Vue.Draggable -->
      <small>Notes are draggable with “Autoplay&nbsp;off”</small>
    </div>
  </div>
</template>

<script>
  import bus from '../../../helpers/bus';
  // import glob from '../../glob';
  import store from '../../../helpers/store';
  import makeCue from '../../../libs/muse/makeCue.js';

  import SongNote from './SongNote';
  // import draggable from 'vuedraggable';

  export default {
    props: {
      songname: {
        type: String,
        default: 's1',
      },
    },
    components: {
      SongNote,
      // draggable,
    },
    data() {
      return {
        notes: [],
        saved: false,
      };
    },
    methods: {
      addRest() {
        let rest = makeCue(0, 1);
        this.pushCue(rest);
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
          this.pushCue(note);
        });
      },
      pushCue(cue) {
        if (cue && cue.duration >= 0.01) {
          // filter removal by zero
          cue.order = this.notes.length;
          this.notes.push(cue);
        }
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
        console.log(this.notes, JSON.parse(this.json));
      },
      togAutoplay() {
        store.commit('setAutoplay', !this.autoplay);
      },
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          disabled: this.autoplay,
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
      bus.$on('pushCue', this.pushCue);
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
