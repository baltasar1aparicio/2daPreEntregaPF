import express from 'express'
import chatRouter from './chat.routes.js'
import productsRouter from './products.routes.js'
import cartRouter from './cart.routes.js'
import userRouter from './user.routes.js'
import upload from '../config/multer.js'
import { __dirname } from '../path.js'

const indexRouter = express.Router()


indexRouter.use('/public', express.static(__dirname + '/public'))
indexRouter.use('/api/products', productsRouter, express.static(__dirname + '/public'))
indexRouter.use('/api/cart', cartRouter)
indexRouter.get('/api/chat', chatRouter, express.static(__dirname + '/public'))
indexRouter.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        console.log(req.body)
        res.status(200).send("Imagen cargada correctamente")
    } catch (e) {
        res.status(500).send("Error al cargar imagen")
    }
})
indexRouter.use('/api/users', userRouter)

export default indexRouter