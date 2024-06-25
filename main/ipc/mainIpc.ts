import { ipcMain, dialog } from "electron";
import { readFile } from "../ffmpeg/initFfmpeg";

export const initMainIpc = () => {
  ipcMain.on("set-title", (event, args) => {
    console.log(args);
  });

  ipcMain.handle("dialog:selectFile", handleSelectFile);
  ipcMain.handle("video:readFile", handleReadFile);
};

const fileType = "video";
const allowFormats = [
  "wmv",
  "3gp",
  "avi",
  "f4v",
  "m4v",
  "mp4",
  "mpg",
  "ogv",
  "vob",
];
const handleSelectFile = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    filters: [{ name: fileType, extensions: allowFormats }],
  });
  if (!canceled) {
    return filePaths[0];
  }
};

const handleReadFile = async (_event: any, filePath: string) => {
  const info = await readFile(filePath);
  return info;
};
