import { Router } from "express";
import ProductService from "../services/db/Products.service.db.js"

const productService = new ProductService()
const productsRouter = Router()

productsRouter.get("/", async (req, res) => {
	try{
		const { limit = 10, page = 1, sort, category } = req.query
		const filter = {
			options: {
				limit,
				page,
			},
		}
	
		if (category) {
			filter.query = {category: category}
		}

		if (sort) {
			filter.options.sort = {price: sort}
		}

		const products = await productService.getPaginatedProducts(filter)

		if (products.length < 1) {
			res.status(404).json({
				success: false,
				message: "Could not retrieve products"
			})
			return
		}

		res.status(200).json({
			success: true,
			data: products,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			success: false,
			message: err.message
		})
	}
})

productsRouter.get("/:pid", async (req, res) => {
	try {
		const { pid } = req.params

		const product = await productService.getProductById(pid)

		if (!product) {
			res.status(404).json({
				success: false,
				message: "Product not found"
			})
			return
		}

		res.status(200).json({
			success: true,
			data: product,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			success: false,
			message: err.message,
		})
	}
})

productsRouter.post("/", async (req, res) => {
	try {
		const { product } = req.body
		const newProduct = await productService.createProduct(product)

		if (!newProduct) {
			res.status(400).json({
				success: false,
				message: "Could not add the product",
			})
			return
		}

		const products = await productService.getProducts()

		res.status(200).json({
			success: true,
			products,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

productsRouter.put("/:pid", async (req, res) => {
	try {
		const { pid } = req.params
		const { product } = req.body

		const updatedProduct = await productService.updateProduct(pid, product)

		if (!updatedProduct) {
			res.status(400).json({
				success: false,
				message: "Could not update the product",
			})
			return
		}

		res.status(200).json({
			success: true,
			data: updatedProduct,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

productsRouter.delete("/:pid", async (req, res) => {
	try {
		const { pid } = req.params

		await productService.deleteProductById(pid)

		const products = await productService.getProducts()

		res.status(200).json({
			success: true,
			message: `Product with ID ${pid} was deleted.`,
			products,
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

export default productsRouter;