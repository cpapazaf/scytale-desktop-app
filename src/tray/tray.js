const {Tray, Menu, BrowserWindow} = require('electron')
const ipc = require('electron').ipcMain
const path = require('path')

let window = undefined

const createWindow = () => {
    window = new BrowserWindow({
      width: 300,
      height: 450,
      show: false,
      frame: false,
      fullscreenable: false,
      resizable: false,
      transparent: true,
      webPreferences: {
        // Prevents renderer process code from not running when window is
        // hidden
        backgroundThrottling: false
      }
    })
    window.loadURL(`file://${path.join(__dirname, 'tray.html')}`)
  
    // Hide the window when it loses focus
    window.on('blur', () => {
      if (!window.webContents.isDevToolsOpened()) {
        window.hide()
      }
    })
  }

  createWindow()

var trayShowed = false;
ipc.on('show-tray', function(event, arg) {
    if (trayShowed) {
        return;
    }
    trayShowed = true;

    if (process.platform == 'linux') {
        return;
    }

    function show () {
        console.log('Tray open')
        showWindow()
    }

    function close (arg1, arg2) {
        console.log('Tray close')
    }

    console.log(__dirname)
    appIcon = new Tray(__dirname + '/../../resources/images/tray/' + ( process.platform == 'darwin' ? 'trayTemplate.png' : 'tray.png'))
    var contextMenu = Menu.buildFromTemplate([
        {
            label: 'Open', click: function () {
            show();
        }
        },
        {
            label: 'Close', click: function () {
            close(null, true);
        }
        },
    ]);
    appIcon.setToolTip('Leanote');
    // appIcon.setTitle('Leanote');
    // appIcon.setContextMenu(contextMenu);

    const getWindowPosition = () => {
        const windowBounds = window.getBounds()
        const trayBounds = appIcon.getBounds()
        
        // Center window horizontally below the tray icon
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))
        
        // Position window 4 pixels vertically below the tray icon
        const y = Math.round(trayBounds.y + trayBounds.height + 4)
        
        return {x: x, y: y}
    }
    
    const showWindow = () => {
        const position = getWindowPosition()
        window.setPosition(position.x, position.y, false)
        window.show()
        window.focus()
    }

    appIcon.on('click', function (e) {
        show();
        e.preventDefault();
    });
    appIcon.on('right-click', function () {
        appIcon.popUpContextMenu(contextMenu);
    });
});
