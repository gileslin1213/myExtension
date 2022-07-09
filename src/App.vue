<script setup>
import { Search } from '@element-plus/icons-vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div style="max-width: 500px;text-align: center;margin: 0 auto;">
          <el-input placeholder="搜尋" :prefix-icon="Search" />
        </div>
      </el-header>
      <el-container>
        <section class="menu">
          <MyMenu></MyMenu>
        </section>
        <el-main>
          <MyMain></MyMain>
        </el-main>
        <el-aside>
          <CurrentTab></CurrentTab>
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
  box-shadow: 0px 5px 10px rgb(0 0 0 / 72%), 0px 8px 20px -1px #000000;
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
