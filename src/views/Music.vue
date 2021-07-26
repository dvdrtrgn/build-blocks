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
      <input type="range" min="1" max="100" v-model.lazy.number="melodyVol" />
      {{ melodyVol }}
    </label>
    <label>
      snareVol
      <input type="range" min="1" max="100" v-model.lazy.number="snareVol" />
      {{ snareVol }}
    </label>
    <label>
      kickVol
      <input type="range" min="1" max="100" v-model.lazy.number="kickVol" />
      {{ kickVol }}
    </label>
    <label>
      normVol
      <input type="range" min="1" max="100" v-model.lazy.number="normVol" />
      {{ normVol }}
    </label>
    <label>
      highVol
      <input type="range" min="1" max="100" v-model.lazy.number="highVol" />
      {{ highVol }}
    </label>
    <label>
      bassVol
      <input type="range" min="1" max="100" v-model.lazy.number="bassVol" />
      {{ bassVol }}
    </label>
  </section>
</template>

<script>
  import * as Tone from 'tone';
  window.Tone = Tone;
  import music, { list } from '@/libs/music/music';

  const toDB = vol => Math.trunc(vol - 50);
  const toVol = db => Math.trunc(db + 50);

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        music,
        transport: Tone.Transport,
        masterVol: 50,
        melodyVol: toVol(list.melody.vol.volume.value),
        snareVol: toVol(list.snare.vol.volume.value),
        highVol: toVol(list.high.vol.volume.value),
        kickVol: toVol(list.kick.vol.volume.value),
        bassVol: toVol(list.bass.vol.volume.value),
        normVol: toVol(list.norm.vol.volume.value),
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
        Tone.Destination.volume.value = toDB(this.masterVol);
      },
      bassVol() {
        list.bass.vol.volume.value = toDB(this.bassVol);
      },
      kickVol() {
        list.kick.vol.volume.value = toDB(this.kickVol);
      },
      snareVol() {
        list.snare.vol.volume.value = toDB(this.snareVol);
      },
      highVol() {
        list.high.vol.volume.value = toDB(this.highVol);
      },
      normVol() {
        list.norm.vol.volume.value = toDB(this.normVol);
      },
      melodyVol() {
        list.melody.vol.volume.value = toDB(this.melodyVol);
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
