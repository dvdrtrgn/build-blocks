<template lang="pug">
  section.num1: .wrap

    h1 {{msg}}

    p Voice 1:
      button(@click='playTone1' data-pitch='C5') Synth C note
      button(@click='playTone1' data-pitch='G5') Synth G note

    p Voice 2:
      button(@click='playTone2' data-pitch='C5') Synth C note
      button(@click='playTone2' data-pitch='G5') Synth G note

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
  import * as Tone from 'tone';

  var data = {
    duration: Store.getters.getTime,
  };
  var synth1 = new Tone.Synth().toDestination();
  var synth2 = new Tone.Synth().toDestination();

  function updateTime() {
    console.log(Store);
    Store.commit('setTime', data.duration);
  }

  function markTime() {
    synth1.triggerAttackRelease('C4', data.duration);
    updateTime();
  }

  export default {
    name: 'Section1',
    data: () => data,
    props: {
      msg: String,
    },
    methods: {
      markTime,
      playTone1: function(evt) {
        let dats = evt.target.dataset;
        synth1.triggerAttackRelease(dats.pitch, data.duration);
      },
      playTone2: function(evt) {
        let dats = evt.target.dataset;
        synth2.triggerAttackRelease(dats.pitch, data.duration);
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
