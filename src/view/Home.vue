<template>
  <div class="common-layout">
    <el-container>
      <el-header style="-webkit-app-region: drag">Header</el-header>
      <el-container>
        <el-aside>
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            default-active="1"
            text-color="#fff"
          >
            <el-menu-item index="1" @click="toWatermark">
              视频加水印
            </el-menu-item>
            <el-menu-item index="2" @click="toFormat"
              >视频格式转换
            </el-menu-item>
            <el-menu-item index="3" @click="toMerge">视频合并 </el-menu-item>
            <el-menu-item index="4" @click="toAudioExtraction"
              >音频提取
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main class="main"><router-view></router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {
  ElContainer,
  ElAside,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElHeader,
} from "element-plus";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.push("/watermark");
});

const toWatermark = () => {
  router.push("/watermark");
};
const toFormat = () => {
  router.push("/format");
};
const toMerge = () => {
  router.push("/merge");
};
const toAudioExtraction = () => {
  router.push("/audioExtraction");
};
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

.el-aside {
  height: 100%;
  width: 200px;
}

.main {
  height: 100%;
  background-color: #e7e6e9;
}

.el-menu {
  height: 100%;
  border-right: 2px solid rgb(172, 225, 175);
  background-color: #e3e3e7;
}

.el-menu-item {
  color: black;
  user-select: none;
}

.el-menu-item.is-active {
  color: rgb(228, 108, 10);
}

.el-menu-item:hover {
  background-color: #d9d9d9;
}

.el-header {
  display: flex;
  align-items: center;
  background-color: rgb(172, 225, 175);
  height: 40px;
}
</style>
