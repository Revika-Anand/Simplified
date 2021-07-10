/* In this server.js file, we will configure our server, our socket.io library 
and set up our room for video conferencing. */ 

/*Setting express server*/
const express = require('express');  //storing express framework in a constant named express
const app = express();  //initializing express framework and saving it in constant app
const server = require('http').Server(app);  //creates a server to be used with socket.io
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
});  //server initialization

//combining peerjs and express
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/'
});

app.use("/peerjs", peerServer);
const {v4 : uuidV4} = require('uuid');  //connects uuid (for generation of random room id)

app.set('view engine', 'ejs');  //setting embedded javaScript as the template engine
app.use(express.static('public'));  //serves public folder as static to the server

app.get('/', (req, res) => {
    res.redirect(`/dashboard.html`)
})

//creates a new room with a random id and direct the user to it
app.get('/new_room', (req, res) => {
    res.redirect(`/${uuidV4()}`)
})

//adds the room id to the url
app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room})
})

//works anytime somenone connects to the call
io.on('connection', (socket) => {
    //called when join_room event is emitted
    socket.on('join_room', (roomId, userId, userName) => {
        socket.join(roomId)
        //sends a message to the users already in the room informing them that
        //a new user has connected
        socket.broadcast.to(roomId).emit('user_connected', userId)
        //sends a message to the users informing them that
        //a user has disconnected
        socket.on('disconnect', () => {
            socket.broadcast.to(roomId).emit('user_disconnected', userId)
        })
        //for messaging
        socket.on("message", (message) => {
            io.to(roomId).emit("createMessage", message, userName);
        });
    })
})

server.listen(process.env.PORT || 3030, () => {
    console.log("listening");
});  //starts the server on port 3000
