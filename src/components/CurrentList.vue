<script setup>
import { FolderOpened } from '@element-plus/icons-vue';
import useGlobalStore from '@/store/global';

const store = useGlobalStore();
const { current } = storeToRefs(store);
</script>
<template>
  <div class="wrapper" style="margin: 0 300px">
    <div class="wrapper" style="min-width: 8em">
      <el-icon :size="20" style="margin-right: 0.3em">
        <FolderOpened />
      </el-icon>
      {{ current.folder.label }}
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
