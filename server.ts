/*
Copyright 2021,2022 Carl Marino and Itay Godasevich 


This file is part of Morsy.

Morsy is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or any later version.

Morsy is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with Morsy. If not, see <https://www.gnu.org/licenses/>.
*/

//defines libs

import {nanoid} from "nanoid";
import express, {NextFunction, Request, Response} from "express";
import * as http from "http"
import * as socketio from "socket.io"

const app = express();
const server: http.Server = http.createServer(app)
const io: socketio.Server = new socketio.Server()
io.attach(server)
// const { v4: uuidV4 } = require("uuid");

//sets up the server to render ejs
app.set("view engine", "ejs");

//sets the static site folder as public
app.use(express.static("public"));

//makes /create/ redirect to a new room
app.get("/create/", (req: Request, res: Response) => {
  res.redirect(`/${nanoid(12)}`);
});

//makes root path render the home.ejs file
app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

//makes the rooms render room.ejs and sets up the room id as param
app.get("/:room", (req: Request, res: Response) => {
  res.render("room", { roomId: req.params.room });
});

// run on 404 and shows 404 page
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.status(404).render("404");
});

//makes user connect to the room when loading the site
io.on("connection", (socket: socketio.Socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
  });
});

//starts the server and set the port to 3000
server.listen(3000);