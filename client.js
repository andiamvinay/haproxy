const socket = io("ws://localhost", {
  auth: {
    username: "vinay"
  }
});

socket.connect();
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.on("connect_failed", function(){
    socket.connect();
})
socket.onAny((event, ...args) => {
    console.log(event, args)
})

const socket = io("ws://localhost:6001", {autoConnect: false, auth: {userName : "testing"}});
socket.connect();
socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});
socket.on("connect_failed", function(){
    socket.connect();
})
socket.onAny((event, ...args) => {
    console.log(event, args)
})