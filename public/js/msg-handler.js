"use strict";
/*
Copyright 2021,2022 Carl Marino and Itay Godasevich


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/
// variable that gets reassigned every time a function needs a function tag.
//creates alert in the message box (For Example, "Connection Successful")
function createSysAlert(msg) {
    let alertContainer = document.createElement("div");
    let alertMsg = document.createElement("h1");
    alertContainer.classList.add("sysalert");
    alertMsg.innerHTML = msg;
    alertContainer.appendChild(alertMsg);
    messageContainer.appendChild(alertContainer);
}
//creates an user message bubble with an image from the data url specified
function createUsrImg(dataUrl, usrId) {
    let FUNCTION_TAG = "createUsrImg()";
    //create html elements
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgImg = document.createElement("img");
    var usrName = document.createElement("a");
    msgContainer.className += "msg-container";
    usrMsg.className += "usr-msg";
    msgImg.src = dataUrl;
    usrName.innerHTML = "Me";
    usrMsg.appendChild(msgImg);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//creates a peer message bubble with an image from the data url specified
function createPeerImg(dataUrl, usrId) {
    let FUNCTION_TAG = "createPeerImg()";
    // create html elements
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgImg = document.createElement("img");
    var usrName = document.createElement("a");
    msgContainer.className += "msg-container";
    usrMsg.className += "peer-msg";
    msgImg.src = dataUrl;
    usrName.innerHTML = peerUsername;
    usrMsg.appendChild(msgImg);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//creates user message bubble
function createUsrMsg(msg, usrId) {
    let FUNCTION_TAG = "createUsrMsg()";
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgTxt = document.createElement("p");
    var usrName = document.createElement("a");
    let regex = /(<([^>]+)>)/gi;
    msg = msg.replace(regex, "");
    let splitMsg = msg.split(" ");
    let fullMsg = "";
    splitMsg.forEach((msgPart) => {
        if (msgPart.includes("://") && msgPart.includes(".")) {
            fullMsg +=
                '<a href="' + msgPart + '" target="_blank">' + msgPart + "</a> ";
            isMsgHyperLink = true;
        }
        else {
            isMsgHyperLink = false;
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
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//creates peer message bubble
function createPeerMsg(msg, usrId) {
    let FUNCTION_TAG = "createPeerMsg()";
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgTxt = document.createElement("p");
    var usrName = document.createElement("a");
    let splitMsg = msg.split(" ");
    let fullMsg = "";
    splitMsg.forEach((msgPart) => {
        if (msgPart.includes("://") && msgPart.includes(".")) {
            fullMsg +=
                '<a href="' + msgPart + '" target="_blank">' + msgPart + "</a> ";
            isMsgHyperLink = true;
        }
        else {
            fullMsg += msgPart + " ";
            isMsgHyperLink = false;
        }
    });
    msgContainer.className += "msg-container";
    usrMsg.className += "peer-msg";
    msgTxt.innerHTML = fullMsg;
    usrName.innerHTML = peerUsername;
    usrMsg.appendChild(msgTxt);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}
//sends a connection successful message
function connSuccess() {
    conn.send(userId + ":" + "sysalert/" + "Connection Successful");
}
//sends the connetent of the message box and clears it
function Send() {
    let FUNCTION_TAG = "Send()";
    if (messageBox.value != "") {
        if (conn) {
            log(FUNCTION_TAG, `Sent from: ${userId}`);
            conn.send(userId + ":" + "text/" + messageBox.value);
            log(FUNCTION_TAG, "message sent successfully");
            createUsrMsg(messageBox.value, userId);
        }
        else {
            alert("Something went wrong. "); // change this to custom alert msg later
        }
    }
    messageBox.value = ""; // reset message box
}
//sends the dataurl for images
function SendFile(dataUrl) {
    let FUNCTION_TAG = "SendFile()";
    if (conn) {
        try {
            conn.send(userId + ":" + "img/" + dataUrl);
            createUsrImg(dataUrl, "Me");
        }
        catch (error) {
            log(FUNCTION_TAG, error.message);
        }
    }
}
function SendUsrName(newName) {
    let FUNCTION_TAG = "SendUsrName()";
    if (conn) {
        try {
            conn.send(userId + ":" + "name/" + newName);
            log(FUNCTION_TAG, "sent name");
        }
        catch (error) {
            log(FUNCTION_TAG, error.message);
        }
    }
}
function onUserConnected() {
    let FUNCTION_TAG = "onUserConnected()";
    log(FUNCTION_TAG, userId + " Joined the room");
    connections.push(userId);
    try {
        conn = peer.connect(connections[0]);
        createPeerMsg("Connection Successful", peerUsername);
        setTimeout(connSuccess, 500);
    }
    catch (error) {
        console.log(error.message);
    }
}
function onFileInp() {
    const reader = new FileReader();
    reader.readAsDataURL(fileInp.files[0]);
    reader.addEventListener("load", () => {
        SendFile(reader.result);
        fileInp.value = "";
    });
}
function processData(data) {
    let FUNCTION_TAG = "processData()";
    let processedData = data.substring(0, data.indexOf("/"));
    let newUserId = processedData.substring(0, processedData.indexOf(":"));
    let dataType = processedData.replace(newUserId + ":", "");
    conn = peer.connect(newUserId); // connect to the peer via the default name
    switch (dataType) {
        case "text":
            createPeerMsg(data.replace(newUserId + ":", "").replace(dataType + "/", ""), peerUsername);
            log(FUNCTION_TAG, "Recieved data from " + peerUsername);
            typing = false;
            break;
        case "img":
            createPeerImg(data.replace(newUserId + ":", "").replace(dataType + "/", ""), peerUsername);
            typing = false;
            break;
        case "name":
            peerUsername = data
                .replace(newUserId + ":", "")
                .replace(dataType + "/", "");
            break;
        case "typing":
            typing = true;
            typingMsg.innerHTML = peerUsername + " is typing...";
            break;
        case "notyping":
            typing = false;
            typingMsg.innerHTML = "";
            break;
        case "sysalert":
            createSysAlert(data.replace(newUserId + ":", "").replace(dataType + "/", ""));
    }
}
function messageBoxEventHandler(key) {
    if (key.keyCode == 13) {
        typing = false;
        // messageBox.blur(); // this line prevents spam but its annoying for testing
        Send();
    }
    if (key.keyCode != 13 &&
        key.key != "Backspace" &&
        key.keyCode != 37 &&
        key.keyCode != 38 &&
        key.keyCode != 39 &&
        key.keyCode != 40) {
        conn.send(userId + ":" + "typing/");
        let interval = setInterval(() => {
            if (checkForEmpty(messageBox.value)) {
                conn.send(userId + ":" + "notyping/");
                clearInterval(interval);
            }
        }, 1);
    }
}
