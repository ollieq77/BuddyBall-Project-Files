const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  setIgnoreMouse: (ignore, options) => ipcRenderer.send('set-ignore-mouse-events', ignore, options),
  moveWindow: (xOffset, yOffset) => ipcRenderer.send('move-window', { xOffset, yOffset }),
  resizeWindow: (width, height) => ipcRenderer.send('resize-window', { width, height }),
  openLink: (url) => ipcRenderer.send('open-external-link', url)
});