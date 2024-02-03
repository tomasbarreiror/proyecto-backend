import { Router } from "express";
import CartsService from "../services/db/Carts.service.db.js"

const cartsService = new CartsService()
const cartsRouter = Router()

cartsRouter.post("/", async (req, res) => {
  try {
    await cartsService.createCart({})

    res.status(200).json({
      success: true,
      message: "New empty cart successfully created",
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

cartsRouter.get("/", async (req, res) => {
  try {
    const carts = await cartsService.getCarts()
    res.status(200).json({ carts })
  } catch (err) {
    console.log(err.message)
  }
})

cartsRouter.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params
    const cart = await cartsService.getCartById(cid)

    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found"
      })
      return
    }

    res.status(200).json({
      success: true,
      message: "Cart sent",
      cart,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params

    const cart = await cartsService.addProductToCart(cid, pid)
    if (!cart) {
      res.status(404).json({
        success: false,
        message: "Cart not found"
      })
      return
    }
    res.status(200).json({
      success: true,
      message: `Product ${pid} added to cart ${cid}`,
      cart
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
})

cartsRouter.put("/:cid/product/:pid", async (req, res) => {
  try {
    const { quantity } = req.body
    const { cid, pid } = req.params

    const cart = await cartsService.updateProductQuantity(pid, cid, quantity)
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      })
    }
    res.status(200).json({
      success: true,
      message: `Product ${pid}'s quantity was modified ${cid}`
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params

    const cart = await cartsService.deleteProductFromCart(cid, pid)

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      })
    }
    res.status(200).json({
      success: true,
      message:`Product ${pid} deleted from cart ${cid}`,
      cart
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

cartsRouter.delete("/:cid", async (req, res) => {
  const { cid } = req.params

  try {
    await cartsService.emptyCart(cid)

    res.status(200).json({
      success: true,
      message: `Cart ${cid} was emptied`
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
})

export default cartsRouter