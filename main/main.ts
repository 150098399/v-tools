import {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  desktopCapturer,
  webContents,
} from "electron";
import os from "node:os";
import { menuTemplate } from "./config";
import { join } from "path";

/** ffmpeg相关 start*/
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("ffmpeg-static").replace(
  "app.asar",
  "app.asar.unpacked"
);
const ffprobePath = require("ffprobe-static").path.replace(
  "app.asar",
  "app.asar.unpacked"
);
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// ffmpeg("E:\\code\\test.mp4").save("E:\\code\\output.mp4");

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

// ffmpeg("E:\\code\\test.mp4")
//   .output("E:\\code\\dd.mp4") // 指定输出文件路径

//   .on("end", () => {
//     console.log("Processing finished !");
//   })
//   .on("error", (err) => {
//     console.error("An error occurred: " + err.message);
//   })
//   .run();

/** ffmpeg相关 end*/

// 屏蔽安全警告
// ectron Security Warning (Insecure Content-Security-Policy)
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    title: "牢大",
    icon: join(__dirname, "../public/icon.ico"),
    webPreferences: {
      preload: join(__dirname, "preload.js"), // 引入打包后的js文件
    },
  });

  const menu = Menu.buildFromTemplate(menuTemplate);
  menu.getMenuItemById("selectFile")!.click = () =>
    win.webContents.send("menu:selectFile", "dsd");
  menu.getMenuItemById("saveFile")!.click = () =>
    win.webContents.send("menu:saveFile");
  menu.getMenuItemById("about")!.click = () => createAboutDialog();
  Menu.setApplicationMenu(menu);

  // win.loadURL('http://localhost:3000')
  // development
  if (process.env.VITE_DEV_SERVER_URL) {
    // 开发环境
    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    // 正式环境
    win.loadFile(join(__dirname, "../dist/index.html"));
  }
};

function createAboutDialog() {
  dialog.showMessageBox({
    title: "关于",
    message: `    
    Electron：${process.versions.electron}
    Chromium：${process.versions.chrome}
    Node.js：${process.versions.node}
    V8：${process.versions.v8}
    OS：${process.env.OS} ${os.arch} ${os.release}
    `,
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("set-title", (event, args) => {
  console.log(args);
});
