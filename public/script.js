const socket = io("/")
const sendBtn = document.querySelector(".send-btn");
const peer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

var userId = undefined;
var connections = []
var conn = undefined;

peer.on("open", id =>{
    userId = id;
    socket.emit("join-room", ROOM_ID, id)
})


socket.on("user-connected", userId => {
    console.log(userId + " Joined")
    connections.push(userId)
    conn = peer.connect(connections[0])
    setTimeout(()=>{conn.send(userId + ":" + "^^^°°°~~~")},200)
})


sendBtn.addEventListener("click", ()=>{
    conn.send(userId + ":" + "hi")
})

peer.on('connection', function(connection) {
    connection.on('data', function(data){
        newUserId = data.substring(0, data.indexOf(":"))
        conn = peer.connect(newUserId)
        console.log(data.replace(":","").replace(newUserId,""));
    });
  });


