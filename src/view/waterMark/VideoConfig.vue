<template>
  <el-form
    class="form"
    label-position="right"
    :model="vConfig"
    label-width="85px"
  >
    <el-form-item label="文本">
      <el-input v-model="vConfig.text"></el-input>
    </el-form-item>
    <el-form-item label="字体大小">
      <el-input v-model="vConfig.fontSize"></el-input>
    </el-form-item>
    <el-form-item label="字体颜色">
      <el-color-picker v-model="vConfig.fontColor" size="small" />
    </el-form-item>
    <el-form-item label="字体">
      <el-select v-model="vConfig.fontFile"></el-select>
    </el-form-item>
    <el-form-item label="文本透明度">
      <el-slider v-model="vConfig.alpha" :format-tooltip="formatTooltip" />
    </el-form-item>
    <el-form-item label="文本位置x"
      ><el-input v-model="vConfig.textOffsetx"></el-input
    ></el-form-item>
    <el-form-item label="文本位置y"
      ><el-input v-model="vConfig.textOffsety"></el-input
    ></el-form-item>

    <el-form-item label="文本阴影">
      <el-switch v-model="vConfig.textShadow" />
    </el-form-item>
    <!-- 文本阴影选项 -->
    <div class="subChoose" v-if="vConfig.textShadow">
      <el-form-item label="颜色">
        <el-color-picker v-model="vConfig.textShadowColor" size="small" />
      </el-form-item>
      <el-form-item label="x偏移">
        <el-input v-model="vConfig.textShadowOffsetX"></el-input>
      </el-form-item>
      <el-form-item label="y偏移">
        <el-input v-model="vConfig.textShadowOffsetY"></el-input>
      </el-form-item>
    </div>

    <el-form-item label="文本边框">
      <el-switch v-model="vConfig.textBorder" />
    </el-form-item>

    <!-- 文本边框选项 -->
    <div class="subChoose" v-if="vConfig.textBorder">
      <el-form-item label="颜色">
        <el-color-picker v-model="vConfig.textBorderColor" size="small" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="vConfig.textBorderw"></el-input>
      </el-form-item>
    </div>

    <el-form-item label="背景框">
      <el-switch v-model="vConfig.boxBoder" />
    </el-form-item>

    <!-- 背景框选项 -->
    <div class="subChoose" v-if="vConfig.boxBoder">
      <el-form-item label="颜色">
        <el-color-picker v-model="vConfig.boxColor" size="small" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input v-model="vConfig.boxBorderw"></el-input>
      </el-form-item>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
const config = {
  text: "文本",
  fontSize: 12,
  fontColor: "#000",
  fontFile: "",
  alpha: 100,
  textOffsetx: 0,
  textOffsety: 0,
  textShadow: 0,
  textShadowColor: "#000",
  textShadowOffsetX: 0,
  textShadowOffsetY: 0,
  textBorder: 0,
  textBorderColor: "#000",
  textBorderw: 0,
  boxBoder: 0,
  boxBorderw: 0,
  boxColor: "#000",
};

const vConfig = ref(config);

const formatTooltip = (val: number) => {
  return val / 100;
};
</script>

<style scoped>
.subChoose {
  background-color: rgba(0, 0, 0, 0.15);
  margin-left: 20px;
  padding: 8px 10px 2px 0;
}

:deep(.el-form-item__label) {
  user-select: none;
}
</style>
