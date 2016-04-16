var faker = require('faker');
var ee = require('events').EventEmitter;
var util = require('util');


var Data = function() {
    ee.call(this);
    this.base = parseFloat("100.054");
};
util.inherits(Data, ee);



Data.prototype.stream = function stream() {
    var self = this;
    
    // every 1s update this.base and emit fake data
    self.streamTimer = setInterval(function() {
        self.emit("data", faker.random.number(3000));
    }, 3000);
};


/** end the stream */
Data.prototype.end = function end(cb) {
    var self = this;
    if (self.streamTimer) {
        clearInterval(self.streamTimer);
    }
    return cb(null);
};


module.exports = Data;