/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/


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


