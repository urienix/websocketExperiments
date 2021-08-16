const path = require('path');
const express = require('express');
const app = express();

const socketIO = require('socket.io');

app.use(express.static(path.join(__dirname, 'assets')));

const server = app.listen(3500, () => {
    console.log(`Server started on port ${3500}`);
});

let clientsConnected = [];

const io = socketIO(server);

// web sockets

io.on('connection', (socket) => {
    console.log('Conectado:', socket.id);
    console.log('Usuario:', socket.handshake.query.usuario);

    let isConnected = false;
    clientsConnected.forEach(client => {
        if( client.user  === socket.handshake.query.usuario ){
            client.socket_id = socket.id;
            isConnected = true;
        }
    });
    if(!isConnected){
        clientsConnected.push({user: socket.handshake.query.usuario, socket_id: socket.id});
    }
    console.log(clientsConnected);

    
    socket.on('saludandome', (data) => {
        console.log(data);
        //io.sockets.emit('saludandome', data);
        let destiny = clientsConnected.find(client => client.user === data.destino);
        console.log(destiny);
        socket.to(destiny.socket_id).emit('saludandome', data);
    })
})



//end web sockets
