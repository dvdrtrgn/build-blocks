<template>
  <button @click="play">Play {{ mode }}</button>
  <p>Offset Keys: {{ offsets }}</p>
  <pre>
Notes for octave: {{ notes }}
  </pre>
</template>

<script>
  import ModesModel from '../libs/modes-model.js';
  import ScaleNotes from '../libs/scaleNotes.js';
  import Toner from '../libs/tone_wrap.js';

  export default {
    props: ['mode'],
    methods: {
      play() {
        Toner.playSequence(this.names);
      },
    },
    computed: {
      offsets() {
        return ModesModel.offsets[this.mode];
      },
      notes() {
        return ScaleNotes.mapOffsetsToNotes(this.offsets);
      },
      names() {
        return this.notes.map((e) => e.name);
      },
    },
    created() {},
  };
</script>
