<template>
  <div>
    <draggable tag="ul" v-model="list" v-bind="dragOptions">
      <transition-group>
        <li
          class="list-group-item"
          v-for="element in list"
          :key="element.order"
        >
          {{ element.name }}
        </li>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  const message = [
    'vue.draggable',
    'draggable',
    'component',
    'for',
    'vue.js 2.0',
    'based',
    'on',
    'Sortablejs',
  ];

  export default {
    name: 'transition-example-2',
    display: 'Transitions',
    order: 7,
    components: {
      draggable,
    },
    data() {
      return {
        list: message.map((name, index) => {
          return { name, order: index + 1 };
        }),
        drag: false,
      };
    },
    computed: {
      dragOptions() {
        return {
          animation: 200,
          disabled: false,
          ghostClass: 'ghost',
        };
      },
    },
  };
</script>

<style>
  .ghost {
    opacity: 0.5;
    background: #bada55;
  }
  .list-group-item:active {
    cursor: move;
  }
</style>
