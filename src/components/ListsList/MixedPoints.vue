<template>
  <div class="list-items_mixed">
    <button
      v-for="point in points"
      :key="`${point.itemId}-${point.index}`"
      :style="`background: ${point.color}; width: 15px; height: 15px;`"
      @click="listsStore.removeListPoint(point)"
    >
    </button>
  </div>
 
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useListsStore } from '../../store/useListsStore';

  defineProps({
    points: Array,
  });
  const listsStore = useListsStore();

</script>