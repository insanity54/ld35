/*global io*/
/*global Chartist*/
/*global Howl*/


console.log('helo world');
// var socket = io.connect(document.location.hostname);



// console.log(socket);
// socket.on("all", function(e) {
//     console.log(e);
// });

// socket.on('news', function (data) {
//     console.log(data);
//     socket.emit('my other event', { my: 'data' });
// });

// socket.on("data", function(d) {
//     //console.log(d);
//     //sound.play('click');
// });


/** music
 */
 
var sound = new Howl({
    buffer: true,
    urls: ['/ass/sounds.mp3', '/ass/sounds.ogg'],
    sprite: {
        slave1: [100, 1500],
        peasant1: [1750, 1000],
        peasant2: [3000, 1000],
        slave2: [4400, 1000],
        plebian1: [6000, 1000],
        plebian2: [9000, 1000],
        plebian3: [9400, 1000],
        worshipme: [11400, 1000],
        die: [13000, 1000],
        youarenotworthy: [14500, 1500],
        notworthy: [17200, 1000],
        kneelbeforeme: [19500, 2000],
        kneel: [22000, 1000],
        kree1: [24000, 1000],
        jaffa: [26000, 1000],
        kree2: [28500, 1000],
        youmaygazeuponme: [30000, 2000],
        iwillletyoulive1: [33000, 2000],
        iwillletyoulive2: [35500, 2000],
        dieforme: [38600, 1200],
        laydownyourlifeforme: [40500, 2000],
        youwillgiveyourlife: [43000, 2000],
        fight: [46000, 1000],
        fightforme: [48400, 1500],
        fightinmyname: [50000, 2000],
        click: [52800, 1000],
        clicks: [53500, 1000],
        clickecho: [55500, 1000],
        thud: [56500, 2000]
    }
});





/**
 * CHART
 */
 
 var dataArray = [];
 
 var canvas = d3
              .select("#chart")
              .append("svg")
              
 

