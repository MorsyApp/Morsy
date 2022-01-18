///vars
const socket = io("/")
const sendBtn = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");
const messageContainer = document.querySelector(".message-container");
const fileBtn = document.querySelector(".file-btn");
const fileInp = document.querySelector(".file-input");
const peer = new Peer(undefined, {
    host: 'http://172.104.205.29/',
    port: '3001'
})


//empty variables
var userId = undefined;
var connections = [];
var conn = undefined;


let aliasNamesStr = "FactitiveSquid19 ComedogenicPotato420 Seriatim69 AtpatruusComb17 ScutigerousPiano39 FeticCuisse10 Cuissepanx180 SociableGlue120 Dosiology_ QuangocracyBop4 ChondromPanary93 Panarygohst16 FurgesOuzel11 Ouzelmachr05 Kleenebok02 LilbabKnosp09 Knospderblt08 Galeated007 Bombycine121 TrautoniumPaperist81 Fuscouscous182 Achaenocarp245 LickingJubate109 Jubatetburn638 Homuncule125 PindusWheal999 Wheallan006 PericulousSeven197 LogocraticMouse94 WillthebDelta111 Deltalar51 Munting222 BoemMurage675 Muragekinn12345 Carnifex Sententia Yogibogeybox ShikiAnear14 Anearver26 Hereticide Illeist42 Themas6Murrey Murreyrecy_ Chaplet The_azTrema Tremameshh12 SleetBraird Brairddev246 Theometry37 EremologyYoyo19 Mane2Sorrel Sorrelne3_14 Orchidomania Mistetch KimagCapric Capricster1701 Doloriferous SaneinYen Yenlarch Agowilt Incentivize RockerdAppui Appuide27 Enallage";
let aliasNames = aliasNamesStr.split(" ");
const randomIndex = Math.floor(Math.random() * aliasNames.length);

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


        let userIdToSend = newUserId; // a variable that specifies what uid to use when recieving a msg


        conn = peer.connect(newUserId)
        if(dataType == "text"){
            

            let msgToRecieve = data.replace(newUserId + ":","").replace(dataType + "/","");
            
            if (givenAlias) { // check if an alias has been given
                userIdToSend = aliasNames[randomIndex]; // set the uid to send to one of the random aliases
            }
            
            createPeerMsg(msgToRecieve,userIdToSend); // create msg bubble with msg recieved
        }

        else if(dataType == "img"){

            let imgToSend = data.replace(newUserId + ":","").replace(dataType + "/","");

            if (givenAlias) { // same thing
                userIdToSend = aliasNames[randomIndex];
            }

            createPeerImg(imgToSend,userIdToSend);
        }
        
    });
  });

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
        
        if (checkForCommands(messageBox.value) == "givealias") { //checks for any givealias command in the message
            givenAlias = true; // if yes, record that the alias has been given
        }
        
        conn.send(userId + ":" + "text/" + messageBox.value);
        createUsrMsg(messageBox.value, "Me");
    }
    messageBox.value = "";
}

//sends the dataurl for images
function SendFile(dataUrl){
    conn.send(userId+":"+"img/"+dataUrl)
    createUsrImg(dataUrl,"Me")
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
