/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

const sendBtn = document.querySelector(".send-container");
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
const rootElmnt = document.querySelector(":root");
<<<<<<< HEAD
const trippleDotMenu = document.querySelector(".tripple-dot-menu");
const menuBtnContainer = document.querySelector(".menu-btn-container");
=======

>>>>>>> parent of 69d5e6b (migrated to typescript)
inviteLinkBox.value = window.location.href;

let colorMode = null;
<<<<<<< HEAD
let menuBtnContainerHover;
=======

>>>>>>> parent of 69d5e6b (migrated to typescript)
sendBtn.addEventListener("click", () => {
  Send();
});

messageBox.addEventListener("keydown", (e) => {
  messageBoxEventHandler(e);
});

//detects when the file button is clicked
fileBtn.addEventListener("click", () => {
  fileInp.click();
});

//detects when the user selected a file and sends it
fileInp.addEventListener("change", () => {
  const reader = new FileReader();
  reader.readAsDataURL(fileInp.files[0]);
  reader.addEventListener("load", () => {
    SendFile(reader.result);
    fileInp.value = "";
  });
});

editNameBtn.addEventListener("click", () => {
  if (!editingName) {
    editNameBtn.innerHTML = "Save";
    usernameInp.disabled = false;
    usernameInp.focus();
    editingName = true;
  } else {
    editNameBtn.innerHTML = "Edit";
    usernameInp.disabled = true;
    SendUsrName(removeTags(usernameInp.value));
    createSysAlert("Name changed successfully!")
    editingName = false;
  }
});

copyInviteBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(inviteLinkBox.value);
});

inviteCloseBtn.addEventListener("click", () => {
  invitePopup.style.display = "none";
});

inviteBtn.addEventListener("click", () => {
  FUNCTION_TAG = "[EVENT_LISTENER] inviteBtn";
  invitePopup.style.display = "block";
  log(FUNCTION_TAG, "block");
});
<<<<<<< HEAD
trippleDotMenu.addEventListener("mouseenter", () => {
    menuBtnContainer.style.display = "flex";
});
menuBtnContainer.addEventListener("mouseenter", () => {
    menuBtnContainer.style.display = "flex";
    menuBtnContainerHover = true;
});
menuBtnContainer.addEventListener("mouseleave", () => {
    menuBtnContainer.style.display = "none";
    menuBtnContainerHover = false;
});
trippleDotMenu.addEventListener("mouseleave", () => {
    setTimeout(() => {
        if (!menuBtnContainerHover) {
            menuBtnContainer.style.display = "none";
        }
    }, 300);
});
function setColors() {
    if (!colorMode) {
        colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
    }
    if (colorMode == "light") {
        rootElmnt.style.setProperty("--menu-bar-color", "#e6e6e6");
        rootElmnt.style.setProperty("--bg-color", "#c6c6c6");
        rootElmnt.style.setProperty("--secondary-color", "#a8a8a8");
        rootElmnt.style.setProperty("--text-color", "#000000");
    }
=======

function setColors(){
  if(!colorMode){
      colorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
  }

  if(colorMode == "light"){
    rootElmnt.style.setProperty("--menu-bar-color", "#e6e6e6");
    rootElmnt.style.setProperty("--bg-color", "#c6c6c6");
    rootElmnt.style.setProperty("--secondary-color", "#a8a8a8");
    rootElmnt.style.setProperty("--text-color", "#000000");
  }
>>>>>>> parent of 69d5e6b (migrated to typescript)
}


window.addEventListener("mousedown", (e) => {
  if (!invitePopup.contains(e.target) && invitePopup.style.display == "block") {
    invitePopup.style.display = "none";
  }
});
