import app from 'app';
import ipc from 'ipc';

import BrowserWindow from 'browser-window';

import Radio from 'alpha-radio';
import Helper from 'alpha-spotify-webhelper';

let helper = new Helper();
let radio = new Radio();

ipc.on('version', function(event) {
  helper.version().then(function(json) {
    event.sender.send('version-reply', json);
  });
});

ipc.on('status', function(event) {
  helper.status().then(function(json) {
    event.sender.send('status-reply', json);
  });
});

ipc.on('pause', function(event) {
  helper.pause().then(function(json) {
    event.sender.send('pause-reply', json);
  });
});

ipc.on('unpause', function(event) {
  helper.unpause().then(function(json) {
    event.sender.send('unpause-reply', json);
  });
});

ipc.on('stations', function(event) {
  event.sender.send('stations-reply', radio.getStations());
});

ipc.on('station-track', function(event, station) {
  radio.lookup(station).then(function(json) {
      event.sender.send('station-track-reply', json);
  });
});

ipc.on('play-track', function(event, id) {
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
  mainWindow.loadUrl('file://' + __dirname + '/index.html');
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
  mainWindow.loadUrl('http://localhost:3000');
  // mainWindow.openDevTools();

  let windowState = {
    minimized: false,
    display: '',
    position: {
      x: 0,
      y: 0
    },
  };

  const screen = require('screen'); // [Error: Cannot initialize "screen" module before app is ready]

  ipc.on('minimize', function(event) {
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
