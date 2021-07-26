<template>
  <section id="Music">
    <button @click="toggle" :class="{ active: started }">
      {{ started ? 'stop' : 'start' }}
    </button>
    <button @click="pause">pause</button>
    {{ transport.state }}
    <hr>
    <button @click="music.scheduleEvents">scheduleEvents</button>
    <button @click="music.clearEvents">clearEvents</button>
    <label for="">
      <input type="range" min="1" max="100" v-model.number="volume" />
      {{ volume }}
    </label>
  </section>
</template>

<script>
  import * as Tone from 'tone';
  window.Tone = Tone;
  import music, { list } from '@/libs/music/music';

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        music,
        volume: 51,
        transport: Tone.Transport,
      };
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    created() {
      this.volume -= 1;
    },
    beforeDestroy() {
      console.log('beforeDestroy');
    },
    methods: {
      toggle() {
        this.transport.toggle();
      },
      pause() {
        this.transport.pause();
      },
    },
    computed: {
      list() {
        return list;
      },
      started() {
        return this.transport.state === 'started';
      },
    },
    watch: {
      volume() {
        let db = this.volume / 3 - 33;
        Tone.Destination.volume.value = db;
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
  }
  .hand {
    z-index: -1;
  }
</style>
