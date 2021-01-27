const { app, BrowserWindow, ipcMain } = require('electron')
const bajel = require('../bajel/src/index.js')
const buildfile = require('../bajel/src/buildfile.js')

async function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      devTools: true,
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
  // console.log(JSON.stringify(await buildfile()))
  // ipcMain.handle('perform-action', (event, ...args) => {
  //  // ... do actions on behalf of the Renderer
  // })

  win.webContents.on('did-finish-load', async () => {
    win.webContents.send('buildfile', await buildfile())
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
