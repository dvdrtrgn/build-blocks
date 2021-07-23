<template>
  <section id="Music">
    <button @click="toggle" :class="{ active: playing }">Play/Pause</button>
  </section>
</template>

<script>
  import music, { misc } from '@/libs/music/music';

  console.log(misc);

  export default {
    components: {},
    mounted() {},
    data() {
      return {
        music,
      };
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
