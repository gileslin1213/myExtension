<script setup>
// const props = defineProps({
//   select:String
// })
// const emit = defineEmits(["select"]);
import db from '../firebase'
import { doc, setDoc, addDoc, updateDoc, getDoc } from 'firebase/firestore'

const docRef = doc(db, 'cities/folder')
const list = reactive([])
const contextMenu = reactive({ position: null, data: null, show: false })
const handleRightClick = (event, data) => {
  event.preventDefault()
  const { clientX, clientY } = event
  // console.log( event,data, node);
  contextMenu.position = { x: clientX, y: clientY }
  contextMenu.data = data ?? null
  contextMenu.show = true
}

const treeRef = ref(null)
const edit = (value) => {
  contextMenu.data.label = value
  // updateDoc(docRef, toObject(list))
}
const create = (value) => {
  unref(treeRef).append({ label: value }, contextMenu.data)
  updateDoc(docRef, { wrapper: list })
  // console.log(toObject(list));
}
const remove = () => {
  unref(treeRef).remove(contextMenu.data)
  // updateDoc(docRef, toObject(list))
}

onMounted(() => {
  getDoc(docRef).then((docSnap) => {
    const data = docSnap.data()
    if (Object.keys(data).length) {
      data.wrapper.forEach(el => list.push(el))
    }
  })
})
</script>

<template>
  <div @contextmenu="handleRightClick" style="flex-grow:1">
    <el-tree ref="treeRef" :data="list" node-key="label" @node-contextmenu="handleRightClick" default-expand-all
      :expand-on-click-node="false" />
    <ContextMenu v-model="contextMenu.show" :data="contextMenu.data" :position="contextMenu.position" @edit="edit"
      @create="create" @delete="remove" :inputData="true" />
  </div>
</template>

<style scoped>
.el-tree {
  flex-grow: 1;
}
</style>
