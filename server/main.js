/**
 * main context of the game
 */

//var Game = require('./game');
var Time = require('./time');
var Stage = require('./stage');
var Debug = require('./debug');
var Score = require('./score');
var Players = require('./players');
var Challenge = require('./challenge');
var moment = require('moment');
var _ = require('underscore');
var assert = require('chai').assert;
var ee = require('events').EventEmitter;
var util = require('util');


var defaultOpts = {};


var Main = function Main(options) {
    assert.isDefined(options.io, 'main needs a handle to socketIO');
    var opts = _.extend({}, defaultOpts, options);
    
    var self = this;
    //self.game = new Game();
    self.score = new Score();
    self.time = new Time();
    self.stage = new Stage();
    self.debug = new Debug();
    self.challenge = new Challenge();
    
    /**
     * players.lists is an array for each person in the game
     * including
     *   - socket
     *   - score
     *   - joinDate
     *   - leaveDate
     * 
     * players.sendAll()
     */
    self.players = new Players(opts.io);

    
    /**
     * challenge
     */
    //self.challenge = new Challenge();
};
util.inherits(Main, ee);



Main.prototype.begin = function begin() {
    var self = this;
    self.score.start();
    self.time.start();
    self.players.start();

    // self.game.on("challenge", function(c) {
    //     self.players.challenge(c);
        
    //     // 
    // });
    
    // when a challenge is created
    // send challenge to all players
    self.time.on("challengeStart", function() {
        //console.log('Main - time emitted challengeStart');
        var c = self.challenge.create();
        self.players.challenge(c);
    });
    
    
    // players respond to the challenge
    self.players.on("response", function(r) {
        
        console.log('main() - players emitted response');
        
        // get data from response
        var resChallengeID   = r.id;
        var resPlayerID      = r.player;
        var resResponseTime  = moment();
       
        // look up challenge using the ID
        var challenge = _.find(self.challenges, function(c) { return _.isMatch(c, {id: resChallengeID}) });
        var challengeTime = challenge.time;
        
        // if the challenge has expired, reject
        var resTimeDiff = challengeTime.diff(resResponseTime);
        if (resTimeDiff > 3000) {  }
        
    });
    

    //
    
    
    
    
    
    
    
    // when a challenge is created
    //   send challenge to all players
    
    // when a response is received
    //   match response with challenge
    //   if a winner has not yet been decided
    //      if response is received in no more than 3 seconds
    //          if response from this player is unique
    //              log this entry
    //                  - Date
    //                  - reaction time
    
    // when the game is ended
    
    // 
    
};




module.exports = Main;