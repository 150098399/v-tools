import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

enum IpcEvents {
  // 获取窗口设备窗口
  EV_SEND_DESKTOP_CAPTURER_SOURCE = "ev:send-desktop-capturer_source",
  EV_SEND_DESKTOP_CAPTURER_IMAGE = "ev:send-desktop-capturer_image",
}
type Channels = `${IpcEvents}`;

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    sendSync(channel: Channels, args: unknown[]) {
      return ipcRenderer.sendSync(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    invoke(channel: Channels, ...args: unknown[]) {
      return ipcRenderer.invoke(channel, ...args);
    },
  },
});
