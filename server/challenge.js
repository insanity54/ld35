var faker = require('faker');
var moment = require('moment');


var Challenge = function Challenge() {
    this.challenges = [];
};

Challenge.prototype.create = function create() {
    var self = this;
    var c = {};
    c['shape'] = faker.random.number(2); // number between 0-3 for shape
    c['id'] = faker.random.uuid();
    c['startTime'] = moment();
    c['firstResponseTime'];
    c['entries'] = [];
    c['winner'] = '';
    self.challenges.push(c);
    return c;
};


module.exports = Challenge;