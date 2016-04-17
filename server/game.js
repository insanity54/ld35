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
    this.challengeMaxDelay = 3*1000;
    this.challengeRunning = '';
    this.challenges = [];
    return this;
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
    //console.log('game _runnin');
    // every few seconds, initiate challenge. do this until game is over
    self.emit("challenge", self._makeChallenge());

    if (self.isRunning) {
        self.challengeTimer = setTimeout(function() {
            console.log('timer elapsed isRunning=%s', self.isRunning);
        }, faker.random.number(self.challengeMaxDelay));
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
        //self.emit("processed", {winner: challenge.winner});
        //return cb(null, {res: });
        self.challengeRunning = '';
        self.emit("result", {id: challenge.id, winner: challenge.winner});
    }, 1000);
};


/**
 * receive a response to a challenge.
 */
Game.prototype.processResponse = function processResponse(r, cb) {
    var self = this;
    var id = r.id || null;
    if (!id) return cb('you did not send an ID', null);
    
    // get the challenge the response belongs to
    // if winner is already decided, return diss
    // log the reaction time along with socket ID
    // 1 second after the first response,
    //   choose the entrant with lowest reaction time
    
    var challenge = _.find(self.challenges, function(ch) {
        return ch.id == id;
    });
    if (challenge.winner) return cb(null, {res: 'diss', msg: 'you did not win', err: false});
    challenge.entries.push({player: r.player, reactionTime: moment().diff(challenge.startTime)});
    if (!challenge.firstResponseTime) {
        console.log("first response at ~%s", moment().format());
        challenge.firstResponseTime = moment();
        self._completeChallenge(challenge);
    }
    console.log(challenge.entries);
    
    self.on("result", function(res) {
        console.log('self result res.id=%s, challenge.id=%s', res.id, challenge.id);
        if (res.id !== challenge.id) {
            console.log('no matching id!');
            return;
        }
        if (res.winner) {
            console.log('already a winner-- %s', res.winner);
            return cb(null, {res: "diss", msg: "you lost this challenge", err: false});
        }
        console.log('send some praise');
        setTimeout(function() {self._runChallenge()}, 0);
        return cb(null, {res: "praise", msg: "you won this challenge", err: false});
    });
    
};

module.exports = Game;