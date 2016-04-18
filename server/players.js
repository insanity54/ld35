var assert = require('chai').assert;
var ee = require('events').EventEmitter;
var util = require('util');


/**
 * need to be able to react to these events
 * 
 *   - response received
 * 
 */



var Players = function Players(io) {
    assert.isDefined(io, 'Players needs a handle to IO');
    var self = this;
    self.io = io;
    //self.players = [];
};
util.inherits(Players, ee);



/** save the socket for later use */
// BAD! don't duplicate & sync the data in IO, just refer to IO!
// Players.prototype._save = function _save(socket) {
//     var self = this;
//     var save = {player: socket.id, socket: socket};
//     self.players.push(save);
// };



Players.prototype.start = function start() {
    var self = this;
    self.io.on("connection", function(socket) {
        console.log('connection from %s', socket.id);
        // wait for response, pass to higher levels
        socket.on("response", function(r) {
            console.log('Players - response got');
            // associate player ID with response
            var playerID = socket.id;
            r['player'] = playerID;
            self.emit("response", r); 
        });
        
    });
};


Players.prototype.list = function list() {
    var self = this;
    var namespace = self.io.of('/');
    var numPlayers = Object.keys(namespace.connected).length;
    console.log('here is the players list- %s', numPlayers);
};


// send a challenge to the players
Players.prototype.challenge = function challenge(ch) {
    var self = this;
    assert.isDefined(ch, 'call it correctly! first param must be challenge object!');
    
    // get a socket to emit on so all players will get the message
    var namespace = self.io.of('/');
    namespace.emit("challenge", ch);
};





module.exports = Players;