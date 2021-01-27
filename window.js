const { ipcRenderer } = require('electron')

/* global fooElement */

// ipcRenderer.invoke('perform-action', ...args)
ipcRenderer.on('buildfile', (event, buildfile) => {
  fooElement.innerText = JSON.stringify(buildfile)
})
