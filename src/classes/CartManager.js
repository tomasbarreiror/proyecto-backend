import utils from '../utils.js'

class CartManager {
    static carts
    constructor(filePath) {
        this.path = filePath
        this.carts = []
        this.newId = 1
        this.status = true
    }

    async addCart() {
        try {
            let data = await utils.readFile(this.path)
            this.carts = data?.length > 0 ? data : []
            
            const newCart = {
                id: this.newId++,
                timestamp: Date.now(),
                products: []
            }

            this.carts.push(newCart)

            await utils.writeFile(this.path, this.carts)
            return newCart
        } catch (error) {
            console.error(error)
        }

        return newCart    
    }

    async getCarts() {
        try {
            let data = utils.readFile(this.path)
            this.carts = data
            return data?.length > 0 ? this.carts : "El carrito se encuentra vacio"
        } catch (error) {
            console.error(error)
        }
    }

    async getCartById(id) {
        try {
            let data = await utils.readFile(this.path)
            this.carts = data?.length > 0 ? data : []
            let cart = this.carts.find(prod => prod.id === id)

            if (cart !== undefined) {
                return cart
            } else {
                return "El carrito aun no existe"
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addProductToCart(cartId, prodId) {
        try {
            const cart = await this.getCartById(cartId)
            const { products } = cart
            const productIndex = products.findIndex(prod => prod.product === prodId)
    
            if (productIndex !== -1) {
                products[productIndex].quantity++
            } else {
                products.push({
                    product: prodId,
                    quantity: 1,
                })
            }
            await this.updateCart(cart)
            return cart
        } catch (err) {
            console.log(err)
        }
    }

    async updateCart(cart) {
        const {id} = cart
        const carts = await this.getCarts()

        const cartToUpdateIndex = carts.findIndex(crt => crt.id === id)
        carts.splice(cartToUpdateIndex, 1, crt)

        const resp = await utils.writeFile(this.path, carts)
        return resp
    }
}

export {CartManager} 