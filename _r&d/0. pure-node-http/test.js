console.log(process.argv);
console.log(process.env);
var inFile = process.argv[2];
var outFile = process.argv[3];

fs.readFile(inFile, function(err, file) {
  fs.write(outFile);
});

