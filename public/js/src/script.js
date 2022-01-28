/*
Copyright 2021,2022 Carl Marino and Itay Godasevich


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/
// import peertoex from "https://cdnjs.cloudflare.com/ajax/libs/peerjs/1.3.2/peerjs.min.js";
// import {io} from "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.4.1/socket.io.min.js"
import * as scr_msgmod from "./msg-handler.js";
import * as scr_logmod from "./verbose-func.js";
///lets
//@ts-ignore
const socket = io("/");
let peerHostname = "127.0.0.1";
let peerPort = 3001;
if (window.location.host == "morsy.cc") {
    peerHostname = "peer.morsy.cc";
    peerPort = 443;
}
//@ts-ignore
export const peer = new Peer(undefined, {
    host: peerHostname,
    port: peerPort,
});
//empty letiables
export let roomURL = window.location.href;
export let firstTime = true; // specifies whether it is the first time that the typing mes`sa`ge is shown in order to not repeat showing the message
export let peerUsername = "Unnamed User"; // changeable. this is the default
export let editingName = false; // is the user editing the name
export let userId; // the default userId for socket connections
export let connections = []; // all the peer connections to the room
export let conn = undefined; // the connection between the two peers
export let typing = false; // bool true if the peer is typing, false if notcmd
peer.on("open", (id) => {
    userId = id;
    // @ts-ignore
    socket.emit("join-room", ROOM_ID, id);
});
//socket user management
socket.on("user-connected", (userId) => {
    let local_function_tag = "[SOCKET_EVENT] user-connected";
    scr_logmod.log(local_function_tag, userId + " Joined the room");
    connections.push(userId);
    conn = peer.connect(connections[0]);
    scr_msgmod.createSysAlert("Connection Successful");
    setTimeout(scr_msgmod.connSuccess, 500);
});
//peerjs managing connnections and data sent from other users
peer.on("connection", function (connection) {
    connection.on("data", function (data) {
        scr_msgmod.processData(data);
    });
});
const setPeerUsername = (newPeerUsername) => peerUsername = newPeerUsername;
const setIsTyping = (isTyping) => typing = isTyping;
const setConn = (newConn) => conn = newConn;
const setIsEditingName = (isEditingName) => editingName = isEditingName;
export { setPeerUsername, setIsTyping, setConn, setIsEditingName };
