<template lang="pug">
  section.num1: .wrap

    h1 {{msg}}

    p Voice 1:
      Button(pitch='C5')
      Button(pitch='G5')

    p Voice 2:
      Button(pitch='C5')
      Button(pitch='G5')

    label Duration:
      select(@change='markTime' v-model='duration')
        option 0.5
        option 1.0
        option 1.5
        option 2.0
        option 3
  //-
</template>

<script>
  /* eslint-disable no-console */
  import Store from '@/store';
  import Button from './Button';
  import * as Tone from 'tone';

  export default {
    data() {
      return {
        alert: new Tone.Synth().toDestination(),
        duration: Store.getters.getTime,
      };
    },
    components: {
      Button,
    },
    props: {
      msg: String,
    },
    methods: {
      updateTime() {
        console.log(Store);
        Store.commit('setTime', this.data.duration);
      },
      markTime() {
        this.alert.triggerAttackRelease('C6', 0.1);
        this.updateTime();
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
