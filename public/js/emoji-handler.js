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