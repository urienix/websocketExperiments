let usuario = "";
let socket;

let socketConnection = () => {
    usuario = document.querySelector('#usuario').value;
    socket = io.connect('', {query: `usuario=${usuario}`});
    socket.on('saludandome', (texto) => {
        messageLine(texto);
    })
}

let mensajes = [];

function sendMessage() {
    let texto = document.querySelector('#textMessage').value;
    let destino = document.querySelector('#destiny').value;
    socket.emit('saludandome', {
        usuario,
        destino,
        texto
    });
    messageLine(texto);
    document.querySelector('#textMessage').value = '';
}

function dibujarDiv(arr) {
    let contenido = "";
    arr.forEach(element => {
        contenido += `<p><span style="color: blue;"><b>${element.usuario} : </b></span> ${element.texto}</p>`;
    });
    document.querySelector('#timeLine').innerHTML = contenido;
}

function messageLine(texto) {
    console.log(texto);
    mensajes.push(texto);
    dibujarDiv(mensajes);
}

function pulsarFunction(e) {
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}
