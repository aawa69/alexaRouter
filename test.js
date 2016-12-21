var server = require('http').createServer()
  , url = require('url')
  , WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ server: server })
  , express = require('express')
  , app = express()
  , port = 8081;
 
app.get('/', function(req, res) {
  //var test = new WebSocket('ws://localhost:8080');
  //test.send('something');
  res.send({ msg: "hello" });
  var socket = wss.Dial('http://localhost:8080');
	socket.send('messages', "yo dude");
});
 
wss.on('connection', function connection(ws) {
  var location = url.parse(ws.upgradeReq.url, true);
  // you might use location.query.access_token to authenticate or share sessions 
  // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312) 
 
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
 
  ws.send('something');
});
 
server.on('request', app);
server.listen(port, function () { console.log('Listening on ' + server.address().port) });