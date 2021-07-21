const path = require('path');
const http = require('http')
const express = require('express');
const socketIo = require('socket.io');
const formateMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeft, getUsersRoom } = require('./utils/users');

const app = express();

const server = http.createServer(app);
const io = socketIo(http);

app.use(express.static(path.join(__dirname, 'public')));
const botName = 'ChatCord Bot';

io.on('connection', socket => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room)
        socket.join(user.room)
        socket.emit('message', formateMessage(botName, 'welcome to the chat'));
        socket.broadcast.to(user.room).emit('message', formateMessage(botName, `${user.username} joined the chat`));
        //send all users in a room
        console.log(getUsersRoom(user.room));
        io.to(user.room).emit('roomUser', {
            room: user.room,
            users: getUsersRoom(user.room)
        });
    });
    // console.log('New connection :)');

    socket.on('chatMessage', msg => {
        const user = getCurrentUser();
        io.to(user.room).emit('message', formateMessage(user.username, msg))
    });
    socket.on('disconnect', () => {
        const user = userLeft(socket.id);

        if (user) {
            io.to(user.room).emit('message', formateMessage(botName, `${user.username} left `));
            //send updated users in a room
           
            io.to(user.room).emit('roomUser', {
                room: user.room,
                users: getUsersRoom(user.room)
            });
        };

    });

});

let PORT = 3000 || process.env.PORT;
io.listen(server);
server.listen(PORT, () => {
    console.log(`application running on port ${PORT}`)
});