///vars
const socket = io("/")
const sendBtn = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");
const messageContainer = document.querySelector(".message-container");
const fileBtn = document.querySelector(".file-btn");
const fileInp = document.querySelector(".file-input");
const peer = new Peer(undefined, {
    host: '127.0.0.1', // change to 172.104.205.29 to make morsy.cc work
    port: '3001'
})

//empty variables
var userId = undefined;
var connections = [];
var conn = undefined;
let userIdToRecieve = undefined;
let userIdToSend = undefined;


let aliasNamesStr = "FactitiveSquid19 ComedogenicPotato420 Seriatim69 AtpatruusComb17 ScutigerousPiano39 FeticCuisse10 Cuissepanx180 SociableGlue120 Dosiology_ QuangocracyBop4 ChondromPanary93 Panarygohst16 FurgesOuzel11 Ouzelmachr05 Kleenebok02 LilbabKnosp09 Knospderblt08 Galeated007 Bombycine121 TrautoniumPaperist81 Fuscouscous182 Achaenocarp245 LickingJubate109 Jubatetburn638 Homuncule125 PindusWheal999 Wheallan006 PericulousSeven197 LogocraticMouse94 WillthebDelta111 Deltalar51 Munting222 BoemMurage675 Muragekinn12345 Carnifex Sententia Yogibogeybox ShikiAnear14 Anearver26 Hereticide Illeist42 Themas6Murrey Murreyrecy_ Chaplet The_azTrema Tremameshh12 SleetBraird Brairddev246 Theometry37 EremologyYoyo19 Mane2Sorrel Sorrelne3_14 Orchidomania Mistetch KimagCapric Capricster1701 Doloriferous SaneinYen Yenlarch Agowilt Incentivize RockerdAppui Appuide27 Enallage";
let aliasNames = aliasNamesStr.split(" ");
const randomIndex = Math.floor(Math.random() * aliasNames.length);

let alias = undefined;
let givenAlias = false;

peer.on("open", id =>{
    userId = id;
    socket.emit("join-room", ROOM_ID, id);
})

//socket user management
socket.on("user-connected", userId => {
    onUserConnected();
})


sendBtn.addEventListener("click", ()=>{
    Send();
})


//peerjs managing connnections and data sent from other users
peer.on('connection', function(connection) {
    connection.on('data', function(data){
        processData();
        
    });
  });


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
    onFileInp();

})
