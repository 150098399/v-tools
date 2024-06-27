<template>
  <div class="wrap">
    <div class="left">
      <video-play @video-info="getInfo"></video-play>
      <video-info :video="videoInfo"></video-info>
    </div>
    <div class="right">
      <video-config></video-config>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoInfo from "./VideoInfo.vue";
import VideoConfig from "./VideoConfig.vue";
import VideoPlay from "./VideoPlay.vue";
import { ref } from "vue";

const videoInfo = ref({});

const getInfo = (info: Object) => {
  videoInfo.value = info;
};
</script>

<style scoped>
.wrap {
  display: flex;
  height: 100%;
}

.left {
  flex-grow: 1;
}
.right {
  height: calc(100vh - 85px);
  width: 300px;
  margin-left: 15px;
  box-sizing: border-box;
  background-color: #fbf9f1;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 20px;
  overflow-y: auto;
}
</style>
