/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

///vars
const socket = io("/");

let peerHostname = "0.peerjs.com";
let peerPort = 443;

window.onload = () => {
  setFirstTimeEmojiHelp(true)
  updateSettings()
}

const peer = new Peer(undefined, {
  host: peerHostname,
  port: peerPort,
});

//empty variables
let roomURL = window.location.href; 
let emojiHelpMessage = ";;;possible"
let firstTime = true; // specifies whether it is the first time that the typing mes`sa`ge is shown in order to not repeat showing the message
let peerUsername = "Unnamed User"; // changeable. this is the default
let editingName = false; // is the user editing the name
var userId = undefined; // the default userId for socket connections
var connections = []; // all the peer connections to the room
var conn = undefined; // the connection between the two peers
let typing = false; // bool true if the peer is typing, false if notcmd
let isMsgHyperLink = false;
let typingIndicator = true;
let recImages = true;
let firstTimeEmojiHelp = true
let isFirstTimeWrongEmoji = true


let givenAlias = false;

peer.on("open", (id) => {
  userId = id;
  socket.emit("join-room", ROOM_ID, id);
});

//socket user management
socket.on("user-connected", (userId) => {
  FUNCTION_TAG = "[SOCKET_EVENT] user-connected";

  log(FUNCTION_TAG, userId + " Joined the room");
  
  connections = []

  connections.push(userId);
  conn = peer.connect(connections[0]);
  createSysAlertBubble("Connection Successful");
  setTimeout(connSuccess, 500);
});


//peerjs managing connnections and data sent from other users
peer.on("connection", function (connection) {
  connection.on("data", function (data) {
    processData(data);
  });
});

const setItFirstTime = (isFirstTime) => firstTime = isFirstTime
const setTyping = (isTyping) => typing = isTyping
const setIsEditingName = (isEdit) => editingName = isEdit
const setMsgHyperlink = (isMsgHlink) => isMsgHyperLink = isMsgHlink
const setPeerUsername = (newPeerUsername) => peerUsername = newPeerUsername
const setTypingIndicatorBool = (newTypingIndicator) => typingIndicator = newTypingIndicator
const setFirstTimeEmojiHelp = (isFirstTime) => firstTimeEmojiHelp = isFirstTime
const setIsFirstTimeWrongEmoji = (isFirstTime) => isFirstTimeWrongEmoji = isFirstTime

const getIsFirstTime = () => {
  return firstTime
}
const getIsTyping = () => {return typing}

const getIsEditingName = () => {return editingName}
const getIsMsgHyperLink = () => {return isMsgHyperLink}
const getPeerUsername = () => {return peerUsername}
const getTypingIndicatorStatus = () => {return typingIndicator}
const getIsFirstTimeEmojiHelp = () => {return firstTimeEmojiHelp}
const getIsFirstTimeWrongEmoji = () => {return isFirstTimeWrongEmoji}
