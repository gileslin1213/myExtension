<script setup>
// const props = defineProps({
//   select:String
// })
// const emit = defineEmits(["select"]);
const list = reactive([
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
          {
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
      },
      {
        label: 'Level two 2-2',
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
      },
      {
        label: 'Level two 3-2',
      },
    ],
  },
]);
const contextMenu = reactive({ position: null, node: null, show: false });
const handleRightClick = ({ clientX, clientY }, data, node) => {
  // console.log( event,data, node);
  contextMenu.position = { x: clientX, y: clientY }
  contextMenu.node = node
  contextMenu.show = true
};
const treeRef = ref(null);
const edit = (value) => {
  contextMenu.node.data.label = value
}
const create = (value) => {
  unref(treeRef).append({ label: value }, contextMenu.node)
}
const remove = () => unref(treeRef).remove(contextMenu.node) 
</script>

<template>
  <el-tree ref="treeRef" :data="list" @node-contextmenu="handleRightClick" default-expand-all
    :expand-on-click-node="false">
  </el-tree>
  <ContextMenu v-model="contextMenu.show" :data="contextMenu.node.data" :position="contextMenu.position"
    :buttons="['edit', 'create', 'delete']" @edit="edit" @create="create" @delete="remove">
  </ContextMenu>
</template>

<style scoped>
</style>
