import MessageModel from "../../dao/models/message.model.js";

export default class ChatService {
    async createMessage(message) {
        try {
            const newMessage = await MessageModel.create(message)

            return newMessage
        } catch (err) {
            throw err
        }
    }

    async findMessages() {
        try {
            const messages = await MessageModel.find().lean()

            return messages
        } catch (err) {
            throw err
        }
    }
}