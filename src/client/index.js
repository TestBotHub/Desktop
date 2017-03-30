const {app, BrowserWindow} = require('electron');
const ipcMain = require('electron').ipcMain;
const path = require('path');
const url = require('url');
const { spawn } = require('child_process');
const fs = require('fs');
const socket = require('socket.io-client')('https://safe-castle-29687.herokuapp.com');
app.setPath('exe', '/home/mech-user/work/nekonote');
let mainWindow = null;
const processManager = require('./projectManager.js');
app.on('window-all-closed', function() {
  app.quit();
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600
  });
  processManager.listen(socket);
  // processManager.clone("SimpleTest", "https://github.com/testBotHub/SimpleTest");
  mainWindow.loadURL('file://' + __dirname + '/render/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
//
// ipcMain.on('_command', function(event, arg) {
//   console.log(arg);
//   const exec = require('child_process').exec;
//   exec('ls', function(error, stdout, stderr) {
//     event.sender.send('command_result', stdout);
//   });
//   event.sender.send('command_result', 'ahahah');
// });
