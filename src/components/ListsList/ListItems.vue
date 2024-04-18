<template>
  <section class="list-items_container">
    <div class="list-items_title">
      <h1>{{ list.name }}</h1>
      <button @click="toggleSorted()" v-if="!listsStore.isListEmpty(list)">
        {{ sorted ? 'Перемешать' : 'Сортировать' }}
      </button>
    </div>
    <div v-if="!listsStore.isListEmpty(list)">
      <ItemPoints v-if="sorted" :items="list.items"/>
      <MixedPoints v-else :points="listsStore.getMixedPoints(list)"/>
    </div>
  </section>
</template>

<script setup>
  import { ref, defineProps } from 'vue';
  import { useListsStore } from '../../store/useListsStore';
  import ItemPoints from './ItemPoints'
  import MixedPoints from './MixedPoints';

  defineProps({
    list: Object,
  });

  const sorted = ref(true);
  const listsStore = useListsStore();

  const toggleSorted = () => {
    sorted.value = !sorted.value;
  }
</script>