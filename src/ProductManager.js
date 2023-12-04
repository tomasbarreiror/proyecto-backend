import fs from "fs"

class ProductManager {
    constructor(filePath) {
        this.path = filePath
        this.products = []
        this.newId = 1
        this.loadProductsFromFile()
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return console.error("Todos los campos son obligatorios.")
        }

        if (this.products.some(prod => prod.code === code)) {
            return console.error("El código del producto ya existe.")
        }

        const newProduct = {
            id: this.newId++,
            title, description, price, thumbnail, code, stock,
        }
        this.products.push(newProduct)
        console.log("Se agregó:", newProduct)
        this.saveProductsToFile()
    }

    getProducts() {
        return this.products
    }

    getProductById(id) {
        const product = this.products.find(prod => prod.id === id)

        if (product) {
            return product
        } else {
            console.error(`El producto de id ${id} no se encontró.`)
        }
    }

    loadProductsFromFile() {
        try {
            const fileContent = fs.readFileSync(this.path, 'utf-8')
            this.products = JSON.parse(fileContent)
            this.newId = Math.max(...this.products.map(product => product.id), 0) + 1
        } catch (error) {
            console.error(error)
        }
    }

    saveProductsToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
    }
}

export default ProductManager