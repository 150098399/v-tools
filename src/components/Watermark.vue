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
        :src="videoSorce"
        style="height: 100%; width: 100%"
      ></video>
    </div>
    <div class="origin-info">
      <div class="header">原视频参数</div>
      <div class="info">
        <el-form :model="video" label-position="right">
          <el-row>
            <el-col :span="12">
              <el-form-item label="文件名">
                <span>{{ video.fileName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="格式">
                <span>{{ video.format_name }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="宽高">
                <span>{{ video.width }}×{{ video.height }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时长">
                <span>{{ video.duration }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="大小">
                <span>{{ video.size }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="视频比特率">
                <span>{{ video.video_bit_rate }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="音频比特率">
                <span>{{ video.audio_bit_rate }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编码器">
                <span>{{ video.codec }}</span>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="声道">
                <span>{{ video.channels }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form>
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
  console.log(video.value);

  return true;
};
</script>

<style scoped>
.video-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30vw;
  width: 50vw;
  cursor: pointer;
  color: #5f5e5e;
  font-size: 20px;
}

.upload-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  border: 1px dashed #ccc;
}

.origin-info {
  box-sizing: border-box;
  background-color: #fbf9f1;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 20px;
  width: 50vw;
}

.header {
  margin-bottom: 15px;
}

.info-item {
  margin-right: 20px;
  margin-bottom: 10px;
  width: 160px;
  overflow: hidden;
}
</style>
