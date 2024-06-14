const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static");
export const initFfmpeg = () => {
  const ffmpegPaths = ffmpegPath?.replace("app.asar", "app.asar.unpacked");
  const ffprobePaths = ffprobePath.path.replace(
    "app.asar",
    "app.asar.unpacked"
  );
  ffmpeg.setFfmpegPath(ffmpegPaths);
  ffmpeg.setFfprobePath(ffprobePaths);
};

export const addWater = () => {
  ffmpeg("E:\\code\\test.mp4")
    .complexFilter([
      // 使用 complexFilter 来添加水印
      {
        filter: "overlay",
        options: "100:100",
      },
    ])
    .input("E:\\code\\shuiyin.png") // 水印文件作为第二个输入
    .outputOptions("-shortest") // 确保视频和水印长度一致
    .save("E:\\code\\out.mp4")
    .on("end", () => {
      console.log("水印已添加成功！");
    })
    .on("error", (err) => {
      console.error("添加水印时出错:", err);
    });
};
