<template>
  <section id="Music">
    <button @click="toggle" :class="{ active: playing }">
      Play/Pause
    </button>
    <button @click="music.remakeList">remakeList</button>
    <button @click="music.dispose">dispose</button>
  </section>
</template>

<script>
  import music, { list } from '@/libs/music/music';
  import * as Tone from 'tone';
  window.Tone = Tone;

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        music,
      };
    },
    beforeCreate() {
      console.log('beforeCreate');
    },
    beforeDestroy() {
      console.log('beforeDestroy');
    },
    methods: {
      toggle: function() {
        this.music.tryToggle();
      },
    },
    computed: {
      playing() {
        return this.music.started;
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
</style>
