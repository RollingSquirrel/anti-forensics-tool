// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const {
  contextBridge,
  ipcRenderer
} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  // access in browser with window.api.send(...)

  "api", {
  platform: process.platform,
  send: (channel, data) => {
    // whitelist channels
    let validChannels = ["originalFile", "modifiedFiles"];
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data);
    }
  },
  receive: (channel, func) => {
    let validChannels = ["originalFileReply"];
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      // we do not want to expose that to the renderer process 
      ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
  },
  receiveOnce: (channel, func) => {
    let validChannels = ["originalFileReply"];
    if (validChannels.includes(channel)) {
      ipcRenderer.once(channel, (event, ...args) => func(...args));
    }
  }
}
);