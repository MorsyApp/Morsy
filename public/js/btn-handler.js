/*
Copyright 2021,2022 Carl Marino and Itay Godasevich


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

// html references

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
const tripleDotMenu = document.querySelector(".triple-dot-menu");
const menuBtnContainer = document.querySelector(".menu-btn-container");
const settingsContainer = document.querySelector(".settings-container");
const settingsCloseBtn = document.querySelector(".settings-close-btn");
const settingsBtn = document.querySelector(".settings-btn");
const typingIndicatorOn = document.querySelector(".typing-indicator-on");
const typingIndicatorOff = document.querySelector(".typing-indicator-off");
const imagesOn = document.querySelector(".images-on");
const imagesOff = document.querySelector(".images-off");
const colorOptions = document.querySelectorAll(".colormode svg");
let menuBtnContainerHover = false;



inviteLinkBox.value = window.location.href;

let colorMode = "default";

function updateButtonColours() {
  if (recImages) {
    imagesOn.style.backgroundColor = "var(--secondary-color)";
    imagesOff.style.backgroundColor = "var(--menu-bar-color)";
  } else {
    imagesOff.style.backgroundColor = "var(--secondary-color)";
    imagesOn.style.backgroundColor = "var(--menu-bar-color)";
  }
  if (typingIndicator) {
    typingIndicatorOff.style.backgroundColor = "var(--menu-bar-color)";
    typingIndicatorOn.style.backgroundColor = "var(--secondary-color)";
  } else {
    typingIndicatorOn.style.backgroundColor = "var(--menu-bar-color)";
    typingIndicatorOff.style.backgroundColor = "var(--secondary-color)";
  }
}

imagesOn.addEventListener("click", () => {
  recImages = true;
  imagesOn.style.backgroundColor = "var(--secondary-color)";
  imagesOff.style.backgroundColor = "var(--menu-bar-color)";
  localStorage.setItem("recImages", "true");

  updateSettings();
});
imagesOff.addEventListener("click", () => {
  recImages = false;
  localStorage.setItem("recImages", "false");
  imagesOff.style.backgroundColor = "var(--secondary-color)";
  imagesOn.style.backgroundColor = "var(--menu-bar-color)";

  updateSettings();
});

typingIndicatorOn.addEventListener("click", () => {
  typingIndicatorOff.style.backgroundColor = "var(--menu-bar-color)";
  typingIndicatorOn.style.backgroundColor = "var(--secondary-color)";
  localStorage.setItem("showTyping", "true");

  sendTypingIndicatorReq(true);

  updateSettings();
});
typingIndicatorOff.addEventListener("click", () => {
  typingIndicatorOn.style.backgroundColor = "var(--menu-bar-color)";
  typingIndicatorOff.style.backgroundColor = "var(--secondary-color)";
  localStorage.setItem("showTyping", "false");
  sendTypingIndicatorReq(false);

  updateSettings();
});

sendBtn.addEventListener("click", () => {
  sendMsg();
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
    sendFile(reader.result);
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
    sendUsrNameReq(removeTags(usernameInp.value));
    localStorage.setItem("usrName", removeTags(usernameInp.value));
    createSysAlertBubble("Name changed successfully!");
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

colorOptions.forEach((option) => {
  option.addEventListener("click", () => {
    colorOptions.forEach((option) => {
      option.childNodes[3].style.fill = "none";
    });
    option.childNodes[3].style.fill = "var(--accent-color)";
    console.log(option.childNodes);
    colorMode = option.id;
    localStorage.setItem("colorMode", option.id);
    updateSettings();
    updateThemeColours();
  });
});

function updateThemeColours() {
  if (colorMode == "default") {
    colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  if (colorMode == "light") {
    rootElmnt.style.setProperty("--menu-bar-color", "#ffffff");
    rootElmnt.style.setProperty("--bg-color", "#ffffff");
    rootElmnt.style.setProperty("--secondary-color", "#E7E8F3");
    rootElmnt.style.setProperty("--text-color", "#000000");
    rootElmnt.style.setProperty("--shadow-color", "#BBC6ED00");
  } else {
    rootElmnt.style.setProperty("--menu-bar-color", "#171821");
    rootElmnt.style.setProperty("--bg-color", "#171821");
    rootElmnt.style.setProperty("--secondary-color", "#242530");
    rootElmnt.style.setProperty("--text-color", "#ffffff");
    rootElmnt.style.setProperty("--shadow-color", "#21233800");
  }
}


settingsBtn.addEventListener("click", () => {
  settingsContainer.style.display = "block";
});

settingsCloseBtn.addEventListener("mousedown", () => {
  settingsContainer.style.display = "none";
});

window.addEventListener("mousedown", (e) => {
  if (!invitePopup.contains(e.target) && invitePopup.style.display == "block") {
    invitePopup.style.display = "none";
  }
  if (
    !settingsContainer.contains(e.target) &&
    settingsContainer.style.display == "block"
  ) {
    settingsContainer.style.display = "none";
  }
});

let interval = setInterval(updateButtonColours, 10);

updateThemeColours();
