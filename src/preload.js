// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('api', {
 send: (channel, data) => {
  // whitelist channels
  let validChannels = ['toMain'];
  if (validChannels.includes(channel)) {
   ipcRenderer.send(channel, data);
  }
 },
 receive: (channel, func) => {
  let validChannels = ['fromMain'];
  if (validChannels.includes(channel)) {
   // Deliberately strip event as it includes `sender`
   ipcRenderer.on(channel, (event, ...args) => func(...args));
  }
 },
});