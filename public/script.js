const socket = io("/")
const sendBtn = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");
const messageContainer = document.querySelector(".message-container");
const peer = new Peer(undefined, {
    host: '/',
    port: '3001'
})

var userId = undefined;
var connections = []
var conn = undefined;

peer.on("open", id =>{
    userId = id;
    socket.emit("join-room", ROOM_ID, id)
})


socket.on("user-connected", userId => {
    console.log(userId + " Joined")
    connections.push(userId)
    conn = peer.connect(connections[0])
    createPeerMsg("Connection Successful", connections[0])
    setTimeout(connSuccess,500);
})


sendBtn.addEventListener("click", ()=>{
    if(messageBox.value != ""){    
        conn.send(userId + ":" + "text/" + messageBox.value)
        createUsrMsg(messageBox.value, userId)
    }
    messageBox.value = "";
})

peer.on('connection', function(connection) {
    connection.on('data', function(data){
        processedData = data.substring(0, data.indexOf("/"))
        newUserId = processedData.substring(0, processedData.indexOf(":"))
        dataType = processedData.replace(newUserId + ":","")

        conn = peer.connect(newUserId)
        createPeerMsg(data.replace(newUserId + ":","").replace(dataType + "/",""),newUserId);
    });
  });


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

function connSuccess(){
    conn.send(userId + ":" + "text/"  + "Connection Successful")
}