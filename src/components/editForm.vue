<script setup>
import useGlobalStore from '@/store/global';
import useMenuStore from '@/store/menu';

const store = useMenuStore();
const global = useGlobalStore();
const props = defineProps({
  type: {
    type: String,
    default: null,
  },
  formData: {
    type: Object,
    default() {
      return {
        folder: '',
        tags: [],
        title: '',
        favIconUrl: '',
        description: '',
        checked: false,
        url: '',
        id: '',
      };
    },
  },
});
const _data = {
  folder: toRaw(global.current.folder),
  tags: [],
  title: '',
  favIconUrl: '',
  description: '',
  checked: false,
  url: '',
  docId: '',
  id: '',
};
Object.keys(_data).forEach((key) => {
  _data[key] = props.formData[key] || _data[key];
});

const form = reactive(_data);
const visible = ref(true);
const emit = defineEmits(['create', 'edit', 'remove', 'cancel']);
</script>

<template>
  <el-dialog
    :model-value="visible"
    :title="type == 'edit' ? '編輯' : '新增'"
    width="500px"
    @closed="emit('cancel')"
  >
    <el-form :model="form">
      <el-form-item label="資料夾">
        <el-select v-model="form.folder" value-key="id">
          <el-option
            v-for="item in store.folderList"
            :key="item.id"
            :label="item.label"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="標題">
        <el-input v-model="form.title">
          <template #prefix>
            <img :src="form.favIconUrl || 'favicon.ico'" />
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
        <el-select
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="item in store.tags"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="form.description" :rows="2" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          v-if="type == 'edit'"
          type="danger"
          style="float: left"
          @click="
            emit('remove', _data);
            visible = false;
          "
          >刪除</el-button
        >
        <el-button @click="visible = false">取消</el-button>
        <el-button
          type="primary"
          @click="
            emit(type, _data);
            visible = false;
          "
        >
          {{ type == 'edit' ? '確定' : '新增' }}
        </el-button>
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
  margin-right: 0.5em;
}
</style>
