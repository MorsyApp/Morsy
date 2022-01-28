/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

import * as scr_msgmod from "./msg-handler.js" // script file message module reference
import * as scr_logmod from "./log-utils.js" // script file log utils module reference
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
export const peer = new Peer(undefined, { // intialize a peer with the hostname and port
  host: peerHostname,
  port: peerPort,
});

/* 

---- variable definitions ----

*/
export let roomURL:string = window.location.href;
export let firstTime: boolean = true; // specifies whether it is the first time that the typing mes`sa`ge is shown in order to not repeat showing the message
export let peerUsername: string = "Unnamed User"; // changeable. this is the default
export let editingName: boolean = false; // is the user editing the name
export let userId: string; // the default userId for socket connections
export let connections: DataConnectionType[] = []; // all the peer connections to the room
export let conn: DataConnectionType = undefined; // the connection between the two peers
export let typing = false; // bool true if the peer is typing, false if notcmd


peer.on("open", (id: string) => {
  userId = id; // set the id of the peer that joined to the userId
  // @ts-ignore
  socket.emit("join-room", ROOM_ID, id); // ignore this because ts doesn't have a direct reference to ROOM_ID
});

//socket user management
socket.on("user-connected", (userId: string) => {
  scr_msgmod.onUserConnected()
});

//peerjs managing connnections and data sent from other users
peer.on("connection", function (connection: DataConnectionType) {
  connection.on("data", function (data: string) {
    scr_msgmod.processMessageData(data);
  });
});

const setPeerUsername = (newPeerUsername: string) => peerUsername = newPeerUsername;
const setIsTyping = (isTyping: boolean) => typing = isTyping;
const setConn = (newConn: DataConnectionType) => conn = newConn;
const setIsEditingName = (isEditingName:boolean) => editingName = isEditingName;

export {setPeerUsername,setIsTyping, setConn, setIsEditingName};