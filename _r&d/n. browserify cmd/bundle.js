(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){

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
},{"child_process":1}]},{},[2]);
