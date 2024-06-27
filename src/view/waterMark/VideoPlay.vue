<template>
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
      :src="videoSorce"
      style="height: 100%; width: 100%; border-radius: 10px"
    ></video>
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
  // 选中文件后显示视频，取消不显示
  const isSelected = await handleReadFile(filePath);
  if (isSelected) {
    videoSorce.value = `file://${filePath}`;
    showVideo.value = true;
  }
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  const filePath = event.dataTransfer?.files[0].path!;

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
  video_bit_rate: "",
  audio_bit_rate: "",
  codec: "",
  channels: 0,
});

const handleReadFile = async (filePath: string) => {
  if (!filePath) return false;

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

  emits("videoInfo", video.value);

  return true;
};

const emits = defineEmits(["videoInfo"]);
</script>

<style scoped>
.video-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vh;
  cursor: pointer;
  color: #5f5e5e;
  font-size: 20px;
  box-sizing: border-box;
  background-color: #fbf9f1;

  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
}

.upload-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: 1px dashed #ccc;
  border-radius: 10px;
}
</style>
