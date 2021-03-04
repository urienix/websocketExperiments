const path = require('path');
const express = require('express');
const app = express();

const socketIO = require('socket.io');

app.use(express.static(path.join(__dirname, 'assets')));

const server = app.listen(3500, () => {
    console.log(`Server started on port ${3500}`);
});


const io = socketIO(server);

// web sockets

io.on('connection', (socket) => {
    console.log('Conectado', socket.id);

    socket.on('saludandome', (data) => {
        console.log(data);
        io.sockets.emit('saludandome', data);
    })
})



//end web sockets
