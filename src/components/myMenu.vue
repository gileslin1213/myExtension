<script setup>
import folderList from './folderList.vue'
import tagList from './tagList.vue'
import { Folder, CollectionTag } from '@element-plus/icons-vue'
const currentList = ref("folderList")

// const props = defineProps({
//   show:Object
// })
</script>

<template>
  <el-row justify="end">
    <el-radio-group v-model="currentList">
      <el-radio-button label="folderList">
        <el-icon :size="20">
          <Folder />
        </el-icon>
      </el-radio-button>
      <!-- <el-radio-button label="tagList">
        <el-icon :size="20">
          <CollectionTag />
        </el-icon>
      </el-radio-button> -->
    </el-radio-group>
  </el-row>
  <component :is="currentList == `folderList` ? folderList : tagList"></component>
</template>

<style scoped>
</style>
