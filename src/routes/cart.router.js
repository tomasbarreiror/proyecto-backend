import { Router } from "express";
import { CartManager } from "../classes/CartManager.js";

const router = Router()
const cartManager = new CartManager("carts.json")

router.get("/", async (req, res) => {
  try {
    let resp = await cartManager.getCarts()
    res.json({ data: resp })
  } catch (err) {
    console.log(err)
  }
})

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    const resp = await cartManager.getCartById(parseInt(cid))
    res.json({ data: resp })
  } catch (err) {
    console.log(err)
  }
})

router.post("/", async (req, res) => {
  try {
    const resp = await cartManager.addCart()
    res.json({ message: "success", data: resp })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "error", data: err })
  }
})

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const resp = await cartManager.addProductToCart(parseInt(cid), parseInt(pid))
    res.json({ message: "success", data: resp })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "error", data: err })
  }
})

export default router