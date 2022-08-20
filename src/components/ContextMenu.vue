<script setup>
import { Edit, Plus, Delete } from '@element-plus/icons-vue';

const props = defineProps({
  data: {
    type: Object,
    default: null,
  },
  position: {
    type: Object,
    default: null,
  },
  check: {
    type: Array,
    default: null,
  },
});
const emit = defineEmits(['change', 'cancel']);
const type = ref(null);
const input = ref(null);
const contextMenuRef = ref(null);
const events = computed(() => {
  const edit = {
    name: 'edit',
    icon: Edit,
    getProps: true,
    input: true,
  };
  const remove = { name: 'remove', icon: Delete, needConfirm: true };
  const create = { name: 'create', icon: Plus, input: true };
  return props.data ? [create, edit, remove] : [create];
});

const handleClick = (evt) => {
  if (evt.getProps) input.value = props.data.label;
  type.value = evt;
};
const validate = computed(() => props.check.includes(input.value));
const handleConfirm = () => {
  emit('change', type.value.name, props.data, input.value);
  emit('cancel');
};
const vFocus = {
  mounted: (el) => {
    const _input = el.querySelector('input');
    _input.focus();
    // mounted can't get value by el
    // if (_input.value) _input.select();
  },
};
onClickOutside(contextMenuRef, () => emit('cancel'));
</script>

<template>
  <div
    id="contextMenu"
    ref="contextMenuRef"
    :class="{ confirm: type }"
    :style="`left:${position.clientX - 10}px;top:${position.clientY - 10}px`"
  >
    <div v-if="!type">
      <el-button
        v-for="event in events"
        :key="event.name"
        :icon="event.icon"
        circle
        @click="handleClick(event)"
      />
    </div>
    <div v-else>
      <el-row v-if="type.input" style="margin-bottom: 1em">
        <el-input
          v-model="input"
          v-focus
          :class="{ error: validate }"
          placeholder="請輸入名稱"
          @keydown.enter="handleConfirm"
        />
      </el-row>
      <el-row justify="end">
        <el-button type="info" plain @click="emit('cancel')">取消</el-button>
        <el-button
          :type="type.needConfirm ? 'danger' : 'primary'"
          plain
          :disabled="validate || (type.input && !Boolean(input))"
          @click="handleConfirm"
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
  z-index: 10;
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
.el-input.error {
  --el-input-border-color: var(--el-color-danger-light-3);
  --el-input-hover-border-color: var(--el-color-danger-light-3);
  --el-input-focus-border-color: var(--el-color-danger-light-3);
}
.error::after {
  content: '重複命名';
  color: var(--el-color-danger-light-3);
  position: absolute;
  top: 1.8em;
}
</style>
