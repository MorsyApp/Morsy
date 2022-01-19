
//creates an user message bubble with an image from the data url specified 
function createUsrImg(dataUrl, usrId){

    //create html elements
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgImg = document.createElement("img");
    var usrName = document.createElement("a");

    msgContainer.className += ("msg-container");
    usrMsg.className += ("usr-msg");

    msgImg.src = dataUrl;
    usrName.innerHTML = usrId;

    usrMsg.appendChild(msgImg);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}

//creates a peer message bubble with an image from the data url specified 
function createPeerImg(dataUrl, usrId){

    // create html elements
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgImg = document.createElement("img");
    var usrName = document.createElement("a");

    msgContainer.className += ("msg-container");
    usrMsg.className += ("peer-msg");

    msgImg.src = dataUrl;
    usrName.innerHTML = usrId;

    usrMsg.appendChild(msgImg);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();
}

//creates user message bubble 
function createUsrMsg(msg, usrId){
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgTxt = document.createElement("p");
    var usrName = document.createElement("a");

    msgContainer.className += ("msg-container");
    usrMsg.className += ("usr-msg");

    msgTxt.innerHTML = msg;
    usrName.innerHTML = usrId;

    usrMsg.appendChild(msgTxt);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();

}

//creates peer message bubble
function createPeerMsg(msg, usrId){
    var msgContainer = document.createElement("div");
    var usrMsg = document.createElement("div");
    var msgTxt = document.createElement("p");
    var usrName = document.createElement("a");

    msgContainer.className += ("msg-container");
    usrMsg.className += ("peer-msg");

    msgTxt.innerHTML = msg;
    usrName.innerHTML = usrId;

    usrMsg.appendChild(msgTxt);
    usrMsg.appendChild(usrName);
    msgContainer.appendChild(usrMsg);
    messageContainer.appendChild(msgContainer);
    msgContainer.scrollIntoView();

}


//sends the connection successful message
function connSuccess(){
    conn.send(userId + ":" + "text/"  + "Connection Successful")
}

//sends the connetent of the message box and clears it
function Send(){
    if(messageBox.value != ""){ 
        console.log(messageBox.value);
        
        if (conn) {
            if (userIdToSend == userId) {
                conn.send(userIdToSend + ":" + "text/" + messageBox.value);
                createUsrMsg(messageBox.value, "Me");
            }
            

        } 
        else {
            console.log("Connection Error");
            console.log(conn);
        }
        
    }
    messageBox.value = "";
}

//sends the dataurl for images
function SendFile(dataUrl){

    if (conn) {
        try {
            conn.send(userId+":"+"img/"+dataUrl);
            createUsrImg(dataUrl,"Me");
            
        } catch (error) {
            console.log(error.message);
        }

    }
}

function renameSelf(nameToChange) {
    setTimeout(()=>{conn.send(userId + ":" + "changenamereq/" + nameToChange)}, 500);
    console.log("q");
}
function renamePeer() {
    return;
}


//function to check for any commands in the passed msg param
function checkForCommands(msg) {
    if (msg.startsWith("/")) {
        
        let cmd = msg.replace("/", "");

        if (cmd == "givealias") {
            return cmd;
        }

        return cmd;
    }
    
    return "";
}
function onUserConnected() {
    console.log(userId + " Joined lol ");
    connections.push(userId);
    try {
        conn = peer.connect(connections[0]);
        createPeerMsg("Connection Successful", connections[0]);
        setTimeout(connSuccess,500);
    } catch (error) {
        console.log(error.message);
    }
}
function processData() {
    processedData = data.substring(0, data.indexOf("/"))
    newUserId = processedData.substring(0, processedData.indexOf(":"))
    dataType = processedData.replace(newUserId + ":","")

    if (!userIdToRecieve) { // if undefined ...
        userIdToRecieve = newUserId; // set uid to default uid
    }


    conn = peer.connect(newUserId) // connect to the peer via the default name
    if(dataType == "text"){
        

        let msgToRecieve = data.replace(newUserId + ":","").replace(dataType + "/",""); // message recieved    
        createPeerMsg(msgToRecieve,useridToRecieve); // create msg bubble with msg recieved
    }

    else if(dataType == "img"){

        let imgToSend = data.replace(newUserId + ":","").replace(dataType + "/","");



        createPeerImg(imgToSend,userIdToRecieve);
    }
    else if(dataType == "changenamereq") {
        console.log("recieved changename request");
    }
}
function onFileInp() {
    const reader = new FileReader();
    reader.readAsDataURL(fileInp.files[0]);
    reader.addEventListener("load", ()=>{

        SendFile(reader.result)
        fileInp.value = "";
        
    })

}