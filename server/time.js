/**
 * send out time based events
 */
 
var ee = require('events').EventEmitter;
var util = require('util');
var faker = require('faker');



var Time = function() {
    var self = this;
    ee.call(self);
    self.startDelayDuration = 5*1000;
    self.roundDuration = 30*1000;
    self.endDuration = 5*1000;
    self.challengeMaxDelayDuration = 5*1000;
};
util.inherits(Time, ee);



Time.prototype.start = function start(game) {
    // when games starts
    //   start delay (start delay duration)
    //     when delay ends
    //       start delay (game duration)
    //       
    var self = this;

    
    //console.log('start delay');
    setTimeout(function() {
        self.emit('roundStart');
    }, self.startDelayDuration);
    

    self.once('roundStart', function() {
        console.log('Time - round start');
        // round has begun

        // start the first challenge after a random duration
        // the following challenges trigger after a player completes the first
        // that trigger repeats until the round ends
        self.challengeTime();

        setTimeout(function() {
            self.emit('roundEnd');
        }, self.roundDuration);
    });
    
    
    self.once('roundEnd', function() {
        console.log('Time - roundEnd');
        setTimeout(function() {
            self.emit('endEnd');
            self.start(); // continue the cycle; new round
        }, self.endDuration);
    });
};


// start a challenge after n time (where n is random)
Time.prototype.challengeTime = function challengeTime() {
    var self = this;
    
    setTimeout(function() {
        // signal to other modules that its time for a challenge
        self.emit("challengeStart");
    }, faker.random.number(self.challengeMaxDelayDuration));

};







module.exports = Time;