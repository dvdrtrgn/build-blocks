<template>
  <section id="Music">
    {{ transport.state }}
    <button @click="toggle" :class="{ active: started }">
      {{ started ? 'stop' : 'start' }}
    </button>
    <button @click="pause" :class="{ active: paused }">pause</button>
    <label>
      masterVol
      <input type="range" min="1" max="100" v-model.number="masterVol" />
      {{ masterVol }}
    </label>
    <hr />
    <label>
      melodyVol
      <input type="range" min="1" max="100" v-model.number="melodyVol" />
      {{ melodyVol }}
    </label>
    <label>
      snareVol
      <input type="range" min="1" max="100" v-model.number="snareVol" />
      {{ snareVol }}
    </label>
    <label>
      kickVol
      <input type="range" min="1" max="100" v-model.number="kickVol" />
      {{ kickVol }}
    </label>
    <label>
      normVol
      <input type="range" min="1" max="100" v-model.number="normVol" />
      {{ normVol }}
    </label>
    <label>
      highVol
      <input type="range" min="1" max="100" v-model.number="highVol" />
      {{ highVol }}
    </label>
    <label>
      bassVol
      <input type="range" min="1" max="100" v-model.number="bassVol" />
      {{ bassVol }}
    </label>
  </section>
</template>

<script>
  import * as Tone from 'tone';
  window.Tone = Tone;
  import music, { db, list } from '@/libs/music/music';

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        music,
        transport: Tone.Transport,
        masterVol: db.get(Tone.Destination.volume),
        melodyVol: db.get(list.melody.vol.volume),
        snareVol: db.get(list.snare.vol.volume),
        highVol: db.get(list.high.vol.volume),
        kickVol: db.get(list.kick.vol.volume),
        bassVol: db.get(list.bass.vol.volume),
        normVol: db.get(list.norm.vol.volume),
      };
    },
    created() {
      // this.masterVol -= 1;
    },
    methods: {
      toggle() {
        Tone.start();
        this.transport.toggle();
      },
      pause() {
        if (this.paused) {
          this.transport.start();
        } else {
          this.transport.pause();
        }
      },
    },
    computed: {
      list() {
        return list;
      },
      started() {
        return this.transport.state === 'started';
      },
      paused() {
        return this.transport.state === 'paused';
      },
    },
    watch: {
      masterVol() {
        db.set(Tone.Destination.volume, this.masterVol);
      },
      bassVol() {
        db.set(list.bass.vol.volume, this.bassVol);
      },
      kickVol() {
        db.set(list.kick.vol.volume, this.kickVol);
      },
      snareVol() {
        db.set(list.snare.vol.volume, this.snareVol);
      },
      highVol() {
        db.set(list.high.vol.volume, this.highVol);
      },
      normVol() {
        db.set(list.norm.vol.volume, this.normVol);
      },
      melodyVol() {
        db.set(list.melody.vol.volume, this.melodyVol);
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
