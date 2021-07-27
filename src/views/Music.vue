<template>
  <section id="Music">
    <button @click="clear">
      Tone.Transport.clear
    </button>
    {{ lazy_state }}
    <button @click="toggle" :class="{ active: started }">
      {{ started ? 'stop' : 'start' }}
    </button>
    <button @click="pause" :class="{ active: paused }">pause</button>
    <label>
      masterVol
      <input type="range" min="50" max="100" v-model.number="masterVol" />
      {{ masterVol }}
    </label>
    <hr />
    <label>
      melodyVol
      <input type="range" min="50" max="100" v-model.number="melodyVol" />
      {{ melodyVol }}
    </label>
    <label>
      snareVol
      <input type="range" min="50" max="100" v-model.number="snareVol" />
      {{ snareVol }}
    </label>
    <label>
      kickVol
      <input type="range" min="50" max="100" v-model.number="kickVol" />
      {{ kickVol }}
    </label>
    <label>
      chordsVol
      <input type="range" min="50" max="100" v-model.number="chordsVol" />
      {{ chordsVol }}
    </label>
    <label>
      accentVol
      <input type="range" min="50" max="100" v-model.number="accentVol" />
      {{ accentVol }}
    </label>
    <label>
      bassVol
      <input type="range" min="50" max="100" v-model.number="bassVol" />
      {{ bassVol }}
    </label>
  </section>
</template>

<script>
  import { Tone, Vol, list, lazy } from '@/libs/music/music';

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        lazy_state: lazy('state', this, Tone.Transport),
        masterVol: Vol.get(Tone.Destination.volume),
        melodyVol: Vol.get(list.melody.vol.volume),
        snareVol: Vol.get(list.snare.vol.volume),
        accentVol: Vol.get(list.accent.vol.volume),
        kickVol: Vol.get(list.kick.vol.volume),
        bassVol: Vol.get(list.bass.vol.volume),
        chordsVol: Vol.get(list.chords.vol.volume),
      };
    },
    created() {
      // this.masterVol -= 1;
    },
    methods: {
      clear() {
        Tone.Transport.cancel(0);
      },
      toggle() {
        Tone.start();
        Tone.Transport.toggle();
      },
      pause() {
        if (this.paused) {
          Tone.Transport.start();
        } else {
          Tone.Transport.pause();
        }
      },
    },
    computed: {
      Tone() {
        return Tone;
      },
      list() {
        return list;
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
        Vol.set(Tone.Destination.volume, this.masterVol);
      },
      bassVol() {
        Vol.set(list.bass.vol.volume, this.bassVol);
      },
      kickVol() {
        Vol.set(list.kick.vol.volume, this.kickVol);
      },
      snareVol() {
        Vol.set(list.snare.vol.volume, this.snareVol);
      },
      accentVol() {
        Vol.set(list.accent.vol.volume, this.accentVol);
      },
      chordsVol() {
        Vol.set(list.chords.vol.volume, this.chordsVol);
      },
      melodyVol() {
        Vol.set(list.melody.vol.volume, this.melodyVol);
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
