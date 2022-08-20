<script setup>
import useMenuStore from '@/store/menu';
import useGlobalStore from '@/store/global';

const store = useMenuStore();
const global = useGlobalStore();
const contextMenu = reactive({ position: null, data: null });

const nodeRightClick = ({ clientX, clientY }, { label, id }) => {
  if (label === '全部' || label === '未分類') return;
  contextMenu.position = { clientX, clientY };
  contextMenu.data = { label, id };
};
const parentRightClick = (event) => {
  event.preventDefault();
  const { clientX, clientY } = event;
  contextMenu.position = { clientX, clientY };
};
const allowDrop = (draggingNode, dropNode) => {
  const { label } = dropNode.data;
  return !(label === '全部' || label === '未分類');
};
const allowDrag = (draggingNode) => {
  const { label } = draggingNode.data;
  return !(label === '全部' || label === '未分類');
};
const cancel = () => {
  contextMenu.position = null;
  contextMenu.data = null;
};
onMounted(() => {
  store.loadMenu();
});
</script>

<template>
  <div style="height: 50%" @contextmenu="parentRightClick">
    <el-tree
      :data="store.folderTree"
      :current-node-key="global.current.folder.id"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      node-key="id"
      draggable
      default-expand-all
      highlight-current
      :expand-on-click-node="false"
      @node-drop="store.updateMenu"
      @current-change="global.changeFolder"
      @node-contextmenu="nodeRightClick"
    />
  </div>
  <ContextMenu
    v-if="contextMenu.position"
    :data="contextMenu.data"
    :position="contextMenu.position"
    :check="store.checkList"
    @change="store.folderEvent"
    @cancel="cancel"
  />
</template>
<style>
.el-tree-node__content {
  border-radius: 0 1em 1em 0;
  height: 2em;
}
.el-tree-node__label {
  font-size: var(--el-font-size-medium);
}
</style>
