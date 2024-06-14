<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
        >
          <el-menu-item index="2"> 视频加水印 </el-menu-item>
          <el-menu-item index="3">视频格式转换 </el-menu-item>
          <el-menu-item index="4">视频合并 </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElMain, ElMenu, ElMenuItem } from "element-plus";

const handleTest = () => {
  window.electron.ipcRenderer.sendMessage("set-title", "ggf");
};
window.electron.ipcRenderer.on("menu:selectFile", (args) => {
  console.log(args);
});
</script>

<style scoped>
.common-layout {
  width: 100%;
  height: 100%;
}

.el-container {
  height: 100%;
  width: 100%;
}

.aside {
  height: 100%;
  background-color: #ddf;
}

.main {
  height: 100%;
  background-color: aquamarine;
}

.el-menu {
  height: 100%;
}
</style>
