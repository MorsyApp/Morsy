///vars

const socket = io("/")
const sendBtn = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");
const messageContainer = document.querySelector(".message-container");
const fileBtn = document.querySelector(".file-btn");
const fileInp = document.querySelector(".file-input");
const peer = new Peer(undefined, {
    host: '/',
    port: '3001'
    config: { iceServers: [{url:'stun:stunserver.org'}, {url: 'turn:numb.viagenie.ca',credential: 'muazkh', username: 'webrtc@live.com'},] },
})


//empty variables
var userId = undefined;
var connections = []
var conn = undefined;

peer.on("open", id =>{
    userId = id;
    socket.emit("join-room", ROOM_ID, id)
})

//socket user management
socket.on("user-connected", userId => {
    console.log(userId + " Joined lol ")
    connections.push(userId)
    conn = peer.connect(connections[0])
    createPeerMsg("Connection Successful", connections[0])
    setTimeout(connSuccess,500);
})


sendBtn.addEventListener("click", ()=>{
    Send();
})


//peerjs managing connnections and data sent from other users
peer.on('connection', function(connection) {
    connection.on('data', function(data){
        processedData = data.substring(0, data.indexOf("/"))
        newUserId = processedData.substring(0, processedData.indexOf(":"))
        dataType = processedData.replace(newUserId + ":","")

        conn = peer.connect(newUserId)
        if(dataType == "text"){
            createPeerMsg(data.replace(newUserId + ":","").replace(dataType + "/",""),newUserId);
        }

        else if(dataType == "img"){
            createPeerImg(data.replace(newUserId + ":","").replace(dataType + "/",""),newUserId);
        }
        
    });
  });

//creates an user message bubble with an image from the data url specified 
function createUsrImg(dataUrl, usrId){
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
    conn.send(userId + ":" + "text/"  + "Connection Successful!")
}

//sends the connetent of the message box and clears it
function Send(){
    if(messageBox.value != ""){    
        conn.send(userId + ":" + "text/" + messageBox.value)
        createUsrMsg(messageBox.value, userId)
    }
    messageBox.value = "";
}

//sends the dataurl for images
function SendFile(dataUrl){
    conn.send(userId+":"+"img/"+dataUrl)
    createUsrImg(dataUrl,userId)
}

//detects when enter is pressed while input is selected
messageBox.addEventListener("keyup", (e)=>{
    if(e.keyCode==13){
        Send();
    }
})

//detects when the file button is clicked
fileBtn.addEventListener("click", ()=>{
    fileInp.click();
})

//detects when the user selected a file and sends it
fileInp.addEventListener("change", ()=>{
    const reader = new FileReader();
    reader.readAsDataURL(fileInp.files[0]);
    reader.addEventListener("load", ()=>{

        SendFile(reader.result)
        fileInp.value = "";
        
    })


})
