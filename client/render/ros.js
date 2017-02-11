'use strict';

window.$ = require('jquery');
const socket = require('socket.io-client')('https://safe-castle-29687.herokuapp.com');
const child_process = require('child_process');
const path = require('path');
const sleep = require('system-sleep');
const fs = require('fs');
const children = [];
let executing = false;
let running = true;
socket.on('command', (data) => {
	if (!executing && data == "run pd") {
		child_process.exec("python /home/mech-user/work/nekonote/lib/client.py", function(error, stdout, stderr) {
		});
		child_process.exec("python /home/mech-user/work/nekonote/lib/process.py", function(error, stdout, stderr) {
		});
		children.push(child_process.exec("rosrun pd pd", function (error, stdout, stderror) {
			// $('div').append(error + '<br>');
			$('div').append(stdout + '<br>');
			// $('div').append(stderr + '<br>');
		}));
		// child_process.exec("/home/mech-user/work/nekonote/pd/cpp/main", function(error, stdout, stderr) {
		//   $('div').append(error + '<br>');
		//   $('div').append(stdout + '<br>');
		//   $('div').append(stderr + '<br>');
		// });
	} else if (!executing && data == "run test") {
		console.log("execute");
		children.push(child_process.exec("rm /home/mech-user/tmp.png", function(error, stdout, stderror) {
		}));
		children.push(child_process.exec("python /home/mech-user/work/nekonote/lib/client.py", function(error, stdout, stderror) {
			$('div').append(error + '<br>');
			$('div').append(stdout + '<br>');
			$('div').append(stderr + '<br>');
		}));
		children.push(child_process.exec("python /home/mech-user/work/nekonote/lib/process_test_app.py", function(error, stdout, stderror) {
			$('div').append(error + '<br>');
			$('div').append(stdout + '<br>');
			$('div').append(stderr + '<br>');
		}));
		children.push(child_process.exec("python /home/mech-user/work/nekonote/lib/test_app.py", function(error, stdout, stderror) {
			$('div').append(error + '<br>');
			$('div').append(stdout + '<br>');
			$('div').append(stderr + '<br>');
		}));

		let id = setInterval(function() {
			fs.stat('/home/mech-user/tmp.png', function(err, stat) {
				if (err == null) {
					$('div').append(err + '<br>');
					console.log("exist");
					socket.emit('image', "bug");
					clearInterval(id);
				}
			});
		}, 10000);
		children.forEach(function(child) {
			child.kill('SIGKILL');
		});
	} else if (data == "stop") {
		children.forEach(function(child) {
			child.kill('SIGKILL');
		});
		child_process.exec("killall -9 /home/mech-user/work/nekonote/ros_ws/devel/lib/pd/pd", function(error, stdout, stderror) {
			// $('div').append(error + '<br>');
			// $('div').append(stdout + '<br>');
			// $('div').append(stderr + '<br>');
		});
		child_process.exec("killall -9 python /home/mech-user/work/nekonote/lib/test_app.py", function(error, stdout, stderror) {
			// $('div').append(error + '<br>');
			// $('div').append(stdout + '<br>');
			// $('div').append(stderr + '<br>');
		});
		child_process.exec("killall -9 python /home/mech-user/work/nekonote/lib/client.py", function(error, stdout, stderror) {
			// $('div').append(error + '<br>');
			// $('div').append(stdout + '<br>');
			// $('div').append(stderr + '<br>');
		});
		child_process.exec("killall -9 python /home/mech-user/work/nekonote/lib/process_test_app.py", function(error, stdout, stderror) {
			// $('div').append(error + '<br>');
			// $('div').append(stdout + '<br>');
			// $('div').append(stderr + '<br>');
		});
		child_process.exec("killall -9 python /home/mech-user/work/nekonote/lib/process.py", function(error, stdout, stderrr) {
			// $('div').append(error + '<br>');
			// $('div').append(stdout + '<br>');
			// $('div').append(stderr + '<br>');
		});
		executing = false;
	} else {
		child_process.exec(data, function(error, stdout, stderr) {
			$('div').append(stdout + '<br>');
			$('div').append(stderr + '<br>');
			socket.emit("result", stdout);
		});
	}
});
