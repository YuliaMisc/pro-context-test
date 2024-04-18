import { ref } from 'vue';
import { defineStore } from 'pinia'

const data  = [
  {
    id: '1',
    name: 'List 1',
    items: [
      { id: '1', name: 'Item 1', count: 40, color: '#8bc34a' },
      { id: '2', name: 'Item 2', count: 40, color: '#4ac3be' },
      { id: '3', name: 'Item 3', count: 22, color: '#824ac3' },
      { id: '4', name: 'Item 4', count: 19, color: '#c34a4e' },
    ]
  },
  {
    id: '2',
    name: 'List 2',
    items: [
      { id: '1', name: 'Item 1', count: 12, color: '#8bc34a' },
      { id: '2', name: 'Item 2', count: 22, color: '#4ac3be' },
      { id: '3', name: 'Item 3', count: 42, color: '#824ac3' },
      { id: '4', name: 'Item 4', count: 58, color: '#c34a4e' },
      { id: '5', name: 'Item 5', count: 53, color: '#2d5e88' },
    ]
  },
  {
    id: '3',
    name: 'List 3',
    items: [
      { id: '1', name: 'Item 1', count: 42, color: '#8bc34a' },
      { id: '2', name: 'Item 2', count: 12, color: '#4ac3be' },
      { id: '3', name: 'Item 3', count: 25, color: '#824ac3' },
      { id: '4', name: 'Item 4', count: 42, color: '#c34a4e' },
      { id: '5', name: 'Item 5', count: 12, color: '#2d5e88' },
      { id: '6', name: 'Item 6', count: 28, color: '#c34a8b' },
      { id: '7', name: 'Item 7', count: 25, color: '#c3814b' },
    ]
  },
  {
    id: '4',
    name: 'List 4',
    items: [
      { id: '1', name: 'Item 1', count: 100, color: '#8bc34a'},
      { id: '2', name: 'Item 2', count: 81, color: '#4ac3be' },
      { id: '3', name: 'Item 3', count: 12, color: '#824ac3' },
      { id: '4', name: 'Item 4', count: 34, color: '#c34a4e' },
      { id: '5', name: 'Item 5', count: 56, color: '#2d5e88' },
      { id: '6', name: 'Item 6', count: 11, color: '#c34a8b' },
      { id: '7', name: 'Item 7', count: 13, color: '#c3814b' },
      { id: '8', name: 'Item 8', count: 46, color: '#4bc35f' },
    ]
  },
  {
    id: '5',
    name: 'List 5',
    items: [
      { id: '1', name: 'Item 1', count: 100, color: '#8bc34a' },
      { id: '2', name: 'Item 2', count: 81, color: '#4ac3be' },
      { id: '3', name: 'Item 3', count: 12, color: '#824ac3' },
      { id: '4', name: 'Item 4', count: 34, color: '#c34a4e' },
      { id: '5', name: 'Item 5', count: 56, color: '#2d5e88' },
      { id: '6', name: 'Item 6', count: 11, color: '#c34a8b' },
      { id: '7', name: 'Item 7', count: 13, color: '#c3814b' },
      { id: '8', name: 'Item 8', count: 46, color: '#4bc35f' },
      { id: '9', name: 'Item 9', count: 15, color: '#afc34b' },
      { id: '10', name: 'Item 10', count: 8, color: '#654bc3' },
    ]
  },
];

const defaultList = {
  expended: false,
}
const defaultItem = {
  checked: false,
}

export const useListsStore = defineStore('lists', () => {
	const lists = ref(
    data.map((listItem) => ({
      ...defaultList,
      ...listItem,
      items: listItem.items.map((item) => ({
        ...defaultItem,
        ...item,
      })),
    }))
  );

  const toggleListExpanded = (listItem) => {
    listItem.expanded = !listItem.expanded;
  };

  const changeListChecked = (list) => {
    const checkedItems = list.items.filter((item) => item.checked);
    
    if (checkedItems.length === list.items.length) {
      list.items.forEach((item) => {
        item.checked = false;
      });
    } else {
      list.items.forEach((item) => {
        item.checked = true;
      });
    }
  };

  const changeItemChecked = (item) => {
    item.checked = !item.checked;
  };

  const isListIndeterminate = (list) => {
    const checkedItems = list.items.filter((item) => item.checked);

    return list.items.length > checkedItems.length && checkedItems.length > 0;
  };

  const isListChecked = (list) => {
    const checkedItems = list.items.filter((item) => item.checked);

    return checkedItems.length === list.items.length;
  };

  const isListEmpty = (list) => {
    return list.items.filter((item) => item.checked).length === 0;
  };

  const setItemCount = (item, count) => {
    item.count = count;
  };

  const setItemColor = (item, color) => {
    item.color = color;
  };

  const decriseItemCount = (item) => {
    item.count--;
  };

  const getMixedPoints = (list) => {
      const points = list.items.reduce((acc, item) => {
        if (!item.checked) return acc;

        return [
          ...acc,
          ...Array.from({length: item.count}, (_, i) => ({color: item.color, listId: list.id, itemId: item.id, index: i})),
        ];
      }, []);

      return points.sort(() => Math.random() - 0.5);
  };

  const removeListPoint = (point) => {
    const list = lists.value.find((list) => list.id === point.listId);
    const item = list.items.find((item) => item.id === point.itemId);

    decriseItemCount(item);
  };

	return {
    lists,
    toggleListExpanded,
    changeListChecked,
    changeItemChecked,
    isListIndeterminate,
    isListChecked,
    setItemCount,
    setItemColor,
    decriseItemCount,
    getMixedPoints,
    removeListPoint,
    isListEmpty,
  };
});