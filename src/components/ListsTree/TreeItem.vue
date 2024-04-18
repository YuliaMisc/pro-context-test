<template>
  <section class="tree-item">
    <div class="tree-item_title">
      <label>
        <input
          type="checkbox"
          :checked="item.checked"
          @change="listsStore.changeItemChecked(item)"
        >
        {{ item.name }}
      </label>
    </div>
    <div class="tree-item_params">
      <label>
        <input type="number" :value="item.count" step="5" min="0" max="100" @input="handleCountInput">
      </label>
      <label>
        <input type="color" :value="item.color" @input="handleInputColor">
      </label>
    </div>
  </section>
</template>

<script setup>
  import { defineProps } from 'vue';
  import { useListsStore } from '../../store/useListsStore';

  const props = defineProps({
    item: Object,
  });

  const listsStore = useListsStore();

  const handleCountInput = (e) => {
    const count = Number(e.target.value) > 100 ? 100 : Number(e.target.value);
    listsStore.setItemCount(props.item, Math.abs(count));
  };

  const handleInputColor = (e) => {
    listsStore.setItemColor(props.item, e.target.value);
  };

</script>