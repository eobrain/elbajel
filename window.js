const { ipcRenderer } = require('electron')

/* global Mustache, listElement, templateElement */

// ipcRenderer.invoke('perform-action', ...args)
ipcRenderer.on('buildfile', (event, buildfile) => {
  const template = templateElement.innerHTML
  for (const target in buildfile) {
    const html = Mustache.render(template, { target, ...buildfile[target] })
    listElement.insertAdjacentHTML('beforeend', html)
  }
})
