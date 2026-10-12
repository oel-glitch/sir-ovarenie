const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('bzApp', {
  setClickThrough: on => ipcRenderer.send('click-through', on),
  setOnTop: on => ipcRenderer.send('on-top', on),
  minimize: () => ipcRenderer.send('minimize'),
  close: () => ipcRenderer.send('close')
});
