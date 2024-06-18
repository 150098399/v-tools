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

export const addWater = (text) => {
  ffmpeg("E:\\code\\test.mp4")
    .videoFilters(
      `drawtext=fontfile=simhei.ttf:text=${text}:x=20:y=10:fontsize=30:fontcolor=red:shadowy=1`
    )

    .on("end", () => {
      console.log("success");
    })
    .on("error", (err) => {
      console.error("error:", err);
    })
    .save("E:\\code\\out.mp4");
};
