import { Router } from "express";
import ProductRouter from "./products.routes.js"
import CartRouter from "./cart.routes.js"
import ViewsRouter from "./views.routes.js"
import ChatRouter from "./chat.routes.js";

const IndexRouter = Router()

IndexRouter.use("/api/products", ProductRouter);
IndexRouter.use("/api/cart", CartRouter);
IndexRouter.use("api/chat", ChatRouter)
IndexRouter.use("/", ViewsRouter);

export default IndexRouter