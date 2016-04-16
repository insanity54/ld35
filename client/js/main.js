/*global io*/
/*global Chartist*/
/*global Howl*/
/*global $*/

console.log('helo world');
var socket = io.connect(document.location.hostname);
var playingClip = '';


console.log(socket);
socket.on("speech", function(s) {
    //console.log('speech %s', s);
    speech(s);
});

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

socket.on("start", function() {
    greeting();
    window.setTimeout(function() {
       command(); 
    }, 2000);
});

socket.on("challenge", function(c) {
   challenge(c);
});

socket.on("data", function(d) {
    //console.log(d);
    //sound.play('click');
});


/** music */
var sound = new Howl({
    buffer: true,
    urls: ['/ass/sounds.mp3', '/ass/sounds.ogg'],
    sprite: {
        slave1: [100, 1500],
        peasant1: [1750, 1000],
        peasant2: [3000, 1000],
        slave2: [4400, 1500],
        plebian1: [6000, 1000],
        plebian2: [9000, 1000],
        plebian3: [9400, 1000],
        worshipme: [11000, 2000],
        die: [13000, 1000],
        youarenotworthy: [14500, 2000],
        notworthy: [17200, 2000],
        kneelbeforeme: [19500, 2000],
        kneel: [22000, 1000],
        kree1: [24000, 1000],
        jaffa: [26000, 1000],
        kree2: [28500, 1000],
        youmaygazeuponme: [30000, 2000],
        iwillletyoulive1: [33000, 2000],
        iwillletyoulive2: [35500, 2000],
        dieforme: [38600, 1200],
        laydownyourlifeforme: [40500, 2500],
        youwillgiveyourlife: [43000, 2500],
        fight: [46000, 1000],
        fightforme: [48400, 1500],
        fightinmyname: [50000, 2000],
        click: [52800, 1000],
        clicks: [53500, 1000],
        clickecho: [55500, 1000],
        thud: [56500, 2000]
    },
    onplay: function() {
        // switch to talking image when start talking
        //console.log(playingClip);
        if (playingClip == 'click' || playingClip == 'clicks' || playingClip == 'clickecho' || playingClip == 'thud')
            $("#god img").attr('src', '/ass/god3.png');
        else
            $("#god img").attr('src', '/ass/god2.png');
    },
    onend: function() {
        // switch to normal image when done talking
        $("#god img").attr('src', '/ass/god1.png');
    }
});
const greetings = [
    'peasant1',
    'peasant2',
    'plebian1',
    'plebian2',
    'plebian3',
    'slave1',
    'slave2',
    'jaffa',
    'kree1',
    'kree2'
];
const commands = [
    'dieforme',
    'laydownyourlifeforme',
    'youwillgiveyourlife',
    'fight',
    'fightforme',
    'fightinmyname'
];
const disses = [
    'die',
    'youarenotworthy',
    'jaffa',
    'kree',
    'slave1',
    'slave2',
    'peasant1',
    'peasant2',
    'plebian1',
    'plebian2',
    'plebian3'
];
const praises = [
    'youmaygazeuponme',
    'iwillletyoulive1',
    'iwillletyoulive2'
];
const other = [
    'worshipme',
    'kneel',
    'kneelbeforeme',
];


/** random number between x and y */
var random = function random(x, y) {
    return Math.floor(Math.random() * y) + x;
}

/**
 * the god says a random greeting
 */
var greeting = function greeting() {
    //var p = new Promise();
    speech(greetings[random(0, greetings.length-1)]);
    //return p;
};

/**
 * the god says a random command
 */
var command = function command() {
    speech(commands[random(0, commands.length-1)]);
    //return p;
};


/**
 * speech
 * 
 * hear the god speek
 */
var speech = function speech(clip) {
    // god talks
    playingClip = clip;
    sound.play(clip);
};



 

/**
 * speak
 * 
 * make the god speak
 *   - do the animation
 *   - do the audio
 *   - notify the network
 */
var speak = function speak(clip) {
    
    // network notify
    socket.emit('speech', clip);
    speech(clip);

};




/**
 * CHART
 */
 
 var dataArray = [];
 
 var canvas = d3
              .select("#chart")
              .append("svg")
              
 

