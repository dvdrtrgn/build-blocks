<template>
  <div :id="$route.name">
    <Header>
      <NavBar />
    </Header>
    <router-view />
    <Footer />
  </div>
</template>

<script>
  import Header from './components/TheHeader.vue';
  import Footer from './components/TheFooter.vue';
  import NavBar from './components/NavBar.vue';

  export default {
    name: 'app',
    components: {
      NavBar,
      Header,
      Footer,
    },
  };
</script>

<style lang="scss">
  @import '@/scss/base.scss';
  body {
    background: silver;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  main {
    height: 100vh;
    padding-top: 8vh;
    padding-bottom: 5vh;
  }

  .flexed {
    align-items: center;
    display: flex;
    justify-content: center;
  }
</style>
