<script setup>
import { Close } from '@element-plus/icons-vue'
import draggable from 'vuedraggable'

const tabList = reactive([])

const updateList = () => {
  chrome.tabs.query({ pinned: false }, (tabs) => {
    tabList.splice(0)
    tabList.push(...tabs)
  })
}
const removeTab = (tab) => {
  chrome.tabs.remove(tab.id)
}
const onDragStart = (evt, tab) => {
  evt.dataTransfer.setData('tab', JSON.stringify(tab))
}
const onDragEnd = ({ newIndex, oldIndex, originalEvent }) => {
  let dragTab = tabList[newIndex]
  chrome.tabs.move(dragTab.id, { index: dragTab.index - oldIndex + newIndex })
}
const listener = ["onCreated", "onMoved", "onRemoved", "onUpdated"]
listener.forEach(event => chrome.tabs[event].addListener(() => updateList()))
updateList();
</script>

<template>
  <ul>
    <draggable :list="tabList" @end="onDragEnd" group="people" item-key="url">
      <template #item="{ element }">
        <li @dragstart="onDragStart($event, element)">
          <img :src="element.favIconUrl ? element.favIconUrl : 'favicon.ico'">
          <span>{{ element.title }}</span>
          <el-button @click="removeTab(element)" :icon="Close" text></el-button>
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
