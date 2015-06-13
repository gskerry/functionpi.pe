var child = require('child_process')
var terminal = require('child_process').spawn('bash')
var express = require('express')
var app = express()

app.get('/', function (req, res) {

	terminal.stdout.on('data', function (data) {
	    console.log('stdout: ' + data);
	});

	terminal.stderr.on('data', function (data) {
	    console.log('stderr: ' + data);
	});

	terminal.on('exit', function (code) {
		console.log('child process exited with code ' + code);
	});

	var env = 'node'

	setTimeout(function() {
		console.log('Sending stdin to terminal');
		terminal.stdin.write('sudo docker run -i --rm -v "$PWD":/src/app -w /src/app 4797dc6f7a9c ' + env + ' node_app.js 123456.json 789012.json\n');
		// terminal.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
		// terminal.stdin.write('uptime\n');
		// console.log('Ending terminal session');
		terminal.stdin.end();
	}, 1000);

	// child.exec('sudo docker run -it --rm -v "$PWD":/src/app -w /src/app 4797dc6f7a9c node node_app.js 123456.json 789012.json',
	// 	function (error, stdout, stderr) {
	// 		console.log('stdout: ' + stdout);
	// 		console.log('stderr: ' + stderr);
	// 		if (error !== null) {
	// 			console.log('exec error: ' + error);
	// 		}
	// });

	res.send('Hello World!')

})

var server = app.listen(5001, function () {

	// var host = server.address().address
	var port = server.address().port

	// console.log('Example app listening at http://%s:%s', host, port)
	console.log('Example app listening at http://%s:%s', port)

})