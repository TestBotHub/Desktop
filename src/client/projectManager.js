const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const {spawn} = require('child_process');
const Process = require('./process.js');
let projects = [];
let stdout = [];
let basePath = app.getPath('userData') + "/projects";
const projectManager = {
  startProcess: function(process) {

  },

  stopProcess: function(process) {

  },

  listen: function(socket) {
    socket.on('hook', (data) => {
      let repository = JSON.parse(data);
      this.clone(repository.name, repository.html_url)
        .then(() => {
          let projectPath = basePath + "/" + repository.name;
          let config = JSON.parse(fs.readFileSync(projectPath + '/config.json', 'utf8'));
          Promise.all([
            this.clone(config.vision.name, config.vision.url),
            this.clone(config.think.name, config.think.url)
          ]).then(() => {
            console.log("done");
          });
        });
    });
  },

  existBaseDir: function() {
    return new Promise((resolve, reject) => {
      fs.stat(basePath, (err, stats) => {
        if (err) {
          fs.mkdir(basePath, ()=>{
            resolve();
          });
        }
        resolve();
      });
    });
  },

  exist: function(name) {
    return this.existBaseDir().then(() => {
      let projectPath = basePath + "/" + name;
      return new Promise((resolve, reject) => {
        fs.stat(projectPath, (err, stats) => {
          console.log(err, stats);
          if (err) {
            resolve();
          } else {
            console.log('test');
            let pullProcess = new Process('git', ['pull'], {cwd: projectPath}, (code) => {
              reject();
            });
            pullProcess.run();
          }
        })
      });
    });
  },

  clone: function(name, url) {
    return new Promise((resolve, reject) => {
        return this.exist(name).then(() => {
          let cloneProcess = new Process('git', ['clone', url], {cwd: basePath}, (code) => {
            resolve();
          });
          cloneProcess.run();
        })
        .catch((error) => {
          resolve();
        });
    });
  },

  pull: function(name) {

  },

  launch: function(name) {

  },

  update: function(name) {

  },

  updateAll: function() {

  },

  list: function() {

  },

  delete: function(name) {

  }
};

module.exports = projectManager;
