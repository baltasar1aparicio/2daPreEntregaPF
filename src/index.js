import express from 'express'
import { ProductManager } from './config/ProductManager.js'

const app = express()
const PORT = 9000
const productManager = new ProductManager('./products.json')


app.get('/', (req, res) => {

    res.send("Hola, mi primer servidor en express")
})

app.get('/products', async (req, res) => {
    const { limit } = req.query
    const prods = await productManager.getProducts()
    const limite = parseInt(limit)
    if (limite) {
        if (limite < 0) {
            res.send('Ingrese un número valido')
        } else {
            const prodsLimit = prods.slice(0, limit)
            res.send(prodsLimit)
        }


    } else {
        res.send('Error: Por favor, ingrese un valor numérico válido')

    }

    const prodsLimit = prods.slice(0, limit)
    res.send(prodsLimit)
})

app.get('/products/:pid', async (req, res) => {
    const idProducto = req.params.pid
    const prod = await productManager.getProductById(idProducto)
    res.send(prod)
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})