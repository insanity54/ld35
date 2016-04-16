var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var Data = require('./data');
var Game = require('./game');
var faker = require('faker');


var god;


// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });

var game = new Game();

var dats = new Data();
dats.stream();

io.on('connection', function (socket) {
    var nsps = io.of('/');
    var numPlayers = Object.keys(nsps.connected).length;
    
    // if the first player has joined, and the game is not started, start.
    if (numPlayers == 1 && !game.isStarted()) {
        socket.emit('start');
        game.start();
    }
    
    
    
    // pick a god if none
    if (!god) god = Object.keys(nsps.connected)[0];
    //var god = Object.keys(nsps.connected)
    
    game.on("challenge", function(c) {
        // send only the challenge id 
        socket.emit("challenge", {id: c.id});
    });
    
    socket.emit('news', { hello: 'world' });
  
    // receiving a response to a challenge
    socket.on("response", function(r) {
        game.processResponse(r, function(err, result) {
            if (err) return socket.emit("result", {res: result, msg: err, err: true});
            socket.emit("result", {res: result, msg: result, err: false});
        });
    });
  
    socket.on("speech", function(s) {
        console.log('a god says %s', s);
        socket.broadcast.emit('speech', s); 
    });
  
    dats.on("data", function(d) {
        //console.log('datastream -- '+d);
        socket.emit('data', d); 
    });
    
    socket.on("disconnect", function(data) {
       console.log("%s disconnected socket.id", socket.id); 
    });
  
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
});


app.use(express.static(path.join(__dirname, '..', 'client'))); //  "public" off of current is root


console.log('Listening on port '+process.env.PORT);
server.listen(process.env.PORT);


module.exports = express;