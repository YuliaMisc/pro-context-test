<template>
  <div class="list-items_points" v-for="item in items" :key="item.id">
    <div v-if="item.checked">
      <button
        v-for="index in item.count"
        :key="`${item.id}-${index}`"
        :style="`background: ${item.color};`"
        @click="listsStore.decriseItemCount(item)"
      >
      </button>
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useListsStore } from '../../store/useListsStore';

  defineProps({
    items: Array,
  });
  const listsStore = useListsStore();

</script>