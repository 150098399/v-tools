<template>
  <div class="video-wrap" @click="handleSelect" @drop.stop.prevent="handleDrop">
    拖拽或点击上传视频
  </div>
</template>

<script setup lang="ts">
const handleSelect = async () => {
  const filePath = await window.electron.ipcRenderer.invoke(
    "dialog:selectFile",
    []
  );
  console.log(filePath);

  // await handleReadFile(filePath);
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  event.stopPropagation();

  // await handleReadFile(filePath);
};
</script>

<style scoped>
.video-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  border: 1px dashed #ccc;
  cursor: pointer;
  color: #5f5e5e;
  font-size: 20px;
}
</style>
