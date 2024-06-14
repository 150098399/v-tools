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

const filters = [
  {
    filter: "drawtext",
    options: {
      text: "Your Watermark Text",
      fontsize: 54,
      fontname: "FreeSans",
      x: "60",
      y: "60",
      shadowcolor: "#000000",
      shadowx: "2",
      shadowy: "2",
    },
  },
];

export const addWater = (text) => {
  ffmpeg("E:\\code\\test.mp4")
    .videoFilters(
      `drawtext=fontfile=simhei.ttf:text=${text}:x=20:y=10:fontsize=30:fontcolor=yellow:shadowy=2`
    )

    .on("end", () => {
      console.log("success");
    })
    .on("error", (err) => {
      console.error("error:", err);
    })
    .save("E:\\code\\out.mp4");
};
