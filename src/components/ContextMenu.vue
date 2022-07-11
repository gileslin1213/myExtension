<script setup>
import { Edit, Plus, Delete } from '@element-plus/icons-vue'

const props = defineProps({
  modelValue: Boolean,
  data: Object,
  position: Object,
  inputData: Boolean
})
const emit = defineEmits(['update:modelValue', 'edit', 'create', 'delete'])
const type = ref(null)
const input = ref(null)
const inputRef = ref(null)
const contextMenuRef = ref(null)
const events = computed(() => {
  const edit = { name: 'edit', icon: Edit,getProps:true,input:true }
  const remove = { name: 'delete', icon: Delete,needConfirm:true }
  const create = { name: 'create', icon: Plus,input:true }
  return props.data ? [edit, remove, create] : [create]
})
const handleClick = (evt) => {
  if (!props.inputData && evt.needConfirm) {
    emit(evt)
    handleCancel()
  } else {
    if (evt.getProps) input.value = props.data.label
    type.value = evt
  }
}
const handleConfirm = () => {
  emit(type.value.name, input.value)
  handleCancel()
}
const handleCancel = () => {
  input.value = null
  type.value = null
  emit('update:modelValue', false)
}
const vFocus = {
  mounted: () => {
    unref(inputRef).focus()
  }
}
onClickOutside(contextMenuRef, () => handleCancel())
</script>

<template>
  <div
    ref="contextMenuRef"
    id="contextMenu"
    v-if="modelValue"
    :class="{ confirm: type }"
    :style="`top:${position.y}px;left:${position.x}px`">
    <div v-if="!type">
      <el-button
        v-for="event in events"
        @click="handleClick(event)"
        :key="event.name"
        :icon="event.icon"
        circle />
    </div>
    <div v-else>
      <el-row v-if="inputData && type.input" style="margin-bottom: 1em">
        <el-input
          v-focus
          ref="inputRef"
          v-model="input"
          @keydown.enter="handleConfirm"
          placeholder="請輸入名稱" />
      </el-row>
      <el-row justify="end">
        <el-button @click="handleCancel" type="info" plain>取消</el-button>
        <el-button
          @click="handleConfirm"
          :type="type.needConfirm ? 'danger' : 'primary'"
          plain
          >確定</el-button
        >
      </el-row>
    </div>
  </div>
</template>
<style scoped>
#contextMenu {
  position: absolute;
  width: fit-content;
  z-index:10;
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
