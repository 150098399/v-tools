const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static");
const ffprobePath = require("ffprobe-static");
import { parse } from "path";
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

export const readFile = (filePath) => {
  
  return new Promise((resolve) => {
    ffmpeg(filePath).ffprobe(
      (err: any, data: { format: any; streams: any }) => {
        if (err) return err;
        const { format, streams } = data;
        const { format_name, duration, size } = format;

        let video_bit_rate = "0"; // video比特率
        let audio_bit_rate = "0"; // audio比特率
        let width = 0;
        let height = 0;
        let codec = ""; // 解码器名称
        let channels = 1; // 声道

        const format_size = (size / 1024 / 1024).toFixed(2) + "M";

        const video = streams.find((item) => item.codec_type === "video");
        const audio = streams.find((item) => item.codec_type === "audio");

        if (video) {
          video_bit_rate = `${Math.round(video.bit_rate / 1000)}k`;
          width = video.width;
          height = video.height;
          codec = video.codec_name;
        }

        if (audio) {
          audio_bit_rate = `${Math.round(audio.bit_rate / 1000)}k`;
          codec += `/${audio.codec_name}`;
          channels = audio.channels;
        }

        resolve({
          fileName: parse(filePath).name,
          format_name,
          duration,
          size: format_size,
          width,
          height,
          video_bit_rate,
          audio_bit_rate,
          channels,
          codec,
        });
      }
    );
  });
};
