<template>
  <section id="Synth">
    <h1>Synth.vue</h1>
    <!-- <button @click="Synth.clearAll">clearAll</button> -->
    <button @click="Synth.clearEvery">clearEvery</button>
    <button @click="Synth.addEvery">addEvery</button>
    {{ lazy_state }}
    <button @click="toggle" :class="{ active: started }">
      {{ started ? 'stop' : 'start' }}
    </button>
    <button @click="pause" :class="{ active: paused }">pause</button>
    <button @click="Synth.info">info</button>

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
  import { Synth, Vol, Parts, lazy } from '../libs/music/music.js';

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        lazy_state: lazy('state', this, Synth.transport),
        masterVol: Vol.get(Synth.volume),
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
        Synth.ensure(); // force AudioContext on page
        Synth.toggle();
      },
      pause() {
        if (this.paused) {
          Synth.play();
        } else {
          Synth.pause();
        }
      },
    },
    computed: {
      Synth() {
        return Synth;
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
        Vol.set(Synth.volume, this.masterVol);
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
  #Synth {
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
</style>
