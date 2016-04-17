var ee = require('events').EventEmitter;
var util = require('util');
var moment = require('moment');
var faker = require('faker');
var _ = require('underscore');


var Game = function() {
    ee.call(this);
    this.roundTime = 30*1000; //30 seconds
    this.startTime;
    this.startDelay = 5*1000;
    this.isRunning = false;
    this.challengeTimer;
    this.challengeMaxDelay = 8*1000;
    this.challengeMaxTime = 3000;
    this.challengeRunning = '';
    this.challenges = [];
    return this;
    
    /**
     * self
     *   challenges: [
     *     { 
     *       entries: [
     *         
     *       ],
     *     },
     *     {
     *     }
     *   ]
     */
        
};
util.inherits(Game, ee);


Game.prototype.start = function start() {
    var self = this;
    self.startTime = moment();
    self.isRunning = true;
    self._runChallenge();
    self.emit("creation", true);
    return self;
};


Game.prototype.end = function end() {
    var self = this;
    self.isRunning = false;
    clearTimeout(self.challengeTimer);
    
    return self;
};

Game.prototype._runChallenge = function _runChallenge() {
    var self = this;
    
    // every few seconds, initiate challenge.
    var ch = self._makeChallenge();
    //console.log(ch);
    self.emit("challenge", ch);

    // if nobody clicks a shape after a maximum time,
    // remove the challenge and make a new challenge
    if (self.isRunning) {
        self.challengeTimer = setTimeout(function() {
            self.processResponse({id: ch.id, player: '666'}, function(err, res) { if (err) console.log(err) }); // 666 is shape ID
            console.log('timer elapsed isRunning=%s', self.isRunning);
        }, faker.random.number(self.challengeMaxTime));
    }

    
    return self;
};

Game.prototype.isStarted = function isStarted() {
    var self = this;
    return self.isRunning;
};


Game.prototype._makeChallenge = function _makeChallenge() {
    var self = this;
    var c = {};
    c['id'] = faker.random.uuid();
    c['startTime'] = moment();
    c['firstResponseTime'];
    c['entries'] = [];
    c['winner'] = '';
    self.challenges.push(c);
    self.challengeRunning = c.id;
    return c;
};


/** 
 * after the first challenge response is received,
 * set a timer to end challenge
 */
Game.prototype._completeChallenge = function _completeChallenge(challenge) {
    var self = this;
    setTimeout(function() {
        // self.emit("processed", {winner: challenge.winner});
        // return cb(null, {res: });
        // console.log('completing challenge %s', challenge.id);
    
        
        
        self.challengeRunning = '';
        // send the result of the 
        self.emit("result", {id: challenge.id, winner: challenge.winner});
        
        // if the game time has elapsed, dont create more challenges
        // if there is still time left in the game, queue another challenge
        if (moment().diff(self.startTime) > self.roundTime) {
            console.log("    GAME OVER.");
            console.log();
        }
        else {
            console.log('    another round!');
            setTimeout(function() {self._runChallenge()}, 0);
        }
        
    }, 1000);
};


/**
 * receive a response to a challenge.
 */
Game.prototype.processResponse = function processResponse(r, cb) {
    var self = this;
    var id = r.id || null;
    if (!id) return cb('you did not send an ID', null);
    if (typeof cb !== 'function') throw new Error('call it correctly! second param must be a callback.');
    
    // get the challenge the response belongs to
    // if winner is already decided, return diss
    // log the reaction time along with socket ID
    // 1 second after the first response,
    //   choose the entrant with lowest reaction time
    
    //console.log(self.challenges);
    var challenge = _.find(self.challenges, function(ch) {
        return ch.id == id;
    });
    if (typeof challenge === 'undefined') throw new Error('brokky! challenge was unddefined');
    
    // if there is already a winner, exit
    if (challenge.winner)
        return cb(null, {res: 'diss', msg: 'you did not win', err: false});
    
    //console.log(r.player);
    //console.log(challenge.entries);
    // if this player has already entered this challenge, exit
    // this happens when the player clicks the same shape more than once
    // entries are objects in an array
    //   ex: [ { player: '/#EczWjmb8lOCkwkhKAAAA', reactionTime: 8947 } ]
    if (_.find(challenge.entries, function(e) { return _.isMatch(e, {player: r.player }) })) {
        //console.log("!!!   CAUGHT A DOUBLE!");
        return cb(null, {res: 'idle', 'msg': 'you clicked more than once', err: false});
    }
    
    
    // add the player's entry to the entries
    challenge.entries.push({player: r.player, reactionTime: moment().diff(challenge.startTime)});
    if (!challenge.firstResponseTime) {
        //console.log("first response at ~%s", moment().format());
        challenge.firstResponseTime = moment();
        self._completeChallenge(challenge);
    }
    
    
    self.once("result", function(res) {
        //console.log('self result res.id=%s, challenge.id=%s', res.id, challenge.id);
        if (res.id !== challenge.id) {
            //console.log('no matching id!');
            return;
        }
        if (res.winner) {
            //console.log('already a winner-- %s', res.winner);
            return cb(null, {res: "diss", msg: "you lost this challenge", err: false});
        }
        
        //console.log('send some praise');
        return cb(null, {res: "praise", msg: "you won this challenge", err: false});
    });
    
};

module.exports = Game;