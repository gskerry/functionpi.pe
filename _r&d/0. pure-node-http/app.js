var fs = require('fs')
// var exec = require('child_process').exec
var spawn = require('child_process').spawn
var util = require('util')
var express = require('express')
var app = express()

var child;

// child = exec('echo something damn it!',
//   function (error, stdout, stderr) {
//     console.log('stdout: ' + stdout);
//     console.log('stderr: ' + stderr);
//     if (error !== null) {
//       console.log('exec error: ' + error);
//     }
// });

var spit = spawn('echo')

// var spit = function(input){
// 	spawn('echo',[input])	
// } 


app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/data', function (req, res) {
	
	var obj = {};
	obj.data = req.query.data
	obj.type = req.query.type
	obj.env = req.query.env

	// console.log(process);
	process.stdin.resume();
	spit.stdin.setEncoding = 'utf-8';
	process.stdin.pipe
	process.stdout.write(util.format('%j', obj)+ '\n');
	
	console.log(typeof obj)
	var result = JSON.stringify(obj);

	fs.writeFile('dataStore.txt', result, function (err) {
		if (err) return console.log(err);
		console.log('obj > obj.txt');
	});

	// var outp = spit(obj);
	// spawn('echo', [obj])

	// spit.stdin.setEncoding = 'utf-8';
	// spit.stdout.pipe(process.stdout);
	// spit.stdin.write("obj")

	// spit.stdout.on('data', function (data) {
	// 	console.log('stdout: ' + data);
	// });


	// exec('echo obj',
	// 	function (error, stdout, stderr) {
	// 		console.log('stdout: ' + stdout);
	// 		console.log('stderr: ' + stderr);
	// 		if (error !== null) {
	// 			console.log('exec error: ' + error);
	// 		}
	// 	}
	// );

	res.send(
		// 'You tried to send some data. Good for you!'
		obj
	);
})

app.post('/data', function (req, res) {
	// var result = JSON.parse(req);
	console.log(req.body);
	// var wstream = fs.createWriteStream('save.txt');
	// wstream.write(req);
	// wstream.end();
	res.sendStatus(200);
});

var server = app.listen(1337, function () {

	// var host = server.address().address
	var port = server.address().port

	// console.log('Example app listening at http://%s:%s', host, port)
	console.log('Example app listening at http://%s:%s', port)

})