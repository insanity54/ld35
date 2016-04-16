var assert = require('chai').assert;
var Data = require('../server/data');


describe('data', function() {
    it('should send fake data', function(done) {
        this.timeout(10000);
        var data = new Data();
        data.stream();
        data.on("data", function(d) {
           console.log(d);
           assert.isNumber(d);
           
           // end the stream after a bit
           setTimeout(function() {
               data.end(function(err) {
                   assert.isNull(err);
                   done();
               });
           }, 5000);
        });
    });
});