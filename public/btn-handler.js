const sendBtn = document.querySelector(".send-btn");
const messageBox = document.querySelector(".message-box");
const messageContainer = document.querySelector(".message-container");
const fileBtn = document.querySelector(".file-btn");
const fileInp = document.querySelector(".file-input");
const usernameInp = document.querySelector(".username-inp");
const editNameBtn = document.querySelector(".edit-name-btn");
const inviteLinkBox = document.querySelector(".invite-link-box");
const copyInviteBtn = document.querySelector(".copy-invite-btn");
const inviteCloseBtn = document.querySelector(".invite-close-btn");
const invitePopup = document.querySelector(".invite-popup");
const inviteBtn = document.querySelector(".invite-btn");
const typingMsg = document.querySelector(".is-typing-msg");


inviteLinkBox.value= window.location.href;

sendBtn.addEventListener("click", ()=>{
    Send();
})

messageBox.addEventListener("keydown", (e)=>{
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

copyInviteBtn.addEventListener("click", ()=>{
    navigator.clipboard.writeText(inviteLinkBox.value);
})

inviteCloseBtn.addEventListener("click",()=>{
    invitePopup.style.display = "none";
})

inviteBtn.addEventListener("click",()=>{
    invitePopup.style.display = "block";
    console.log("block")
})

window.addEventListener("mousedown", (e)=>{
    if(!invitePopup.contains(e.target) && invitePopup.style.display == "block"){
        invitePopup.style.display = "none";
    }
})
