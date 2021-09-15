<template>
  <div class="string">
    <div class="nut">{{ str.slice(0, 1) }}</div>

    <Fret v-for="(fret, index) in frets" :idx="index" :str="str" :key="index" />
  </div>
</template>

<script>
  import Fret from './StringFret.vue';

  export default {
    name: 'String',
    components: {
      Fret,
    },
    data: () => {
      return {
        frets: '0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3 0 1 2 3 0 1 2'.split(' '),
      };
    },
    props: {
      str: String,
    },
  };
</script>

<style lang="scss">
  .string {
    background-color: gray;
    border-bottom: 1px dotted white;
    border-top: 1px dotted white;
    color: blue;
    line-height: 0;
    margin-top: 1em;
    margin-bottom: 1em;
    white-space: nowrap;

    & + & {
      margin-top: 1.5em; // just enough overlap
    }

    .nut {
      background-image: linear-gradient(to right, white, gray);
      display: inline-block;
      line-height: 2;
      position: relative;
      text-align: center;
      width: 2rem;
      z-index: 9;
    }

    > * {
      margin-top: -1em;
      margin-bottom: -1em;
    }
  }
</style>
