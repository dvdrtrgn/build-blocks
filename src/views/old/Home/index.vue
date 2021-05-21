<template lang="pug">
  .home
    //- Header(msg='The Private Bank')

    main
      Section1(msg='Section1 Stuff')
      Section2(msg='Section2 Stuff')
      <!-- Section3(msg='Section3 Stuff') -->
      <!-- Section4(msg='Section4 Stuff') -->

    Footer(msg='Footer Stuff')
  //-
</template>

<script>
  // @ is an alias to /src
  import Header from '@/components/Header';
  import Section1 from './Section1.vue';
  import Section2 from './Section2.vue';
  import Section3 from './Section3.vue';
  import Section4 from './Section4.vue';
  import Footer from '@/components/Footer';

  export default {
    name: 'home',
    components: {
      Header,
      Section1,
      Section2,
      Section3,
      Section4,
      Footer,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  .wrap {
    max-width: 90%;
    margin: auto;
  }
  main {
    background: white;
    border: 1px solid gray;
    // margin-top: 10vh;
    min-height: 80vh;
  }
</style>
