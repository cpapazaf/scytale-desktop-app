const {ipcRenderer} = require('electron')

ipcRenderer.send('show-tray')

ipcRenderer.send('app-get-test', 'a value')

ipcRenderer.on('targetPriceVal', function (event, arg) {
    var head2 = document.querySelector('h2')
    head2.innerHTML = arg
})