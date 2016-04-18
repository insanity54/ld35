/**
 * debug console logger for events
 */
 
var ee = require('events').EventEmitter;
var util = require('util');
 

var Debug = function() {
    var self = this;
    ee.call(self);
    
    self.on('roundStart', self.log);
    self.on('roundEnd', self.log);
    self.on('endEnd', self.log);
};
util.inherits(Debug, ee);


Debug.prototype.log = function log(data) {
    console.log(data);
};



module.exports = Debug;