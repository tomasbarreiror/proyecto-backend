import express from "express";
import productRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express()
const PORT = 8080;
let productos = []

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})