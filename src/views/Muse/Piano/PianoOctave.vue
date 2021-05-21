<template lang="pug">
  .keylist
    PianoKey(
      v-for="pitch in octave"
      :pitch="pitch"
      :key="pitch"
    )
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
