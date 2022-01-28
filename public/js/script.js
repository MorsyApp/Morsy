/*
Copyright 2021,2022 Carl Marino and Itay Godasevich


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/
import * as scr_msgmod from "./msg-handler.js"; // script file message module reference
///lets
//@ts-ignore
const socket = io("/"); // make ts ignore this, io declaration only comes in after compilation
let peerHostname = "127.0.0.1"; // peer server default host
let peerPort = 3001; // default port
if (window.location.host == "morsy.cc") { // check if current location is the main website
    peerHostname = "peer.morsy.cc";
    peerPort = 443;
}
//@ts-ignore
export const peer = new Peer(undefined, {
    host: peerHostname,
    port: peerPort,
});
/*

---- variable definitions ----

*/
export let roomURL = window.location.href;
export let firstTime = true; // specifies whether it is the first time that the typing mes`sa`ge is shown in order to not repeat showing the message
export let peerUsername = "Unnamed User"; // changeable. this is the default
export let editingName = false; // is the user editing the name
export let userId; // the default userId for socket connections
export let connections = []; // all the peer connections to the room
export let conn = undefined; // the connection between the two peers
export let typing = false; // bool true if the peer is typing, false if notcmd
peer.on("open", (id) => {
    userId = id; // set the id of the peer that joined to the userId
    // @ts-ignore
    socket.emit("join-room", ROOM_ID, id); // ignore this because ts doesn't have a direct reference to ROOM_ID
});
//socket user management
socket.on("user-connected", (userId) => {
    // let local_function_tag = "[SOCKET_EVENT] user-connected";
    // scr_logmod.log(local_function_tag, userId + " Joined the room");
    // connections.push(userId);
    // conn = peer.connect(connections[0]);
    // scr_msgmod.createSysAlertBubble("Connection Successful");
    // setTimeout(scr_msgmod.connSuccess, 500);
    scr_msgmod.onUserConnected();
});
//peerjs managing connnections and data sent from other users
peer.on("connection", function (connection) {
    connection.on("data", function (data) {
        scr_msgmod.processMessageData(data);
    });
});
const setPeerUsername = (newPeerUsername) => peerUsername = newPeerUsername;
const setIsTyping = (isTyping) => typing = isTyping;
const setConn = (newConn) => conn = newConn;
const setIsEditingName = (isEditingName) => editingName = isEditingName;
export { setPeerUsername, setIsTyping, setConn, setIsEditingName };
