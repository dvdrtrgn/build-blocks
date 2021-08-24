<template>
  <label>
    {{ nom }} ({{ vol }})
    <input type="range" min="0" max="100" :value="vol" @input="onInput" />
  </label>
</template>

<script>
  export default {
    props: {
      nom: {
        type: String,
        default: '?',
      },
      vol: {
        type: [Number, String],
        default: 50,
      },
    },
    emits: ['update:vol'],
    methods: {
      onInput(event) {
        this.$emit('update:vol', event.target.value);
      },
    },
  };
</script>

<style></style>
