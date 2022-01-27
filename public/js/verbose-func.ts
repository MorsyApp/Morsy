/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

// all the misc functions needed. only for the purpose of cleaning up the code

function removeTags(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
}

//function to check for any commands in the passed msg param
function checkForCommands(msg) {
  if (msg.startsWith("/")) {
    let cmd = msg.replace("/", "");

    if (cmd == "...") {
      return cmd;
    }
    //.. add more cmds
    //ffffffffffffff

    return cmd;
  }

  return "";
}
// checks if a value is equal to ""
const checkForEmpty = (value) => {
  return value == "" ? true : false;
};

// logging function. Console logs the message but with the function from which the message is originated.
const log = (FUNCTION_TAG, msg) => {
  console.log(`[${FUNCTION_TAG}] ${msg}`);
};
