<template>
  <label>
    Song:
    <select v-model="selected">
      <option value="" disabled>Select One</option>
      <option v-for="name in names" :key="name">{{ name }}</option>
    </select>
  </label>
</template>

<script>
  import SongsModel from '../libs/songs-model.js';

  export default {
    props: ['modelSong'],
    emits: ['update:modelSong'],
    computed: {
      names() {
        return SongsModel.names;
      },
      selected: {
        get() {
          return this.modelSong;
        },
        set(val) {
          this.$emit('update:modelSong', val);
        },
      },
    },
  };
</script>
