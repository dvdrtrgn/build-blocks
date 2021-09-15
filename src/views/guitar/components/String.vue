<template>
  <div class="string">
    <div class="nut">{{ strName.slice(0, 1) }}</div>

    <Fret
      v-for="(_, i) in frets"
      :fretNum="i"
      :strName="strName"
      :active="fretted.fret === i"
      :key="i"
      @fretted="getPressed"
    />
  </div>
</template>

<script>
  import Fret from './StringFret.vue';

  export default {
    props: {
      strName: String,
      strNum: Number,
    },
    components: { Fret },
    data: () => {
      return {
        frets: Array(23),
        fretted: { fret: 0 },
      };
    },
    methods: {
      getPressed(arg) {
        this.fretted = arg;
      },
    },
    watch: {
      fretted() {
        this.$emit('stringPress', {
          note: this.fretted.raw,
          string: this.strNum,
        });
      },
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
