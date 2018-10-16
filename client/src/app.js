const ipc = require('electron').ipcMain
const path = require('path')
const fs = require('fs')

const app = (mainWindow) => {
    ipc.on('app-get-test', function(event, arg) {
        console.log('get Test', arg)
        mainWindow.webContents.send('targetPriceVal', arg)
    })
}

module.exports = {
    app:app
}
