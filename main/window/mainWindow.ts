import { join } from "path";
import { dialog } from "electron";

import os from "node:os";
export const createMiniWindow = (BrowserWindow) => {
  const config = {
    width: 800,
    height: 800,
    frame: false,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "rgb(172, 225, 175)",
      symbolColor: "#fff",
      height: 40,
    },

    title: "牢大",
    icon: join(__dirname, "../public/icon.ico"),
    webPreferences: {
      preload: join(__dirname, "./preload.js"), // 引入打包后的js文件
      webSecurity: false, // 配置允许跨域，解决无法加载本地磁盘文件的问题
    },
  };

  const win = new BrowserWindow(config);

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
