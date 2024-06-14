import { join } from "path";
import { Menu, dialog } from "electron";
import { menuTemplate } from "../config";
import os from "node:os";
export const createMiniWindow = (BrowserWindow) => {
  const config = {
    width: 800,
    height: 800,
    title: "牢大",
        icon: join(__dirname, "../public/icon.ico"),
    webPreferences: {
      preload: join(__dirname, "./preload.js"), // 引入打包后的js文件
    },
  };

  const win = new BrowserWindow(config);

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
