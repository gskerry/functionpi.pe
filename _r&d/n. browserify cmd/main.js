
console.log("This is your browser talking to you.");

function run_cmd(cmd, args) {
  var spawn = require('child_process').spawn,
  child = spawn(cmd, args);
  return child;
}

var foo = new run_cmd('node', ['func.js']);

foo.stdout.setEncoding('utf-8');
foo.stdout.on('data', function(data) {
	console.log('sending data');
});


// fs.writeFile('FromTheBrowser.txt', "Hey, this is from the browser", function (err) {
// 	if (err) return console.log(err);
// 	console.log('output written!');
// });