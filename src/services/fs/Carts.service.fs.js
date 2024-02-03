import ProductModel from "../../dao/models/product.model";

export default class ProductsManager {
    async createProduct(product) {
        try {
            const newProduct = await ProductModel.create(product)

            return newProduct
        } catch (err) {
            throw err
        }
    }

    async getProducts() {
        try {
            const products = await ProductModel.find().lean()

            return products
        } catch (err) {
            throw err
        }
    }

    async getPaginatedProducts(filter) {
        try {
            filter.options.lean = true
            const products = await ProductModel.paginate(filter.query, filter.options)
            products.status = "success"

            return products
        } catch (err) {
            throw err
        }
    }

    async getProductById(id) {
        try {
            const product = await ProductModel.findByIdAndDelete(id).lean()

            return product
        } catch (err) {
            throw err
        }
    }

    async updateProduct(id, productUpdates) {
        try {
            const product = await ProductModel.findByIdAndUpdate(id, productUpdates, {new: true}).lean()

            return product
        } catch (err) {
            throw err
        }
    }
}