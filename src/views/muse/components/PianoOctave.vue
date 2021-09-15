<template>
  <div class="keylist">
    <PianoKey v-for="pitch in octave" :pitch="pitch" :key="pitch"></PianoKey>
  </div>
</template>

<script>
  import PianoKey from './PianoKey';

  export default {
    props: ['octave'],
    components: {
      PianoKey,
    },
  };
</script>

<style lang="scss">
  #Piano .keylist {
    display: inline-block;
  }
</style>
