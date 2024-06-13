// electron.d.ts
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        sendMessage: (channel, args) => void;
        sendSync: (channel, args) => void;
        on: (channel, func: (...args: unknown[]) => void) => void;
        once: () => void;
        invoke: (channel, args) => void;
      };
    };
  }
}

export {};
