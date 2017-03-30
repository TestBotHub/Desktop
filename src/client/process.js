const {app, BrowserWindow} = require('electron');
const fs = require('fs');
const {spawn} = require('child_process');

class Process {
  constructor (cmd, args, options, callback) {
    this.cmd = cmd;
    this.args = args;
    this.options = options;
    this.callback = callback;
    this.stdout = [];
    this.stderr = [];
  }

  dump(arr) {
    for (let i=0;i<arr.length;i++) {
      console.log(arr[i]);
    }
  }

  run() {
    this.process = spawn(this.cmd, this.args, this.options);
    this.process.stdout.on('data', (data) => {
      this.stdout.push(data.toString());
    });
    this.process.stderr.on('data', (data) => {
      this.stderr.push(data.toString());
    });
    this.process.on('close', (code) => {
      this.dump(this.stdout);
      this.dump(this.stderr);
      this.callback(code);
    });
  }

}

module.exports = Process;
