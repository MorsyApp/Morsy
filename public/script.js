///vars
const socket = io("/")
const sendBtn = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");
const messageContainer = document.querySelector(".message-container");
const fileBtn = document.querySelector(".file-btn");
const fileInp = document.querySelector(".file-input");
const usernameInp = document.querySelector(".username-inp");
const editNameBtn = document.querySelector(".edit-name-btn");
const peer = new Peer(undefined, {
    host: '127.0.0.1',
    port: '3001'
})






//empty variables

let peerUsername = "5AMUE1_M0R5E";
let editingName = false;
var userId = undefined;
var connections = [];
var conn = undefined;
let typing = false;
let firstTime = true;



let givenAlias = false;

peer.on("open", id =>{
    userId = id;
    socket.emit("join-room", ROOM_ID, id)
})

//socket user management
socket.on("user-connected", userId => {
    console.log(userId + " Joined lol ")
    connections.push(userId)

    conn = peer.connect(connections[0])
    createPeerMsg("Connection Successful", "You are " + peerUsername);
    setTimeout(connSuccess,500);
})


sendBtn.addEventListener("click", ()=>{
    Send();
})


//peerjs managing connnections and data sent from other users
peer.on('connection', function(connection) {
    connection.on('data', function(data){
        processData(data);
    });
  });



//detects when enter is pressed while input is selected
messageBox.addEventListener("keyup", (e)=>{
    messageBoxEventHandler(e);

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

editNameBtn.addEventListener("click", () =>{
    if(!editingName){
        editNameBtn.innerHTML = "Save";
        usernameInp.disabled = false;
        usernameInp.focus();
        editingName = true;
    }
    else{
        editNameBtn.innerHTML = "Edit";
        usernameInp.disabled = true;
        SendUsrName(removeTags(usernameInp.value));
        editingName = false;
    }
})


