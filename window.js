const { ipcRenderer } = require('electron')

/* global Mustache, listElement, templateElement */

const execute = target => {
  ipcRenderer.invoke('execute', target)
}

ipcRenderer.on('buildfile', (event, buildfile) => {
  for (const target in buildfile) {
    const entry = buildfile[target]
    entry.target = target
    entry.depEntries = []
    for (const dep of entry.deps || []) {
      if (buildfile[dep]) {
        entry.depEntries.push(buildfile[dep])
        buildfile[dep].parent = entry
      }
    }
  }
  const template = templateElement.innerHTML

  const insert = (parent, entry) => {
    const html = Mustache.render(template, entry)
    parent.insertAdjacentHTML('beforeend', html)
    const added = parent.lastElementChild
    added.insertAdjacentHTML('beforeend', '<ul></li>')
    const childList = added.lastElementChild
    for (const depEntry of entry.depEntries) {
      insert(childList, depEntry)
    }
  }

  for (const target in buildfile) {
    const entry = buildfile[target]
    if (!entry.parent) {
      insert(listElement, entry)
    }
  }
})
