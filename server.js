const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require('path');
//const { createAdapter } =  require("@socket.io/redis-adapter");
//const { createClient } = require("redis");

//const pubClient = createClient({ url: "redis://localhost:6379" });
//const subClient = pubClient.duplicate();


const io = new Server(server, {
	cors: {
    	origin: '*'
  	}
});
//io.adapter(createAdapter(pubClient, subClient));

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
});
let port = process.argv[2];
let name = "Server On Port : " + port;
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Health check
app.head('/health', function (req, res) {
  res.sendStatus(200);
});

app.get('/server', function(req, res) {
  res.send("Connected to " + port);
})

app.get('/logout', function(req, res) {
  res.send("User Logged Out");
})

app.get('/callback', function(req, res) {
   res.redirect(301, '/');
})

server.listen(port, () => {
  console.log('listening on *:' + port);
});

io.on('connection', (socket) => {
  console.log("User Connected");
  console.log('a user connected : ' + socket.username);
  socket.on('disconnect', () => {
    console.log('user disconnected : ' + socket.username);
  });

  socket.emit('Hi', "Thank you for connecting : " + socket.username + " You  are connected to " + name);
});

