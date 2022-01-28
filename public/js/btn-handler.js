/*
Copyright 2021,2022 Carl Marino and Itay Godasevich


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/
import * as btn_msgmod from "./msg-handler.js"; // button file, message module
import * as btn_scrmod from "./script.js";
import * as btn_logmod from "./log-utils.js";
export const sendBtn = document.querySelector(".send-container");
export const messageBox = document.querySelector(".message-box");
export const messageContainer = document.querySelector(".message-container");
export const fileBtn = document.querySelector(".file-btn");
export const fileInp = document.querySelector(".file-input");
export const usernameInp = document.querySelector(".username-inp");
export const editNameBtn = document.querySelector(".edit-name-btn");
export const inviteLinkBox = document.querySelector(".invite-link-box");
export const copyInviteBtn = document.querySelector(".copy-invite-btn");
export const inviteCloseBtn = document.querySelector(".invite-close-btn");
export const invitePopup = document.querySelector(".invite-popup");
export const inviteBtn = document.querySelector(".invite-btn");
export const typingMsg = document.querySelector(".is-typing-msg");
export const rootElmnt = document.querySelector(":root");
export const trippleDotMenu = document.querySelector(".tripple-dot-menu");
export const menuBtnContainer = document.querySelector(".menu-btn-container");
if (inviteLinkBox)
    inviteLinkBox.value = window.location.href;
export let colorMode = "";
export let menuBtnContainerHover;
if (sendBtn) {
    sendBtn.addEventListener("click", () => {
        btn_msgmod.send();
    });
}
if (messageBox) {
    messageBox.addEventListener("keydown", (e) => {
        btn_msgmod.messageBoxEventHandler(e);
    });
}
//detects when the file button is clicked
if (fileBtn && fileInp) {
    fileBtn.addEventListener("click", () => {
        fileInp.click();
    });
}
if (fileBtn && fileInp) {
    //detects when the user selected a file and sends it
    fileInp.addEventListener("change", () => {
        const reader = new FileReader();
        reader.readAsDataURL(fileInp.files[0]);
        reader.addEventListener("load", () => {
            btn_msgmod.sendFile(reader.result.toString());
            fileInp.value = "";
        });
    });
}
if (editNameBtn) {
    editNameBtn.addEventListener("click", () => {
        if (!btn_scrmod.editingName) {
            if (editNameBtn)
                editNameBtn.innerHTML = "Save";
            if (usernameInp)
                usernameInp.disabled = false;
            if (usernameInp)
                usernameInp.focus();
            btn_scrmod.setIsEditingName(true);
        }
        else {
            if (editNameBtn)
                editNameBtn.innerHTML = "Edit";
            if (usernameInp)
                usernameInp.disabled = true;
            if (usernameInp)
                btn_msgmod.sendUserName(btn_logmod.removeTags(usernameInp.value));
            btn_msgmod.createSysAlertBubble("Name changed successfully!");
            btn_scrmod.setIsEditingName(false);
        }
    });
}
if (copyInviteBtn && inviteLinkBox) {
    copyInviteBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(inviteLinkBox.value);
    });
}
if (inviteCloseBtn && invitePopup) {
    inviteCloseBtn.addEventListener("click", () => {
        invitePopup.style.display = "none";
    });
}
if (inviteBtn) {
    inviteBtn.addEventListener("click", () => {
        let local_function_tag = "[EVENT_LISTENER] inviteBtn";
        if (invitePopup) {
            invitePopup.style.display = "block";
            btn_logmod.log(local_function_tag, "block");
        }
    });
}
if (trippleDotMenu && menuBtnContainer) {
    trippleDotMenu.addEventListener("mouseenter", () => {
        menuBtnContainer.style.display = "flex";
    });
}
if (menuBtnContainer) {
    menuBtnContainer.addEventListener("mouseenter", () => {
        menuBtnContainer.style.display = "flex";
        menuBtnContainerHover = true;
    });
}
if (menuBtnContainer) {
    menuBtnContainer.addEventListener("mouseleave", () => {
        menuBtnContainer.style.display = "none";
        menuBtnContainerHover = false;
    });
}
if (trippleDotMenu) {
    trippleDotMenu.addEventListener("mouseleave", () => {
        setTimeout(() => {
            if (menuBtnContainer && !menuBtnContainerHover) {
                menuBtnContainer.style.display = "none";
            }
        }, 300);
    });
}
function setColors() {
    if (!colorMode) {
        colorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    }
    if (colorMode == "light") {
        rootElmnt.style.setProperty("--menu-bar-color", "#e6e6e6");
        rootElmnt.style.setProperty("--bg-color", "#c6c6c6");
        rootElmnt.style.setProperty("--secondary-color", "#a8a8a8");
        rootElmnt.style.setProperty("--text-color", "#000000");
    }
}
window.addEventListener("mousedown", (e) => {
    if (invitePopup &&
        !invitePopup.contains(e.target) &&
        invitePopup.style.display == "block") {
        invitePopup.style.display = "none";
    }
});
