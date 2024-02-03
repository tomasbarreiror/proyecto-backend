import { Router } from "express";
import ChatService from "../services/db/Chat.service.db.js"

const ChatRouter = Router()
const chatService = new ChatService()

ChatRouter.post("/", async (req, res) => {
    try {
        const { user, message } = req.body
        const newMessage = await chatService.createMessage({ user, message })
        if (!newMessage) {
            return res.status(400).json({ success: false, error: "Message could not be created" })
        }

        req.io.emit("newMessage", newMessage)

        return res.status(201).json({success: true})
    } catch (err) {
        console.log(err.message)
        return res.status(500).json({success: false, error: err.message})
    }
})

export default ChatRouter