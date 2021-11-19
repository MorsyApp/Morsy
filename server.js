//defines libs
const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const { v4: uuidV4 } = require("uuid");

//sets up the server to render ejs
app.set("view engine", "ejs");

//sets the static site folder as public
app.use(express.static('public'));

//makes /create/ redirect to a new room
app.get('/create/', (req,res) => {
    res.redirect(`/${uuidV4()}`)
})

//makes root path render the home.ejs file
app.get('/', (req,res) =>{
    res.render('home')
})

//makes the rooms render room.ejs and sets up the room id as param
app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
})

//makes user connect to the room when loading the site 
io.on('connection', socket => {
    socket.on("join-room", (roomId, userId) => {
        socket.join(roomId)
        socket.to(roomId).emit('user-connected', userId)
    })
})

//starts the server and set the port to 3000
server.listen(3000)