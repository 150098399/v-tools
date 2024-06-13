<template>
  <div>
    <button @click="handleTest">测试</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const handleTest = () => {
  window.electron.ipcRenderer.sendMessage("set-title", "ggf");
};
window.electron.ipcRenderer.on("menu:selectFile", (args) => {
  console.log(args);
});
</script>

<style lang="scss" scoped></style>
