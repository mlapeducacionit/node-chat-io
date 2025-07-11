// Cliente Socket.io

const socket = io.connect()

socket.on('nombre', data => {
    console.log(data)
})

socket.on('dia-semana', (data) => {
    console.log(data)
})

socket.on('array-objetos', (dataArray) => {
    console.log(dataArray)
})



// Renderizado de los mensajes recibos

function render(data) {

    let html = data.map(msj => {
        return (
            `
                <div>
                    <strong>${msj.usuario}:</strong>
                    <em>${msj.mensaje}</em>
                </div>
            `
        )
    }).join(' ')
    console.log(html)
    document.querySelector('.mensajes').innerHTML = html
}

socket.on('mensajes', mensajes => {
    console.log(mensajes)
    render(mensajes)
})

// -------------------------------------
// Emitiendo lo escrito en el formulario

function agregarMensaje(e) {
    e.preventDefault()

    const nombre = document.querySelector('#lbl-nombre')
    const mensaje = document.querySelector('#lbl-mensaje')

    const obj = {
        usuario: nombre.value, // Maxi
        mensaje: mensaje.value // 'Hola mundo!
    }
    console.log(obj)
    socket.emit('nuevo-comentario', obj)

    nombre.value = ''
    mensaje.value = ''

}

const btn = document.querySelector('#btn')
const form = document.querySelector('form')
form.addEventListener('submit', agregarMensaje)
