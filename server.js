const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');
// Chemin GET
const path = require('path');
app.use(express.static(path.join(__dirname, "public")));


const botName = 'ChatBot';

// Partie connexion client
io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        // Message d'entrée dans le chat
        socket.emit('message', formatMessage(botName, 'Bienvenue sur le chat'));

        // // Message quand un utilisateur se connecte
        // socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} a rejoint le chat`));

        // Envoi des infos de la room et des users
        io.to(user.room).emit('roomUsers', {
            room : user.room,
            users: getRoomUsers(user.room)
        });
    });

    // Retour chatMessage
    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message', formatMessage(user.username, msg)
        );
    });
    

    // Enlever le statut connecté quandun utilisateur quitte le chat 
    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        // // Message quand un utilisateur se déconnecte (io.emit pour envoyer le message a tous les utilisateurs)
        // if (user){
        //     io.to(user.room).emit('message', formatMessage(botName, `${user.username} a quitté le chat`)
        //     );
        //     // Envoi des infos de la room et des users
        //     io.to(user.room).emit('roomUsers', {
        //         room : user.room,
        //         users: getRoomUsers(user.room)
        //     });
        // }
    });

}); 

const port = process.env.PORT || 5501;
http.listen(port, () => {
  console.log(`Socket.IO server running at http://127.0.0.1:${port}/`);
});
