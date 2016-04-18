var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var path = require('path');
var Game = require('./game');
var ControlFlow = require('./control');
var Score = require('./score');
var Main = require('./main');


//var game = new Game();
var main = new Main({io: io});
main.begin();




//var responseCount=0;



// io.on('connection', function (socket) {
//     var nsps = io.of('/');
//     var numPlayers = Object.keys(nsps.connected).length;
    
    
//     game.on("creation", function(info) {
//         //console.log('creation! %s', info);
//     });
    
//     game.on("challenge", function(c) {
//         // send only the challenge id 
//         //console.log('challenge %s', c.id);
//         socket.emit("challenge", {id: c.id});
//     });
    
//     // if the first player has joined, and the game is not started, start.
//     console.log("numplayers=%s, game.isStarted=%s", numPlayers, game.isStarted());
//     if (numPlayers == 1 && !game.isStarted()) {
//         socket.emit('start');
//         game.start();
//     }
    
    

    
 
    
//     //socket.emit('news', { hello: 'world' });
  
//     // receiving a response to a challenge
//     socket.on("response", function(r) {
//         //console.log('got response from %s', socket.id);
//         r['player'] = socket.id; // add player ID
//         //console.log('processing response for the %s time', responseCount+=1)
//         game.processResponse(r, function(err, result) {
//             if (err) return socket.emit("result", result);
//             socket.emit("result", result);
//         });
//     });
  
//     socket.on("speech", function(s) {
//         //console.log('a god says %s', s);
//         socket.broadcast.emit('speech', s); 
//     });
  
    
//     socket.on("disconnect", function(data) {
//       //console.log("%s disconnected socket.id", socket.id); 
//     });

// });


app.use(express.static(path.join(__dirname, '..', 'client'))); //  "public" off of current is root


console.log('Listening on port '+process.env.PORT);
server.listen(process.env.PORT);


module.exports = express;