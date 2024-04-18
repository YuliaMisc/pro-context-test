<template>
  <section class="main">
    <div class="main_container">
      <section class="tree-list">
        <TreeList
          v-for="list in listsStore.lists"
          :key="list.id"
          :list="list"
        />
      </section>
      <section class="list-items">
        <ListItems
          v-for="list in listsStore.lists"
          :key="list.id"
          :list="list"
        />
      </section>
    </div>
  </section>
</template>

<script setup>
  import { useListsStore } from '../store/useListsStore';
  import TreeList from '../components/ListsTree/TreeList.vue';
  import ListItems from '../components/ListsList/ListItems.vue';

  const listsStore = useListsStore();
</script>