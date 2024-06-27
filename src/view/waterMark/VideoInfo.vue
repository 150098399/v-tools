<template>
  <div class="origin-info">
    <div class="header">原视频参数</div>
    <div class="info">
      <el-form :model="video" label-position="right">
        <el-row>
          <el-col :span="12">
            <el-form-item label="文件名">
              <el-tooltip
                class="box-item"
                effect="light"
                :content="video?.fileName"
                placement="top"
              >
                <span class="info-item">{{ video?.fileName }}</span>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="格式">
              <el-tooltip
                class="box-item"
                effect="light"
                :content="video?.format_name"
                placement="top"
              >
                <span class="info-item">{{ video?.format_name }}</span>
              </el-tooltip>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="宽高">
              <span class="info-item"
                >{{ video?.width }}×{{ video?.height }}</span
              >
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时长">
              <span class="info-item">{{ video?.duration }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="大小">
              <span class="info-item">{{ video?.size }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="视频比特率">
              <span class="info-item">{{ video?.video_bit_rate }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="音频比特率">
              <span class="info-item">{{ video?.audio_bit_rate }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="编码器">
              <span class="info-item">{{ video?.codec }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="声道">
              <span class="info-item">{{ video?.channels }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  video: {
    type: Object,
    rquired: true,
  },
});
</script>

<style scoped>
.origin-info {
  box-sizing: border-box;
  background-color: #fbf9f1;
  margin-top: 20px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
  padding: 20px;
}
.header {
  margin-bottom: 15px;
}
.info-item {
  display: inline-block;
  padding-right: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.info-item:hover {
  cursor: pointer;
}
</style>
