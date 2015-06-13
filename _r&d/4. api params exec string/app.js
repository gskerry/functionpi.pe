var fs = require('fs')
var child = require('child_process')
var terminal = require('child_process').spawn('bash')
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

var outfile;

app.get('/crunchdata', function (req, res) {

	var imageDex = {
		'node' : '4797dc6f7a9c'
	}

	var lingocmd = req.query.lingocmd;
	var image = imageDex[lingocmd];
	console.log("image: ",image)
	var scriptfile = req.query.scriptfile;
	var infile = req.query.infile;
	outfile = req.query.outfile;

	// ?lingocmd=node&scriptfile=node_app.js&infile=123456.json&outfile=789012.json

	/* Validation
	...infile extesion = json
	...check lingo from list
	*/

	terminal.stdout.on('data', function (data) {
	    console.log('stdout: ' + data);
	});

	terminal.stderr.on('data', function (data) {
	    console.log('stderr: ' + data);
	});

	terminal.on('exit', function (code) {
		console.log('child process exited with code ' + code);
	});

	setTimeout(function() {
		console.log('Sending stdin to terminal');
		terminal.stdin.write('sudo docker run -i --rm -v "$PWD":/src/app -w /src/app ' + image + ' ' + lingocmd + ' ' + scriptfile + ' ' + infile + ' ' + outfile + '\n');
		// terminal.stdin.write('echo "Hello $USER. Your machine runs since:"\n');
		// terminal.stdin.write('uptime\n');
		// console.log('Ending terminal session');
		terminal.stdin.end();
	}, 1000);

	// child.exec('sudo docker run -i --rm -v "$PWD":/src/app -w /src/app 4797dc6f7a9c node node_app.js 123456.json 789012.json',
	// 	function (error, stdout, stderr) {
	// 		console.log('stdout: ' + stdout);
	// 		console.log('stderr: ' + stderr);
	// 		if (error !== null) {
	// 			console.log('exec error: ' + error);
	// 		}
	// });

	res.send('Crunching some Data:\n')

})


app.get('/getdata', function (req, res) {

	fs.readFile('789012.json', 'utf8', function (err, data) {
		if (err) throw err;
		res.json(data);
	});

})


var server = app.listen(5001, function () {

	// var host = server.address().address
	var port = server.address().port

	// console.log('Example app listening at http://%s:%s', host, port)
	console.log('Example app listening at http://%s:%s', port)

})