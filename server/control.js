/**
 * control flow for the game
 */
 
var ee = require('events').EventEmitter;
var util = require('util');
 

var ControlFlow = function() {
    var self = this;
    ee.call(self);
    self.stages = [
        'title',
        'game',
        'end'
    ];
    self.stage = 0;
};
util.inherits(ControlFlow, ee);



ControlFlow.prototype.next = function next() {
    
};





module.exports = ControlFlow;