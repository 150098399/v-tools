import { ipcMain } from "electron";

export const initMainIpc = () => {
  ipcMain.on("set-title", (event, args) => {
    console.log(args);
  });
};
