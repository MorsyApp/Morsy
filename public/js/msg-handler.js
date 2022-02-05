/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/


// variable that gets reassigned every time a function needs a function tag.

//creates alert in the message box (For Example, "Connection Successful")
function createSysAlertBubble(msg){
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
function createUsrMsgBubble(msg, usrId) {
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
      setMsgHyperlink(true)
    } else {
      setMsgHyperlink(false)
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

function sendTypingIndicatorReq(val) {
  let FUNCTION_TAG = "sendTypingIndicatorReq()";
  if (conn) {
    try {
      if (val) {
        conn.send(userId + ":" + "typingIndicatorOn/" );
      }
      else {
        conn.send(userId + ":" + "typingIndicatorOff/");
      }

      log(FUNCTION_TAG, `typing indicator set to ${val}`);
    } catch (error) {
      log(FUNCTION_TAG, error.message);
    }
  }
}

//creates peer message bubble
function createPeerMsgBubble(msg, usrId) {
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
    } else {
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

function updateSettings() {
  if(localStorage.getItem("recImages")){
    
  }
}

//sends the connetent of the message box and clears it
function sendMsg() {
  let FUNCTION_TAG = "sendMsg()";

  if (messageBox.value != "") {
    if (conn) {
      log(FUNCTION_TAG, `Sent from: ${userId}`);
      conn.send(userId + ":" + "text/" + messageBox.value);
      log(FUNCTION_TAG, "message sent successfully");
      createUsrMsgBubble(messageBox.value, userId);
    } else {
      alert("Something went wrong. "); // change this to custom alert msg later
    }
  }
  messageBox.value = ""; // reset message box
}

//sends the dataurl for images
function sendFile(dataUrl) {
  let FUNCTION_TAG = "sendFile()";
    if (conn) {
      try {
        conn.send(userId + ":" + "img/" + dataUrl);
        createUsrImg(dataUrl, "Me");
      } catch (error) {
        log(FUNCTION_TAG, error.message);
      }
    }
}


// sends a change username request to the peer
function sendUsrNameReq(newName) {
  let FUNCTION_TAG = "sendUsrNameReq()";
  if (conn) {
    try {
      conn.send(userId + ":" + "name/" + newName);
      log(FUNCTION_TAG, "sent name");
    } catch (error) {
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
    createPeerMsgBubble("Connection Successful", peerUsername);
    setTimeout(connSuccess, 500);
  } catch (error) {
    console.log(error.message);
  }
}

function onFileInp() {
  const reader = new FileReader();
  reader.readAsDataURL(fileInp.files[0]);
  reader.addEventListener("load", () => {
    sendFile(reader.result);
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
    
    case "typingIndicatorOn":
      setTypingIndicatorBool(true)
      break

    case "typingIndicatorOff":
      setTypingIndicatorBool(false)
      break
    case "text":
      createPeerMsgBubble(
        data.replace(newUserId + ":", "").replace(dataType + "/", ""),
        peerUsername
      );
      log(FUNCTION_TAG, "Recieved data from " + peerUsername);
      setTyping(false)
      break;
    case "img":
      if(recImages){
        createPeerImg(
          data.replace(newUserId + ":", "").replace(dataType + "/", ""),
          peerUsername
        );
      }
      setTyping(false)
      break;
    case "name":
      setPeerUsername(data
        .replace(newUserId + ":", "")
        .replace(dataType + "/", ""))
      break;

    case "typing":
      setTyping(true)
      if (getTypingIndicatorStatus()){
        typingMsg.innerHTML = peerUsername + " is typing...";
        
      }
      else {
        typingMsg.innerHTML = ""
      }
      break;

    case "notyping":
      setTyping(false)
      typingMsg.innerHTML = "";
      break;
    case "sysalert":
      createSysAlertBubble(data.replace(newUserId + ":", "").replace(dataType + "/", ""))
  }
}
function messageBoxEventHandler(key) {
  if (key.keyCode == 13) {
    setTyping(false)
    // messageBox.blur(); // this line prevents spam but its annoying for testing
    sendMsg();
  }
  if (
    key.keyCode != 13 &&
    key.key != "Backspace" &&
    key.keyCode != 37 &&
    key.keyCode != 38 &&
    key.keyCode != 39 &&
    key.keyCode != 40
  ) {
    conn.send(userId + ":" + "typing/");

    let interval = setInterval(() => {
      if (checkForEmpty(messageBox.value)) {
        conn.send(userId + ":" + "notyping/");
        clearInterval(interval);
      }
    }, 1);
  }
}

