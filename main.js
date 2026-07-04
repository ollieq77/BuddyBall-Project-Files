const { app, BrowserWindow, ipcMain, screen, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 480,
    height: 360,
    transparent: true,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile(path.join(__dirname, 'BuddyBall.html'));

    ipcMain.on('set-ignore-mouse-events', (event, ignore, options) => {
      win.setIgnoreMouseEvents(ignore, options);
    });

    ipcMain.on('move-window', (event, { xOffset, yOffset }) => {
      const [x, y] = win.getPosition();
      win.setPosition(x + xOffset, y + yOffset);
    });

    // NEW: explicit resize handler
    ipcMain.on('resize-window', (event, { width, height }) => {
      // win was created with resizable: false, which blocks user drag-resizing
      // but setSize() still works programmatically regardless of that flag.
      win.setSize(Math.round(width), Math.round(height));
    });

    ipcMain.on('open-external-link', (event, url) => {
      shell.openExternal(url);
    });
}

app.whenReady().then(createWindow);