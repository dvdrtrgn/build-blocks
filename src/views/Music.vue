<template>
  <section id="Music">
    <h1>Music.vue</h1>
    <!-- <button @click="Music.clearAll">clearAll</button> -->
    <button @click="Music.clearEvery">clearEvery</button>
    <button @click="Music.addEvery">addEvery</button>
    {{ lazy_state }}
    <button @click="toggle" :class="{ active: started }">
      {{ started ? 'stop' : 'start' }}
    </button>
    <button @click="pause" :class="{ active: paused }">pause</button>
    <button @click="Music.info">info</button>

    <label>
      masterVol ({{ masterVol }})
      <input type="range" min="0" max="100" v-model.number="masterVol" />
    </label>
    <hr />

    <label>
      melodyVol ({{ melodyVol }})
      <input type="range" min="0" max="100" v-model.number="melodyVol" />
    </label>
    <label>
      snareVol ({{ snareVol }})
      <input type="range" min="0" max="100" v-model.number="snareVol" />
    </label>
    <label>
      kickVol ({{ kickVol }})
      <input type="range" min="0" max="100" v-model.number="kickVol" />
    </label>
    <label>
      chordsVol ({{ chordsVol }})
      <input type="range" min="0" max="100" v-model.number="chordsVol" />
    </label>
    <label>
      accentVol ({{ accentVol }})
      <input type="range" min="0" max="100" v-model.number="accentVol" />
    </label>
    <label>
      bassVol ({{ bassVol }})
      <input type="range" min="0" max="100" v-model.number="bassVol" />
    </label>
  </section>
</template>

<script>
  import { Music, Vol, Parts, lazy } from '../libs/music/music.js';

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        lazy_state: lazy('state', this, Music.transport),
        masterVol: Vol.get(Music.volume),
        melodyVol: Vol.get(Parts.melody.vol.volume),
        snareVol: Vol.get(Parts.snare.vol.volume),
        accentVol: Vol.get(Parts.accent.vol.volume),
        kickVol: Vol.get(Parts.kick.vol.volume),
        bassVol: Vol.get(Parts.bass.vol.volume),
        chordsVol: Vol.get(Parts.chords.vol.volume),
      };
    },
    created() {
      // this.masterVol -= 1;
    },
    methods: {
      toggle() {
        Music.ensure(); // force AudioContext on page
        Music.toggle();
      },
      pause() {
        if (this.paused) {
          Music.play();
        } else {
          Music.pause();
        }
      },
    },
    computed: {
      Music() {
        return Music;
      },
      Parts() {
        return Parts;
      },
      started() {
        return this.lazy_state === 'started';
      },
      paused() {
        return this.lazy_state === 'paused';
      },
    },
    watch: {
      masterVol() {
        Vol.set(Music.volume, this.masterVol);
      },
      bassVol() {
        Vol.set(Parts.bass.vol.volume, this.bassVol);
      },
      kickVol() {
        Vol.set(Parts.kick.vol.volume, this.kickVol);
      },
      snareVol() {
        Vol.set(Parts.snare.vol.volume, this.snareVol);
      },
      accentVol() {
        Vol.set(Parts.accent.vol.volume, this.accentVol);
      },
      chordsVol() {
        Vol.set(Parts.chords.vol.volume, this.chordsVol);
      },
      melodyVol() {
        Vol.set(Parts.melody.vol.volume, this.melodyVol);
      },
    },
  };
</script>

<style lang="scss">
  #Music {
    line-height: 2;
    text-align: center;

    .active {
      font-weight: 800;
    }
    label {
      display: block;
      text-align: right;
    }
  }
  .hand {
    opacity: 0.2;
    z-index: -1;
  }
</style>
