<template lang="pug">
  section.num1: .wrap

    p Key of C
      Button(
        v-for='pitch in scale'
        :pitch='pitch' :key='pitch'
      ) {{ pitch }}

      label Sustain
        select(@change='markTime' v-model='duration')
          option(v-for='opt in seconds') {{ opt }}
  //-
</template>

<script>
  /* eslint-disable no-console */
  import Store from '@/store';
  import Button from './Button';
  import synth from './synth.js';

  export default {
    components: {
      Button,
    },
    props: {
      msg: String,
    },
    data() {
      return {
        duration: Store.getters.getTime, // initial value
        synth: synth.make(),
        scale: 'C4 D4 E4 F4 G4 A4 B4 C5'.split(' '),
        seconds: [0, 1, 2, 3, 4],
      };
    },
    methods: {
      beep() {
        this.synth.start('C2', this.duration / 2);
      },
      updateTime() {
        Store.commit('setTime', this.duration);
      },
      markTime() {
        this.updateTime();
        this.beep();
      },
    },
  };
</script>

<style lang="scss">
  @import '@/scss/vars.scss';

  section.num1 {
    background: $color4;
  }
  section {
    line-height: 2;

    button {
      border: 1px solid gray;
      cursor: pointer;
      margin: 3px;

      &:hover {
        background-color: black;
        color: white;
      }
    }
    select {
      -webkit-appearance: menulist;
    }
  }
</style>
