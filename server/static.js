var express = require('express');
var app = express();
var path = require('path');

//app.use(express.static(__dirname)); // Current directory is root
app.use(express.static(path.join(__dirname, '..', 'client'))); //  "public" off of current is root

app.listen(process.env.PORT);
console.log('Listening on port '+process.env.PORT);