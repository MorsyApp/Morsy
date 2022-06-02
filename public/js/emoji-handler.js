/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/
function textToEmojiIcon(text) {
    switch(text) {
        case ":)": 
        case ";happy":
            return "😀"
        case ":(": 
        case ";sad":
            return "🙁"
            
        case "xD": 
        case "xd":
        case";xd": 
        case";xD": 
        case"XD": 
        case"Xd": 
        case";XD": 
        case";Xd":
            return "😆"
        case "<3":
            return "😸"
        case ";demon":
            return "😈"
        case ";monke":
            return "🙈"
        case ";thumbsup":
            return "👍"
        case ";thumbsdown":
            return "👎"
        case ";crying":
            return "😭"
        case ";fuming":
            return "😤"
        case ";shocked":
            return "😱"
        case ";angry":
            return "😡"
        case ";vomit":
            return "🤢"
        case ";poop":
            return "💩"
        case ";clown":
            return "💩"
        case emojiHelpMessage:
            return "Possible Emojis:<br />;demon<br />;xd/xD/xd/Xd/XD<br /><3<br />;happy/:)<br />;thumbsup<br />;thumbsdown<br />;crying<br />;fuming<br />;shocked<br />;angry<br />;vomit<br />;poop<br />;clown"
        
        default:
            return "No such emoji exists.";
    }
}