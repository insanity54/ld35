var Stage = function Stage(game) {
    var self = this;
    self._game = game;
    return self;
};


// the title stage



// the game stage
Stage.prototype.game = function game() {
    var self = this;
    console.log('game stage');

    
    // when a challenge is created
    // send challenge to all players
    self.on('challengeStart', function(c) {
        self.players.emit('challenge', c);
    });
    
    
    // players have x seconds to respond to the challenge
    // @todo enable
    self.players.on('response', function(r) {
        console.log('player sent a response');
        
        // get data from response
        var resChallengeID   = r.id;
        var resPlayerID      = r.player;
        var resResponseTime  = moment();
       
        // look up challenge using the ID
        var challenge = _.find(self.challenges, function(c) { return _.isMatch(c, {id: resChallengeID}) });
        var challengeTime = r.time;
        
        // if the challenge has expired, reject
        var resTimeDiff = challengeTime.diff(resResponseTime);
        if (resTimeDiff > 3000) {  }
        
    });
};


// the end stage



module.exports = Stage;