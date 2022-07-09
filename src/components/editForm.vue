<script setup>
const props = defineProps({
  modelValue: [null, String],
  formData: Object
})
const emit = defineEmits(['update:modelValue'])
const defaultForm = {
  folder: "",
  tags: [],
  title: "",
  favIconUrl: "",
  description: "",
  checked: false,
  url: ""
}
const options = reactive(['1', '2', '3'])
const form = computed(() => {
  const obj = new Object;
  for (const key of Object.keys(defaultForm)) {
    obj[key] = props.formData[key] ? props.formData[key] : defaultForm[key]
  }
  return reactive(obj)
})
</script>

<template>
  <el-dialog :model-value="Boolean(modelValue)" @close="emit('update:modelValue', null)" title="新增" width="50%">
    <el-form label-width="120px">
      <el-form-item label="標題">
        <el-input v-model="form.title">
          <template #prefix>
            <img :src="form.favIconUrl || 'favicon.ico'">
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="連結">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item label="已讀">
        <el-switch v-model="form.checked" />
      </el-form-item>
      <el-form-item label="標籤">
        <el-select v-model="form.tags" multiple filterable allow-create default-first-option>
          <el-option v-for="item in options" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('update:modelValue', null)">取消</el-button>
        <el-button type="primary" @click="">新增</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.el-select {
  width: 100%;
}

img {
  width: 1em;
}

.el-tag {
  margin-right: .5em;
}
</style>
