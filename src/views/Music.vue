<template>
  <section id="Music">
    <button @click="clear">clear</button>
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
  import { Music, Vol, Parts, lazy } from '@/libs/music/music';

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
      clear() {
        Music.clear();
      },
      toggle() {
        Music.start();
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
