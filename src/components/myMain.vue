<script setup>
import { Edit } from '@element-plus/icons-vue'
const data = [
  {
    folder: "aa",
    tags: ["tagA", "tagB"],
    title: "test1",
    favIconUrl: "https://element-plus.org/images/element-plus-logo-small.svg",
    description: "this is some text",
    checked: true
  },
  {
    folder: "aa",
    tags: ["tagA", "tagB", "tagA", "tagA", "tagA", "tagA", "tagA",],
    title: "test2",
    favIconUrl: "https://element-plus.org/images/element-plus-logo-small.svg",
    description: "this is some text",
    checked: true
  }, {
    folder: "aa",
    tags: ["tagA", "tagB"],
    title: "test3",
    favIconUrl: "https://element-plus.org/images/element-plus-logo-small.svg",
    description: "this is some text",
    checked: true
  },
  {
    folder: "aa",
    tags: ["tagA", "tagB"],
    title: "test4",
    favIconUrl: "https://element-plus.org/images/element-plus-logo-small.svg",
    description: "this is some text",
    checked: false
  }
]
let editData = reactive({ type: null, tab: null })

const RowClassName = ({ row }) => {
  return row.checked ? '' : 'unchecked'
}
const handleClick = (row) => {
  editData.tab = row
  editData.type = "edit"
}
const onDrop = (evt) => {
  const savaTab = evt.dataTransfer.getData('tab')
  editData.tab = JSON.parse(savaTab);
  editData.type = 'create'
}
</script>

<template>
  <el-button @click="editData.type = 'edit'; " :icon="Edit" text></el-button>
  <el-table :data="data" :show-header="false" :row-class-name="RowClassName" @cell-click="handleClick">
    <el-table-column width="40">
      <template #default="scope">
        <img :src="scope.row.favIconUrl ?? 'favicon.ico'" />
      </template>
    </el-table-column>
    <el-table-column prop="title" />
    <el-table-column width="400">
      <template #default="scope">
        <el-tag v-for="item in scope.row.tags" effect="plain">
          {{ item }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column type="expand">
      <template #default="props">
        {{ props.row.description }}
      </template>
    </el-table-column>
  </el-table>
  <editForm v-model="editData.type" :form-data="editData.tab"></editForm>
</template>

<style scoped>
.el-table {
  font-size: 18px;
}

img {
  width: 20px;
  vertical-align: middle;
}

.el-tag {
  margin-right: .5em;
}
</style>
<style>
.el-table .unchecked {
  background-color: var(--el-color-danger-light-9);
}

.el-table .cell {
  line-height: 30px;
}
</style>
