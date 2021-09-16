<template>
  <label>
    Mode:
    <select v-model="selected">
      <option value="" disabled>Select One</option>
      <option v-for="name in names" :key="name">{{ name }}</option>
    </select>
  </label>
</template>

<script>
  import ModesModel from './libs/modes-model.js';

  export default {
    props: ['modelMode'],
    emits: ['update:modelMode'],
    computed: {
      names() {
        return ModesModel.names;
      },
      selected: {
        get() {
          return this.modelMode;
        },
        set(val) {
          this.$emit('update:modelMode', val);
        },
      },
    },
  };
</script>
