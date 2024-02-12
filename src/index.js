import express from 'express'
import productsRouter from './routes/products.routes.js'
import cartRouter from './routes/cart.routes.js'
import { __dirname } from './path.js'
import upload from './config/multer.js'

//Configuraciones o declaraciones
const app = express()
const PORT = 9000

//Middlewares
app.use(express.json())
app.use('/static', express.static(__dirname + '/public'))

//Routes
app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        console.log(req.body)
        res.status(200).send("Imagen cargada correctamente")
    } catch(e) {
        res.status(500).send("Error al cargar imagen")
    }
})


//Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})