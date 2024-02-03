import CartModel from "../../dao/models/cart.model.js";
export default class CartsManager {
    async createCart() {
        try {
            const product = []
            const cart = await CartModel.create({product})

            return cart
        } catch (err) {
            throw err
        }
    }

    async getCarts() {
        try {
            const carts = await CartModel.find().lean()

            return carts
        } catch (err) {
            throw err
        }
    }

    async getCartById(cid) {
        try {
            const cart = await CartModel.findById(cid).lean()
            return cart
        } catch (err) {
            throw err
        }
    }

    async addProductToCart(cid, pid) {
        try {
            const productExistsInCart = await CartModel.exists({_id: cid, "products.product": pid })
            let cart
            if (!productExistsInCart) {
                cart = await cartModel.findByIdAndUpdate(
                    cid,
                    { $push: {
                        products: {
                            product: pid,
                            quantity: 1
                        }
                    }},
                    { new: true }
                ).lean()
            } else {
                cart = await CartModel.findOneAndUpdate(
                    {_id: cid, "products.product": pid},
                    {$inc: {"products.$.quantity": 1}},
                    {new: true}
                ).lean()
            }

            return cart
        } catch (err) {
            throw err
        }
    }

    async updateProductQuantity(pid, cid, quantity) {
        try {
            const productExistsInCart = await CartModel.exists({_id: cid, "products.product": pid})
            if (!productExistsInCart) {
                return {message: "Product not found in cart"}
            }

            const cart = await CartModel.findOneAndUpdate(
                {_id: cid, "products.product": pid },
                { $set: { "products.$.quantity": quantity} },
                {new: true}
            ). lean()

            return cart
        } catch (err) {
            throw err
        }
    }

    async deleteProductFromCart(cid, pid) {
        try {
            const productExistsInCart = new CartModel.exists({_id, cid, "products.product": pid})

            if (!productExistsInCart) {
                return {message: "Product not found in cart"}
            }

            const cart = await CartModel.findByIdAndUpdate(
                cid,
                {$pull: {products: {product: pid} }},
                {new: true},
            ).lean()

            return cart
        } catch (err) {
            throw err
        }
    }

    async emptyCart(cid) {
        try {
            const cart = await CartModel.findByIdAndUpdate(
                cid,
                {$set: {products: []}},
                {new: true}
            ).lean()

            return cart
        } catch (err) {
            throw err
        }
    }
}