/*global io*/
/*global Chartist*/
/*global Howl*/


console.log('helo world');
var socket = io.connect(document.location.hostname);



console.log(socket);
socket.on("all", function(e) {
    console.log(e);
});

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

socket.on("data", function(d) {
    //console.log(d);
});



/** music
 */
 
var sound = new Howl({
  urls: ['sounds.mp3', 'sounds.ogg'],
  sprite: {
    blast: [0, 2000],
    laser: [3000, 700],
    winner: [5000, 9000]
  }
});

/**
 * CHART
 */
 
 var dataArray = [];
 
 var canvas = d3
              .select("#chart")
              .append("svg")
              
 

