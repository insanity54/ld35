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
        var changeBy = faker.random.number(20);
        var up = !(faker.random.number() % 2);
        //console.log("%s, %s, %s", self.base, changeBy, up);
        if (!up) changeBy = (changeBy-changeBy-changeBy);
        self.emit("data", self.base = (self.base + changeBy));
    }, 1000);
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