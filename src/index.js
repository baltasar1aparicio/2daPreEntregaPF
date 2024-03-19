import express from 'express'
import mongoose from 'mongoose'
import messageModel from './models/messages.js'
import orderModel from './models/order.js'
import indexRouter from './routes/index.routes.js'
import { Server } from 'socket.io'
import { engine } from 'express-handlebars'
import { __dirname } from './path.js'

//Configuraciones o declaraciones
const app = express()
const PORT = 9000

//Server
const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})

const io = new Server(server)

//Connection DB
mongoose.connect("mongodb+srv://baltasar0017:shibuya2018@cluster0.kz1pjdm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("DB is connected"))
    .catch(e => console.log(e))


const resultado = await orderModel.paginate({ status: true }, {limit: 10, page: 1, sort: {price: 'asc'}})
console.log(resultado)    
/*
const resultado = await orderModel.aggregate([
    {
        $match: { size: "small" } //filtro
    },
    {
        $group: { _id: "$name", totalQuantity: {$sum: "$quantity"}, totalPrice: {$sum: "$price"} }
    },
    {
        $sort: {totalPrice: -1}
    },
    {
        $group: {_id: 1, orders: {$push: "$$ROOT"}}
    },
    {
        $project: {
            "_id": 0,
            orders: "$orders"
        }
    },
    {
        $merge: {
            into: "reports"
        }
    }
    
])

console.log(resultado)
*/

/*await orderModel.insertMany([
    { name: "Napolitana", size: "small", price: 8000, quantity: 4 },
    { name: "4 quesos", size: "small", price: 12000, quantity: 4 },
    { name: "4 quesos", size: "medium", price: 14000, quantity: 2 },
    { name: "4 quesos", size: "large", price: 18000, quantity: 2 },
    { name: "4 quesos", size: "medium", price: 7000, quantity: 1 },
    { name: "Calabresa", size: "small", price: 5000, quantity: 2 },
    { name: "Calabresa", size: "medium", price: 8000, quantity: 2 },
    { name: "Calabresa", size: "large", price: 9000, quantity: 2 },
    { name: "Calabresa", size: "large", price: 4500, quantity: 1 },
    { name: "Napolitana", size: "medium", price: 10000, quantity: 2 },
    { name: "Napolitana", size: "large", price: 14000, quantity: 2 },
    { name: "Napolitana", size: "small", price: 6000, quantity: 3 },
    { name: "Vegetariana", size: "small", price: 3000, quantity: 2 },
    { name: "Vegetariana", size: "medium", price: 6000, quantity: 3 },
    { name: "Vegetariana", size: "medium", price: 8000, quantity: 4 },
    { name: "Vegetariana", size: "large", price: 3500, quantity: 1 },
    { name: "Jamon y morrones", size: "small", price: 5000, quantity: 2 },
    { name: "Jamon y morrones", size: "large", price: 8000, quantity: 2 },
    { name: "Jamon y morrones", size: "medium", price: 6000, quantity: 2 },
    { name: "Jamon y morrones", size: "small", price: 7500, quantity: 3 },
    { name: "Napolitana", size: "medium", price: 15000, quantity: 3 }
])*/

//Middlewares

app.use(express.json())
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')

//Routes
app.use('/', indexRouter)

io.on('connection', (socket) => {
    console.log(`Conexion con Socket.io`)

    socket.on('mensaje', async (mensaje) => {
        try {
            await messageModel.create(mensaje)
            const mensajes = await messageModel.find()
            io.emit('mensajeLogs', mensajes)
        } catch (e) {
            io.emit('mensajeLogs', e)
        }

    })
})


//Routes
/*app.get('/', (req, res) => {
    // Define la variable css con el nombre del archivo CSS que deseas incluir
    const cssFile = 'home.css';
    // Renderiza la vista main.handlebars y pasa la variable css
    res.render('main', { css: cssFile });
});*/



/*
app.get('/static', (req, res) => {

    const prods = [
        {id: 1, title: `Celular`, price: 1500, img: ""},
        {id: 1, title: `Televisor`, price: 2500, img: ""},
        {id: 1, title: `Notebook`, price: 1700, img: ""},
        {id: 1, title: `Tablet`, price: 6200, img: ""}
    ]
    res.render('templates/products', {
        mostrarProductos: true,
        productos: prods,
        css: 'product.css'
    })
})
*/

