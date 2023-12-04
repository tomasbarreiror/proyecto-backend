import express from "express"
import ProductManager from "./src/ProductManager.js"

const app = express()
const PORT = 8080

const items = new ProductManager('productos.json')

app.get('/products', (req, res) => {
    const limit = req.query.limit

    let products = items.getProducts()

    if (limit) {
        products = products.slice(0, parseInt(limit, 10))
    }

    res.json({ products })
})

app.get('/products/:pid', (req, res) => {
    const productId = parseInt(req.params.pid, 10)
    const product = items.getProductById(productId)

    if (product) {
        res.json({ product })
    } else {
        res.status(404).json({ error: `Producto con ID ${productId} no encontrado` })
    }
})

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})