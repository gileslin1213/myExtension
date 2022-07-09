<script setup>
import { Close } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'

const store = useStore()

const tabList = computed(() => store.state.tab.currentTabs);


const onDragStart = (evt, tab) => {
  evt.dataTransfer.setData('tab', JSON.stringify(tab))
}
const onDragEnd = ({ newIndex, oldIndex, originalEvent }) => {
  const dragTab = JSON.parse(originalEvent.dataTransfer.getData('tab'))
  store.dispatch('tab/moveTabs', { id: dragTab.id, index: dragTab.index - oldIndex + newIndex })
}
store.dispatch('tab/listenerInit')
</script>

<template>
  <ul>
    <draggable :list="tabList" @end="onDragEnd" group="people" item-key="url">
      <template #item="{ element }">
        <li @dragstart="onDragStart($event, element)">
          <img :src="element.favIconUrl ? element.favIconUrl : 'favicon.ico'">
          <span>{{ element.title }}</span>
          <el-button @click="store.dispatch('tab/removeTabs', element.id)" :icon="Close" text></el-button>
        </li>
      </template>
    </draggable>
  </ul>
</template>

<style scoped>
ul {
  padding: 1em;
  margin: 0;
  list-style: none;
  font-size: 16px;
}

li {
  padding: 1em;
  border-radius: .25em;
  margin-bottom: 1em;
  box-shadow: 0px 3px 5px rgba(255, 255, 255, .15);
  display: flex;
  align-items: center;
}

img {
  margin-right: .8em;
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
