var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var Data = require('./data');





// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

var dats = new Data();
dats.stream();

io.on('connection', function (socket) {
    console.log('connection! ')
    socket.emit('news', { hello: 'world' });
  
    dats.on("data", function(d) {
        //console.log('datastream -- '+d);
        socket.emit('data', d); 
    });
  
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
});


app.use(express.static(path.join(__dirname, '..', 'client'))); //  "public" off of current is root


console.log('Listening on port '+process.env.PORT);
server.listen(process.env.PORT);


module.exports = express;