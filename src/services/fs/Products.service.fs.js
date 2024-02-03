import fs from "fs"
import crypto from "crypto"

export default class ProductsManager {
    #filePath

    constructor(filePath = "./src/productos.json") {
        this.#filePath = filePath
    }

    allFieldsAreValid(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.code ||
            !product.stock ||
            !product.category
        ) {
            return false
        }

        return true
    }

    async createProduct(product) {
        try {
            if (!this.allFieldsAreValid) {
                throw new Error("Missing data")
            }

            console.log(product)
            const products = await this.getProducts()

            if (products.find((existingProduct) => existingProduct.code === product.code)) {
                throw new Error(`Product with ${code} already exists`)
            }

            products.status = product.status ?? true

            product.id = crypto.randomUUID()

            products.push(product)

            await this.#saveProducts(products)
            return product
        } catch (err) {
            throw err
        }
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.#filePath)) {
                const products = JSON.parse(await fs.promises.readFile(this.#filePath, "utf-8"))
                return products
            }
            return []
        } catch (err) {
            throw err
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProducts()

            const product = products.find((prod) => prod.id == id)

            if (!product) {
                throw new Error(`Product with id ${id} was not found`)
            }

            return product
        } catch (err) {
            throw err
        }
    }

    async deleteProductById(id) {
        try {
            const product = this.getProductById(id)
            if (!product) {
                throw new Error(`Product with ${id} was not found`)
            }

            let products = await this.getProducts()
            products = products.filter((prod) => prod.id !== id)

            this.#saveProducts(products)
        } catch (err) {
            throw err
        }
    }

    async updateProduct(id, productUpdates) {
        try {
            const products = await this.getProducts()

            const productIndex = await products.findIndex((prod) => prod.id === id)

            if (productIndex < 0) {
                throw new Error(`Product with id ${id}, was not found`)
            }

            if (productUpdates.hasOwnProperty(id) && productUpdates.id !== products[productIndex].id) {
                throw new Error(`Product's can not be modified`)
            }

            products[productIndex] = {
                ...products[productIndex],
                ...productUpdates,
            }

            await this.#saveProducts(products)

            return products[productIndex]
        } catch (err) {
            throw err
        }
    }

    async #saveProducts(products) {
		try {
			await fs.promises.writeFile(this.#filePath, JSON.stringify(products));
		} catch (error) {
			throw error;
		}
	}
}