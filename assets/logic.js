const socket = io();
let mensajes = [];

function sendMessage() {
    let usuario = document.querySelector('#usuario').value;
    let texto = document.querySelector('#textMessage').value;
    socket.emit('saludandome', {
        usuario,
        texto
    });
    document.querySelector('#textMessage').value = '';
}

socket.on('saludandome', (texto) => {
    messageLine(texto);
})

function dibujarDiv(arr) {
    let contenido = "";
    arr.forEach(element => {
        contenido += `<p><span style="color: blue;"><b>${element.usuario} : </b></span> ${element.texto}</p>`;
    });
    document.querySelector('#timeLine').innerHTML = contenido;
}

function messageLine(texto) {
    mensajes.push(texto);
    dibujarDiv(mensajes);
}

function pulsarFunction(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
