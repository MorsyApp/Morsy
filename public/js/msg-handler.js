/*
Copyright 2021,2022 Carl Marino and Itay Godasevich


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/
/*

---- imports ----

*/
import * as msg_smod from "./script.js"; // message script module
import * as msg_bmod from "./btn-handler.js"; // message btn module
import * as msg_logmod from "./log-utils.js"; // message verbose logging module
/*

---- message bubble functions/alert message bubbles ----


*/
//creates alert in the message box (For Example, "Connection Successful")
export function createSysAlertBubble(msg) {
    let alertContainer = document.createElement("div");
    let alertMsg = document.createElement("h1");
    alertContainer.classList.add("sysalert");
    alertMsg.innerHTML = msg;
    alertContainer.appendChild(alertMsg);
    msg_bmod.messageContainer.appendChild(alertContainer);
}
//creates an user message bubble with an image from the data url specified
export function createUsrImgBubble(dataUrl, usrId) {
    let local_local_function_tag = "createUsrImg()";
    //create html elements
    let msgContainer = document.createElement("div");
    let usrMsg = document.createElement("div");
    let msgImg = document.createElement("img");
    let usrName = document.createElement("a");
    msgContainer.className += "msg-container";
    usrMsg.className += "usr-msg";
    msgImg.src = dataUrl;
    usrName.innerHTML = "Me";
    usrMsg.appendChild(msgImg);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    msg_bmod.messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//creates a peer message bubble with an image from the data url specified
export function createPeerImgBubble(dataUrl, usrId) {
    let local_local_function_tag = "createPeerImg()";
    // create html elements
    let msgContainer = document.createElement("div");
    let usrMsg = document.createElement("div");
    let msgImg = document.createElement("img");
    let usrName = document.createElement("a");
    msgContainer.className += "msg-container";
    usrMsg.className += "peer-msg";
    msgImg.src = dataUrl;
    usrName.innerHTML = msg_smod.peerUsername;
    usrMsg.appendChild(msgImg);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    msg_bmod.messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//creates user message bubble on the users end
export function createUsrMsgBubble(msg, usrId) {
    let local_local_function_tag = "createUsrMsg()";
    let msgContainer = document.createElement("div");
    let usrMsg = document.createElement("div");
    let msgTxt = document.createElement("p");
    let usrName = document.createElement("a");
    let regex = /(<([^>]+)>)/gi;
    msg = msg.replace(regex, "");
    let splitMsg = msg.split(" ");
    let fullMsg = "";
    splitMsg.forEach((msgPart) => {
        if (msgPart.includes("://") && msgPart.includes(".")) {
            fullMsg +=
                '<a href="' + msgPart + '" target="_blank">' + msgPart + "</a> ";
        }
        else {
            fullMsg += msgPart + " ";
        }
    });
    msgContainer.className += "msg-container";
    usrMsg.className += "usr-msg";
    msgTxt.innerHTML = fullMsg;
    usrName.innerHTML = "Me";
    usrMsg.appendChild(msgTxt);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    msg_bmod.messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//creates peer message bubble
export function createPeerMsgBubble(msg, usrId) {
    let local_function_tag = "createPeerMsg()";
    let msgContainer = document.createElement("div");
    let usrMsg = document.createElement("div");
    let msgTxt = document.createElement("p");
    let usrName = document.createElement("a");
    let splitMsg = msg.split(" ");
    let fullMsg = "";
    splitMsg.forEach((msgPart) => {
        if (msgPart.includes("://") && msgPart.includes(".")) {
            fullMsg +=
                '<a href="' + msgPart + '" target="_blank">' + msgPart + "</a> ";
        }
        else {
            fullMsg += msgPart + " ";
        }
    });
    msgContainer.className += "msg-container";
    usrMsg.className += "peer-msg";
    msgTxt.innerHTML = fullMsg;
    usrName.innerHTML = msg_smod.peerUsername;
    usrMsg.appendChild(msgTxt);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    msg_bmod.messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
/*

------------------

*/
/////////////////
/*

---- sending message functions/sending files ----

*/
//sends a connection successful message
export function connSuccess() {
    msg_smod.conn.send(msg_smod.userId + ":" + "sysalert/" + "Connection Successful");
}
//sends the connetent of the message box and clears it
export function send() {
    let local_local_function_tag = "Send()";
    if (msg_bmod.messageBox.value != "") {
        if (msg_smod.conn) {
            msg_logmod.log(local_local_function_tag, `Sent from: ${msg_smod.userId}`);
            msg_smod.conn.send(msg_smod.userId + ":" + "text/" + msg_bmod.messageBox.value);
            msg_logmod.log(local_local_function_tag, "message sent successfully");
            createUsrMsgBubble(msg_bmod.messageBox.value, msg_smod.userId);
        }
        else {
            alert("Something went wrong. "); // change this to custom alert msg later
        }
    }
    msg_bmod.messageBox.value = ""; // reset message box
}
//sends the dataurl for images
export function sendFile(dataUrl) {
    let local_function_tag = "SendFile()";
    if (msg_smod.conn) {
        try {
            msg_smod.conn.send(msg_smod.userId + ":" + "img/" + dataUrl);
            createUsrImgBubble(dataUrl, "Me");
        }
        catch (error) {
            msg_logmod.log(local_function_tag, error.message);
        }
    }
}
// sends a request to the other peer to change your own name
export function sendUserName(newName) {
    let local_function_tag = "SendUsrName()";
    if (msg_smod.conn) {
        try {
            msg_smod.conn.send(msg_smod.userId + ":" + "name/" + newName);
            msg_logmod.log(local_function_tag, "sent name");
        }
        catch (error) {
            msg_logmod.log(local_function_tag, error.message);
        }
    }
}
/*

--------------------


*/
/*

---- event processing functions (event handlers, user connection handling, processing data) ----

*/
// handle a new user joining the room
export function onUserConnected() {
    let local_function_tag = "onUserConnected()";
    msg_logmod.log(local_function_tag, msg_smod.userId + " Joined the room");
    msg_smod.connections.push(msg_smod.userId);
    try {
        msg_smod.setConn(msg_smod.peer.connect(msg_smod.connections[0])); //set conn
        createSysAlertBubble("Connection Successful");
        setTimeout(connSuccess, 500);
    }
    catch (error) {
        console.log(error.message);
    }
}
// handle file input from the input field
export function onFileInp() {
    const reader = new FileReader();
    reader.readAsDataURL(msg_bmod.fileInp.files[0]);
    reader.addEventListener("load", () => {
        sendFile(reader.result.toString());
        msg_bmod.fileInp.value = "";
    });
}
// process all message data sent from the peer
export function processMessageData(data) {
    let local_function_tag = "processData()";
    let processedData = data.substring(0, data.indexOf("/"));
    let newUserId = processedData.substring(0, processedData.indexOf(":"));
    let dataType = processedData.replace(newUserId + ":", "");
    msg_smod.setConn(msg_smod.peer.connect(newUserId)); // connect to the peer via the default name
    switch (dataType) {
        case "text":
            createPeerMsgBubble(data.replace(newUserId + ":", "").replace(dataType + "/", ""), msg_smod.peerUsername);
            msg_logmod.log(local_function_tag, "Recieved data from " + msg_smod.peerUsername);
            msg_smod.setIsTyping(false);
            break;
        case "img":
            createPeerImgBubble(data.replace(newUserId + ":", "").replace(dataType + "/", ""), msg_smod.peerUsername);
            msg_smod.setIsTyping(false);
            break;
        case "name":
            msg_smod.setPeerUsername(data
                .replace(newUserId + ":", "")
                .replace(dataType + "/", ""));
            break;
        case "typing":
            msg_smod.setIsTyping(true);
            msg_bmod.typingMsg.innerHTML = msg_smod.peerUsername + " is typing...";
            break;
        case "notyping":
            msg_smod.setIsTyping(false);
            msg_bmod.typingMsg.innerHTML = "";
            break;
        case "sysalert":
            createSysAlertBubble(data.replace(newUserId + ":", "").replace(dataType + "/", ""));
    }
}
// event handler for the message input box
export function messageBoxEventHandler(key) {
    if (key.keyCode == 13) {
        msg_smod.setIsTyping(false);
        // messageBox.blur(); // this line prevents spam but its annoying for testing
        send();
    }
    if (key.keyCode != 13 &&
        key.key != "Backspace" &&
        key.keyCode != 37 &&
        key.keyCode != 38 &&
        key.keyCode != 39 &&
        key.keyCode != 40) {
        msg_smod.conn.send(msg_smod.userId + ":" + "typing/");
        let interval = setInterval(() => {
            if (msg_logmod.checkForEmpty(msg_bmod.messageBox.value)) {
                msg_smod.conn.send(msg_smod.userId + ":" + "notyping/");
                clearInterval(interval);
            }
        }, 1);
    }
}
