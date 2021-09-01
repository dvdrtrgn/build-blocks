<template>
  <div id="App">
    <Header />
    <Main />
    <Footer />
  </div>
</template>

<script>
  import Main from '@/views/Main';
  import Header from '@/components/TheHeader';
  import Footer from '@/components/TheFooter';

  export default {
    name: 'app',
    components: {
      Main,
      Header,
      Footer,
    },
  };
</script>

<style lang="scss">
  body {
    background: silver;
  }
  #App {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
