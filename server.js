import express from 'express'
import { createServer } from 'node:http'
import path from 'node:path'
import { Server } from 'socket.io'

// ! Variables/Constantes
const app = express()
const PORT = process.env.PORT || 8080 
let clienteConectado = 0

const mensajes = [
    { usuario: 'Pedro', mensaje: 'Hola! Que tal!'},
    { usuario: 'Alfredo', mensaje: 'Muy bien y vos?'},
    { usuario: 'Laura', mensaje: 'Genial!'},
    { usuario: 'Maxi', mensaje: 'Todo piola!'},
]

// * Agrego la librería socket.io
const server = createServer(app)
const io = new Server(server) // genero el objeto io que tiene varios metodos que nos van a permitir crear un servidor trabajando con websocket


// ! Middlewares
app.use(express.static(path.join('public')))
// addEventListener('click', callback)
// addEventListener('click', (e) => {})
//io.on('connection', callback)
//io.on('connection', (socket) => {})
// Servidor socket.io
io.on('connection', (socket) => {
    // console.log(socket) 
    console.log('Un cliente se ha conectado', socket.id)
    clienteConectado++
    console.log(clienteConectado)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
        clienteConectado--
        console.log(clienteConectado);
    })

    // Emitir un mensaje desde el server al cliente
    socket.emit('nombre', 'Maximiliano')
    socket.emit('dia-semana', 'viernes')
    socket.emit('array-objetos', [{id: 1}, {id: 2}, {id: 3}, {id:4}, {id: 5}])


    /* --------------------------- */

    socket.emit('mensajes', mensajes)

    socket.on('nuevo-comentario', data => {
        console.log(data)
        mensajes.push(data)
        io.sockets.emit('mensajes', mensajes)
    })


})

// ! Para el listen -> NO uso app, uso server
server.listen(PORT, (err) => {
    if (err) throw new Error('No se pudo levantar el servidor', err)
    console.log(`Aplicacion funcionando en http://localhost:${PORT}`)
})