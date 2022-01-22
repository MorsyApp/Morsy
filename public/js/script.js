///vars
const socket = io("/")

let peerHostname = '127.0.0.1';
let peerPort = 3001

if (window.location.host == "morsy.cc"){
    peerHostname = 'peer.morsy.cc';
    peerPort = 443
}

const peer = new Peer(undefined, {
    host: peerHostname,
    port: peerPort,
})





//empty variables

let firstTime = true;
let peerUsername = "Samuel Morse";
let editingName = false;
var userId = undefined;
var connections = [];
var conn = undefined;
let typing = false;




let givenAlias = false;

peer.on("open", id =>{
    userId = id;
    socket.emit("join-room", ROOM_ID, id)
})

//socket user management
socket.on("user-connected", userId => {
    console.log(userId + " Joined lol ")
    connections.push(userId)

    conn = peer.connect(connections[0])
    createPeerMsg("Connection Successful", peerUsername);
    setTimeout(connSuccess,500);
})





//peerjs managing connnections and data sent from other users
peer.on('connection', function(connection) {
    connection.on('data', function(data){
        processData(data);
    });
  });


