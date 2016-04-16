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
    this.challenges = [];
};
util.inherits(Game, ee);


Game.prototype.start = function start() {
    var self = this;
    self.startTime = moment();
    
    self._run();
    
    return self;
};


Game.prototype.end = function end() {
    var self = this;
    self.isRunning = false;
    clearTimeout(self.challengeTimer);
    
    return self;
};

Game.prototype._run = function _run() {
    var self = this;
    
    // every few seconds, initiate challenge. do this until game is over
    self.emit('challenge', self._makeChallenge());
    self.challengeTimer = setTimeout(function() {
        if (self.isRunning) self._run();
    }, faker.random.number(self.challengeMaxDelay));
    
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
    c['startTime'] = moment().valueOf;
    c['responseTime'] = '';
    c['winner'] = '';
    self.challenges.push(c);
    return c;
};

Game.prototype.processResponse = function processResponse(r, cb) {
    var self = this;
    var id = r.id || null;
    if (!id) return cb('you did not send an ID', null);
    
    // get the challenge the response belongs to
    // if winner is already decided, return diss
    // log the reaction time along with socket ID
    // 5 seconds after challenge was initiated,
    //   choose the entrant with lowest reaction time
    
    var challenge = _.find(self.challenges, function(ch) {
        return ch.id == id
    });
    if (challenge.winner) return cb(null, {res: 'diss', msg: 'you did not win', err: false});
    
    
};

module.exports = Game;