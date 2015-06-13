var docker = require('dockerode');
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/data', function (req, res) {

	docker.run('node:latest', ['bash', '-c', 'uname -a'], [process.stdout, process.stderr], {Tty:false}, function (err, data, container) {
		console.log(data.StatusCode);
	});

	res.send('Crunching some data.')

})

var server = app.listen(5001, function () {

	// var host = server.address().address
	var port = server.address().port

	// console.log('Example app listening at http://%s:%s', host, port)
	console.log('Example app listening at http://%s:%s', port)

})