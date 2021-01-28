const { app, BrowserWindow, ipcMain } = require('electron')
const build = require('../bajel/src/index.js')
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

  win.webContents.on('did-finish-load', async () => {
    const bf = await buildfile()
    win.webContents.send('buildfile', bf)

    ipcMain.handle('execute', async (event, target) => {
      console.log('Execute', target)
      try {
        const [code, out, err] = await build(bf, [undefined, undefined, target])
        console.log(`\n======\n${out}\n======\n${err}\n======\nstatus=${code}`)
      } catch (e) {
        console.log(e)
      }
    })
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
