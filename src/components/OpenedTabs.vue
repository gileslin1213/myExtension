<script setup>
import { Close } from '@element-plus/icons-vue';
import draggable from 'vuedraggable';
import useTabStore from '@/store/tab';

const store = useTabStore();

const onDragStart = (evt, tab) => {
  evt.dataTransfer.setData('tab', JSON.stringify(tab));
};
const onDragEnd = ({ newIndex, oldIndex, originalEvent }) => {
  if (newIndex === oldIndex) return;
  const dragTab = JSON.parse(originalEvent.dataTransfer.getData('tab'));
  store.moveTabs({
    id: dragTab.id,
    index: dragTab.index - oldIndex + newIndex,
  });
};
onMounted(() => store.listenerInit());
</script>

<template>
  <ul>
    <draggable :list="store.currentTabs" item-key="url" @end="onDragEnd">
      <template #item="{ element }">
        <li @dragstart="onDragStart($event, element)">
          <img :src="element.favIconUrl ? element.favIconUrl : 'favicon.ico'" />
          <span>{{ element.title }}</span>
          <el-button
            :icon="Close"
            text
            @click="store.removeTabs(element.id)"
          ></el-button>
        </li>
      </template>
    </draggable>
  </ul>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 16px;
}

li {
  padding: 1em;
  border-radius: 0.25em;
  margin-bottom: 1em;
  box-shadow: 0px 5px 10px black;
  display: flex;
  align-items: center;
}

img {
  margin-right: 0.8em;
  width: 16px;
  height: 16px;
}

span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 1.2;
  flex-grow: 1;
}
</style>
