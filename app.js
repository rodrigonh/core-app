import { app, BrowserWindow, electron, ipcMain } from 'electron';

import Radio from 'core-radio';
import Helper from 'core-spotify-webhelper';

let helper = new Helper();
let radio = new Radio();

ipcMain.on('version', function(event) {
  helper.version().then(function(json) {
    event.sender.send('version-reply', json);
  });
});

ipcMain.on('status', function(event) {
  helper.status().then(function(json) {
    event.sender.send('status-reply', json);
  });
});

ipcMain.on('pause', function(event) {
  helper.pause().then(function(json) {
    event.sender.send('pause-reply', json);
  });
});

ipcMain.on('unpause', function(event) {
  helper.unpause().then(function(json) {
    event.sender.send('unpause-reply', json);
  });
});

ipcMain.on('stations', function(event) {
  event.sender.send('stations-reply', radio.getStations());
});

ipcMain.on('station-track', function(event, station, alternate = false) {
  radio.lookup(station, alternate).then(function(json) {
      event.sender.send('station-track-reply', json);
  });
});

ipcMain.on('play-track', function(event, id) {
  helper.play(id).then(function(json) {
      event.sender.send('play-track-reply', json);
  });
});

let mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {

  mainWindow = new BrowserWindow({
    width: 420,
    height: 475,
    frame: false,
    transparent: true,
    resizable: false,
    'always-on-top': true,
    'standard-window': false
  });
  /*
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  */
  // Open the DevTools.
  mainWindow.openDevTools({
    detach: true
  });

  /*
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800
  });
  */
  mainWindow.loadURL('http://localhost:3000');
  // mainWindow.openDevTools();

  let windowState = {
    minimized: false,
    display: '',
    position: {
      x: 0,
      y: 0
    },
  };

  // const { screen } = electron; <- does not work as stated in documentation: https://github.com/atom/electron/blob/master/docs/api/screen.md
  const screen = require('screen');  // [Error: Cannot initialize "screen" module before app is ready]

  ipcMain.on('minimize', function(event) {
    if(windowState.minimized === false) {
      windowState.position.x = mainWindow.getPosition()[0];
      windowState.position.y = mainWindow.getPosition()[1];
      windowState.minimized = true;

      const display = screen.getDisplayMatching({
          x: windowState.position.x,
          y: windowState.position.y,
          width: 420,
          height: 475
        });
      const { size } = display;

      mainWindow.setPosition(display.bounds.x + size.width - 275, size.height - 100);
    } else {
      mainWindow.setPosition(windowState.position.x, windowState.position.y);
      windowState.minimized = false;
    }
  });

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
