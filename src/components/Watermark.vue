<template>
  <div>
    <div class="video-wrap">
      <div
        v-if="!showVideo"
        @click="handleSelect"
        @drop.stop.prevent="handleDrop"
        @dragenter.prevent
        @dragover.prevent
        class="upload-wrap"
      >
        拖拽或点击上传视频
      </div>
      <video
        v-else
        controls
        autoplay
        :src="videoSorce"
        style="width: 100%; height: auto"
      ></video>
    </div>
    <div class="origin-info">
      <div class="header">原视频参数</div>
      <div class="info">
        <div class="info-item">文件名： {{ video.fileName }}</div>
        <div class="info-item">格式：{{ video.format_name }}</div>
        <div class="info-item">宽高： {{ video.width }}×{{ video.height }}</div>
        <div class="info-item">时长： {{ video.duration.toFixed(2) }}</div>
        <div class="info-item">大小：{{ video.size }}</div>
        <div class="info-item">视频比特率：{{ video.video_bit_rate }}</div>
        <div class="info-item">音频比特率：{{ video.audio_bit_rate }}</div>
        <div class="info-item">编码器：{{ video.codec }}</div>
        <div class="info-item">声道：{{ video.channels }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const showVideo = ref(false);
const videoSorce = ref("");
const handleSelect = async () => {
  const filePath: any = await window.electron.ipcRenderer.invoke(
    "dialog:selectFile",
    []
  );

  await handleReadFile(filePath);
  videoSorce.value = `file://${filePath}`;

  showVideo.value = true;
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  const filePath = event.dataTransfer?.files[0].path;

  await handleReadFile(filePath);
  videoSorce.value = `file://${filePath}`;
  showVideo.value = true;
};

const allowFormats = [
  "wmv",
  "3gp",
  "avi",
  "f4v",
  "m4v",
  "mp4",
  "mpg",
  "ogv",
  "vob",
];

let video: any = ref({
  filename: "",
  format_name: "",
  width: 0,
  height: 0,
  size: 0,
  duration: 0,
  videoBitrate: "",
  audioBitrate: "",
  codec: "",
  channels: 0,
});

const handleReadFile = async (filePath: string) => {
  if (!filePath) return;

  // E:\sea.mp4  取文件后缀名校验文件格式
  const index = filePath.lastIndexOf(".");
  const file_extension = filePath.substring(index + 1);
  if (!allowFormats.includes(file_extension)) {
    return alert("文件格式不支持");
  }

  video.value = await window.electron.ipcRenderer.invoke(
    "video:readFile",
    filePath
  );
};
</script>

<style scoped>
.video-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64%;
  height: 36%;
  border: 1px dashed #ccc;
  cursor: pointer;
  color: #5f5e5e;
  font-size: 20px;
}

.origin-info {
  background-color: #fbf9f1;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 20px;
  width: 60%;
}
.header {
  margin-bottom: 15px;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.info-item {
  margin-right: 20px;
  margin-bottom: 10px;
  width: 150px;
  overflow: hidden;
}
</style>
