<script setup>
import { Search } from '@element-plus/icons-vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div style="width: calc(80% - 600px);text-align: center;margin: 0 auto;">
          <el-input placeholder="搜尋" :prefix-icon="Search" />
        </div>
      </el-header>
      <el-container>
        <section class="menu">
        </section>
        <el-main>
        </el-main>
        <el-aside>
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style>
body {
  margin: 0;
}

.el-header {
  padding-top: 20px;
  box-shadow: var(--el-box-shadow-dark);
  background-color: var(--el-bg-color);
}

.menu,
aside {
  width: 300px;
  height: calc(100vh - 60px);
  box-shadow: var(--el-box-shadow-dark);
}

main {
  height: calc(100vh - 60px);
}
</style>
