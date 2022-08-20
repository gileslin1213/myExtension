<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <CurrentList />
      </el-header>
      <el-container>
        <el-aside>
          <DataMenu />
        </el-aside>
        <el-main>
          <DataTable />
        </el-main>
        <el-aside>
          <!-- <OpenedTabs /> -->
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<style>
*,
*::after,
*::before {
  box-sizing: border-box;
}
body {
  margin: 0;
}

.el-header {
  box-shadow: 0px 5px 10px rgb(0 0 0 / 72%), 0px 8px 20px -1px #000000;
  background-color: var(--el-bg-color);
}

aside {
  box-sizing: border-box;
  padding: 20px 0;
  width: 300px;
  height: calc(100vh - 60px);
}
main {
  height: calc(100vh - 60px);
}
</style>
