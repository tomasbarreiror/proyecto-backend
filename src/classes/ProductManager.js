import utils from '../utils.js'

export class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.products = []
        this.newId = 1
        this.status = true
    }

    async addProduct(title, description, price, thumbnail, code, stock, category) {
        if (!title || !description || !price || !thumbnail || !code || !stock || !category) {
            throw new Error("Todos los campos son obligatorios.")
        }
        
        try {
            let data = await utils.readFile(this.path)
            this.products = data?.length > 0 ? data : []
        } catch (error) {
            console.error(error)
        }

        if (this.products.some(prod => prod.code === code)) {
            throw new Error("El código del producto ya existe.")
        }

        const newProduct = {
            id: this.newId++,
            title, description, price, thumbnail, code, stock, category
        }
        
        this.products.push(newProduct)

        try {
            await utils.writeFile(this.path, this.products)
        } catch (error) {
            console.error(error)
        }
        console.log("Se agregó:", newProduct)
    }

    async getProducts() {
        try {
            let data = await utils.readFile(this.path)
            this.products = data
            return data?.length > 0 ? this : "No hay productos"
        } catch (error) {
            console.error(error);
        }
    }

    async getProductById(id) {
        try {
            let data = await utils.readFile(this.path)
            this.products = data?.length > 0 ? data : []

            const product = this.products.find(prod => prod.id === id)
            if (product) {
                return product
            } else {
                return `El producto de id ${id} no se encontró.`
            }
        } catch (error) {
            console.error(error)
        }
    }

    async updateProductById(id, data) {
        try {
            let products = await utils.readFile(this.path)
            this.products = products?.length > 0 ? products : []

            let productIndex = this.products.findIndex(prod => prod.id === id)
            if (productIndex !== -1) {
                this.products[productIndex] = {
                    ...this.products[productIndex],
                    ...data,
                }
                await utils.writeFile(this.path, products)
                
                return {
                    mensaje: "El producto ha sido actualizado",
                    producto: this.products[productIndex],
                }
            } else {
                return { mensaje: "El producto aun no existe" }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    async deleteProductById(id) {
        try {
            let products = await utils.readFile(this.path);
            this.products = products?.length > 0 ? products : []

            let productIndex = this.products.findIndex(prod => prod.id === id)
            if (productIndex !== -1) {
                let product = this.products[productIndex]
                this.products.splice(productIndex, 1)
                await utils.writeFile(this.path, products)
                return { 
                        mensaje: "producto eliminado",
                        producto: product
                    }
            } else {
                return { mensaje: "no existe el producto solicitado" }
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export default { ProductManager }
