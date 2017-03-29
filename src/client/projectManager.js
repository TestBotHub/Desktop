const {app, BrowserWindow} = require('electron');
const fs = require('fs');
let projects = [];
let stdout = [];
const projectManager = {
  startProcess: function(process) {

  },

  stopProcess: function(process) {

  },

  listen: function(socket) {
    socket.on('hook', (data) => {
      console.log(data);
      let repository = JSON.parse(data);
    });
  },

  clone: function(name, url) {
    let basePath = app.getPath('userData') + "/projects";
    console.log(basePath);
    if (!fs.existsSync(basePath)) {
      fs.mkdir(basePath);
    }
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
