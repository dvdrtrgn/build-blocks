<template>
  <section id="Synth" @click="getInfo">
    <h1>Synth.vue</h1>
    <!-- <button @click="Synth.clearAll">clearAll</button> -->
    <button @click="Synth.clearEvery">clearEvery</button>
    <button @click="Synth.addEvery">addEvery</button>
    <p>
      <b>{{ lazy_state }}</b>
    </p>
    <button @click="toggle" :class="{ active: started }">
      {{ started ? 'stop' : 'start' }}
    </button>
    <button @click="pause" :class="{ active: paused }">pause</button>
    <p>
      scheduledEvents {{ info }}
    </p>

    <VolSlide nom="masterVol" v-model:vol="masterVol" />
    <hr />
    <VolSlide nom="melodyVol" v-model:vol="melodyVol" />
    <VolSlide nom="snareVol" v-model:vol="snareVol" />
    <VolSlide nom="kickVol" v-model:vol="kickVol" />
    <VolSlide nom="chordsVol" v-model:vol="chordsVol" />
    <VolSlide nom="accentVol" v-model:vol="accentVol" />
    <VolSlide nom="bassVol" v-model:vol="bassVol" />
  </section>
</template>

<script>
  import VolSlide from './components/VolSlide.vue';
  import { Synth, Vol, Parts, lazy } from './libs/index.js';

  export default {
    components: { VolSlide },
    mounted() {},
    data() {
      return {
        lazy_state: lazy('state', this, Synth.transport),
        info: '',
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
      getInfo() {
        this.info = Synth.info();
      },
    },
    computed: {
      Synth() {
        return Synth;
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
