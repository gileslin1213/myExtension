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
    tags: ["tagA", "tagB"],
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
    checked: true
  }
]
let editData = reactive({ type: null, tab: null })
const onDrop = (evt) => {
  const savaTab = evt.dataTransfer.getData('tab')
  editData.tab= JSON.parse(savaTab);
  editData.type = 'create'
}
</script>

<template>
  <!-- <el-empty description="沒有資料" /> -->
  <ul @drop="onDrop" @dragover.prevent @dragenter.prevent>
    <li v-for="el in data">
      <el-tooltip effect="dark" :content="el.description" placement="top-start">
        <div style="flex-grow:1">
          <div style="display:flex;align-items:center">
            <img :src="el.favIconUrl ? el.favIconUrl : 'favicon.ico'">
            <span>{{ el.title }}</span>
          </div>
          <div>
            <el-tag v-for="item in el.tags" effect="plain" size="small">
              {{ item }}
            </el-tag>
          </div>
        </div>
      </el-tooltip>
      <el-button @click="editData.type = 'edit';editData.tab = el; " :icon="Edit" text></el-button>
    </li>
  </ul>

  <editForm v-model="editData.type" :form-data="editData.tab"></editForm>
</template>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 1.25rem;
  height: 100%;
}

li {
  padding: .5em;
  border-radius: .25em;
  display: flex;
  align-items: center;
}

li:hover {
  background: #000;
}

img {
  margin-right: .8em;
  width: 1em;
  height: 1em;
}

span {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

button {
  font-size: inherit;
}

.el-tag {
  margin-right: .5em;
}
</style>
