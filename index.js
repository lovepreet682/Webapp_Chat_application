const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

console.log("socket IO")
const users={};
io.on('connection',socket => {
    socket.on('new-user-joined', username => {
        users[socket.id]=username;
        socket.broadcast.emit('user-joined', username)
    })
    
    //send the message
    socket.on('send', message => {
        socket.broadcast.emit('receive', {message: message, username:users[socket.id]})
    })

    //exist the chat
    socket.on('disconnect', message=>{
        socket.broadcast.emit('left-chat', users[socket.id]);
        delete users[socket.id];
    })
})