<script setup>
import { Edit, Plus, Delete } from "@element-plus/icons-vue";

const props = defineProps({
  modelValue: Boolean,
  data: Object,
  position: Object,
  buttons: Array
})
const emit = defineEmits(['update:modelValue', 'edit', 'create', 'delete']);
const type = ref(null)
const input = ref(null)
const inputRef = ref(null)
const contextMenuRef = ref(null)
const icons = {
  create: Plus,
  edit: Edit,
  delete: Delete
}
const handleClick = (evt) => {
  switch (evt) {
    case 'edit':
      input.value = props.data.label
    default:
      type.value = evt
      break;
  }
}
const handleConfirm = () => {
  emit(type.value, input.value);
  handleCancel();
}
const handleCancel = () => {
  input.value = null;
  type.value = null;
  emit('update:modelValue', false)
}
const vFocus = {
  mounted: () => {
    unref(inputRef).focus()
  }
}
onClickOutside(contextMenuRef, () => handleCancel())
</script>

<template >
  <div ref="contextMenuRef" id="contextMenu" v-if="modelValue" :class="{ confirm: type }"
    :style="`top:${position.y}px;left:${position.x}px`">
    <div v-if="!type">
      <el-button v-for="btn in buttons" @click="handleClick(btn)" :icon="icons[btn]" circle />
    </div>
    <div v-else>
      <el-row v-if="!(type == 'delete')" style="margin-bottom: 1em;">
        <el-input v-focus ref="inputRef" v-model="input" @keydown.enter="handleConfirm" placeholder="請輸入名稱" />
      </el-row>
      <el-row justify="end">
        <el-button @click="handleCancel" type="info" plain>取消</el-button>
        <el-button @click="handleConfirm" :type="type == 'delete' ? 'danger' : 'primary'" plain>確定</el-button>
      </el-row>
    </div>
  </div>
</template>
<style scoped>
#contextMenu {
  position: absolute;
  width: fit-content;
}

#contextMenu.confirm {
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-light);
  border-radius: 10px;
  padding: 1em;
  box-shadow: 0px 0px 20px #000;
}

#contextMenu .el-button {
  background: #000000;
}
</style>