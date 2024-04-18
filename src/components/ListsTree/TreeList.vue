<template>
  <div class="tree-list_container">
    <div class="tree-list_list" >
      <div class="tree-list_title">
        <div class="tree-list_title_icons" @click.prevent="listsStore.toggleListExpanded(list)">
          <span v-if="list.expanded">&#5167;</span>
          <span v-else>&#5171;</span>
        </div>
        <input
            type="checkbox"
            :indeterminate="listsStore.isListIndeterminate(list)"
            :checked="listsStore.isListChecked(list)"
            @change="listsStore.changeListChecked(list)"
          >
        <label @click.prevent="listsStore.toggleListExpanded(list)">
          {{ list.name }}
        </label>
      </div>
    </div>
    <div class="tree-list_items" v-if="list.expanded">
      <TreeItem
        v-for="item in list.items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useListsStore } from '../../store/useListsStore';
  import TreeItem from './TreeItem.vue';

  defineProps({
    list: Object,
  });

  const listsStore = useListsStore();

</script>

