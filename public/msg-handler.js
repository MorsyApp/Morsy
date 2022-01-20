
function removeTags(str) {
    if ((str===null) || (str===''))
        return false;
    else
        str = str.toString();
          
    // Regular expression to identify HTML tags in 
    // the input string. Replacing the identified 
    // HTML tag with a null string.
    return str.replace( /(<([^>]+)>)/ig, '');
}

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
    usrName.innerHTML = "Me";

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
    usrName.innerHTML = peerUsername;

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
    usrName.innerHTML = "Me";

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
    usrName.innerHTML = peerUsername;

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
        console.log(userId);
        conn.send(userId + ":" + "text/" + messageBox.value)
        createUsrMsg(messageBox.value, userId)
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

function SendUsrName(newName) {
    if (conn) {
        try {
            conn.send(userId+":"+"name/"+newName);
            console.log("sent name")
            
        } catch (error) {
            console.log(error.message);
        }

    }
}

//function to check for any commands in the passed msg param
function checkForCommands(msg) {
    if (msg.startsWith("/")) {
        
        let cmd = msg.replace("/", "");

        if (cmd == "...") {
            return cmd;
        }
        //.. add more cmds
        //ffffffffffffff

        return cmd;
    }
    
    return "";
}
function onUserConnected() {
    console.log(userId + " Joined lol ");
    connections.push(userId);
    try {
        conn = peer.connect(connections[0]);
        createPeerMsg("Connection Successful", peerUsername);
        setTimeout(connSuccess,500);
    } catch (error) {
        console.log(error.message);
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
function processData(data) {

    let processedData = data.substring(0, data.indexOf("/"))
    let newUserId = processedData.substring(0, processedData.indexOf(":"))
    let dataType = processedData.replace(newUserId + ":","")
    conn = peer.connect(newUserId) // connect to the peer via the default name

    switch (dataType) {
        case "text":
            createPeerMsg(data.replace(newUserId + ":","").replace(dataType + "/",""),peerUsername);
            console.log("Recieved data from " + peerUsername);
            typing = false;
            break;
        case "img":
            createPeerImg(data.replace(newUserId + ":","").replace(dataType + "/",""),peerUsername);
            typing = false;
            break;
        case "name":
            peerUsername = data.replace(newUserId + ":","").replace(dataType + "/","");
            break;

        case "typing":
            
            
            break;
            
        
            

    }
}
function messageBoxEventHandler(key) {
    if (key.keyCode == 13) {
        Send();
    }
    if (key.keyCode != 13) {
        conn.send(userId + ":" + "typing/");
        typing = true;
        setTimeout(1000, () => {
            if (messageBox.value == "") {
                typing = false;
            }
        });
    }

}