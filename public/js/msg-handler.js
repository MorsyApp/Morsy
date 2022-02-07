/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

// variable that gets reassigned every time a function needs a function tag.

//creates alert in the message box (For Example, "Connection Successful")
function createSysAlertBubble(msg) {
  let alertContainer = document.createElement("div");
  let alertMsg = document.createElement("h1");

  alertContainer.classList.add("sysalert");
  alertMsg.innerHTML = msg;

  alertContainer.appendChild(alertMsg);
  messageContainer.appendChild(alertContainer);
}

//creates an user message bubble with an image from the data url specified

function createUsrImgBubble(dataUrl, usrId) {
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
function createPeerImgBubble(dataUrl, usrId) {
  let FUNCTION_TAG = "createPeerImg()";

  // create html elementsf
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

// update the localStorage settings

function updateSettings() {
  switch (localStorage.getItem("recImages")) {
    case "true":
      recImages = true;
      break;
    case "false":
      recImages = false;
      break;
    default:
      recImages = true;
      break;
  }
  switch (localStorage.getItem("showTyping")) {
    case "true":
      typingIndicator = true;
      break;

    case "false":
      typingIndicator = false;
      break;

    default:
      typingIndicator = true;
      break;
  }
  switch (localStorage.getItem("colorMode")) {
    case "dark":
      colorMode = "dark";
      break;
    case "light":
      colorMode = "light";
      break;
    default:
      colorMode = "default";
      break;
  }
  updateButtonColours();
  updateThemeColours();
  log(
    "updateSettings()",
    `set typing indicator to ${typingIndicator}, set recimages to ${recImages}, colorMode: ${colorMode}`
  );
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
      setMsgHyperlink(true);
    } else {
      setMsgHyperlink(false);
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
        conn.send(userId + ":" + "typingIndicatorOn/");
      } else {
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

//sends the connetent of the message box and clears it
function sendMsg() {
  let FUNCTION_TAG = "sendMsg()";

  if (messageBox.value != "") {
    if (conn) {
      if (messageBox.value == ";;;possible" && getIsFirstTimeEmojiHelp()) {
        createSysAlertBubble(textToEmojiIcon(";;;possible"));
        messageBox.value = "";
        setFirstTimeEmojiHelp(false);
        return;
      }
      if (messageBox.value.startsWith(";") && textToEmojiIcon(messageBox.value) == "No such emoji exists.") {
        if (getIsFirstTimeWrongEmoji()) {
          createSysAlertBubble(textToEmojiIcon("digga"));
          setIsFirstTimeWrongEmoji(false);
          messageBox.value = "";
          return;
        }
      }
      log(FUNCTION_TAG, `Sent from: ${userId}`);
      conn.send(userId + ":" + "text/" + messageBox.value);
      log(FUNCTION_TAG, "message sent successfully");

      toShow = messageBox.value

      if (textToEmojiIcon(messageBox.value) != "No such emoji exists." && messageBox.value != ";;;possible") {
        toShow = textToEmojiIcon(messageBox.value)
      }
      createUsrMsgBubble(toShow, userId);
    } else {
      alert(
        "Cant send message: you may be only one in the chat room (go to the triple dot menu and press invite to invite others)"
      ); // change this to custom alert msg later
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
      createUsrImgBubble(dataUrl, "Me");
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
  conn.serialization = "binary-utf8";

  switch (dataType) {
    case "typingIndicatorOn":
      setTypingIndicatorBool(true);
      break;

    case "typingIndicatorOff":
      setTypingIndicatorBool(false);
      break;
    case "text":
      let text = data.replace(newUserId + ":", "").replace(dataType + "/", "");
      console.log(text)

      if (textToEmojiIcon(text) != "No such emoji exists." && text != ";;;possible") {
        text = textToEmojiIcon(text)
      }

      createPeerMsgBubble(text, peerUsername);
      log(FUNCTION_TAG, "Recieved data from " + peerUsername);
      setTyping(false);
      break;
    case "img":
      if (recImages) {
        createPeerImgBubble(
          data.replace(newUserId + ":", "").replace(dataType + "/", ""),
          peerUsername
        );
      }
      setTyping(false);
      break;
    case "name":
      setPeerUsername(
        data.replace(newUserId + ":", "").replace(dataType + "/", "")
      );
      break;

    case "typing":
      setTyping(true);
      if (getTypingIndicatorStatus()) {
        typingMsg.innerHTML = peerUsername + " is typing...";
      } else {
        typingMsg.innerHTML = "";
      }
      break;

    case "notyping":
      setTyping(false);
      typingMsg.innerHTML = "";
      break;
    case "sysalert":
      createSysAlertBubble(
        data.replace(newUserId + ":", "").replace(dataType + "/", "")
      );
  }
}
function messageBoxEventHandler(key) {
  if (key.keyCode == 13) {
    setTyping(false);
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
