<template lang="pug">

  .container
    transition1
    transition2

</template>

<script>
  import transition1 from './transition1.vue';
  import transition2 from './transition2.vue';

  export default {
    components: {
      transition1,
      transition2,
    },
  };
</script>

<style lang="scss">
  .row {
    display: table;
    width: 100%;

    > * {
      display: table-cell;
    }
  }
</style>
