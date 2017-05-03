var bonjour = require('bonjour')()
 
// advertise an HTTP server on port 3000 
bonjour.publish({ name: 'web_server', type: 'http', host: 'krishna', port: 3000 })
 
// browse for all http services 
bonjour.find({ type: 'http' }, function (service) {
  console.log('Found an HTTP server:', service)
});
/*
var net = require('net');
var server = net.createServer(function(socket){
	console.log("server is created");
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});

server.listen(0,'192.168.42.134');*/


var net = require('net');

var server = net.createServer();  
server.on('connection', handleConnection);

server.listen(3000, function() {  
  console.log('server listening to %j', server.address());
});

function handleConnection(conn) {  
  var remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
  console.log('new client connection from %s', remoteAddress);

  conn.on('data', onConnData);
  conn.once('close', onConnClose);
  conn.on('error', onConnError);

  function onConnData(d) {
    console.log('connection data from %s: %j', remoteAddress, d);
    conn.write(d);
  }

  function onConnClose() {
    console.log('connection from %s closed', remoteAddress);
  }

  function onConnError(err) {
    console.log('Connection %s error: %s', remoteAddress, err.message);
  }
}