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
  import Header from './components/TheHeader';
  import Footer from './components/TheFooter';
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
  body {
    background: silver;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
