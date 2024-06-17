import { app, BrowserWindow } from "electron";
import { createMiniWindow } from "./window/mainWindow";
import { initMainIpc } from "./ipc/mainIpc";
import { addWater, initFfmpeg } from "./ffmpeg/initFfmpeg";

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";

app.whenReady().then(() => {
  createMiniWindow(BrowserWindow);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0)
      createMiniWindow(BrowserWindow);
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

initMainIpc();
initFfmpeg();
addWater("小李出品");
