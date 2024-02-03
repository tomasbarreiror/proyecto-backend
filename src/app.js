import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import handlebars from "express-handlebars";
import IndexRouter from "./routes/index.routes.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.port;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", "src/views");
app.set("view engine", "handlebars");

app.use((req, res, next) => {
	req.io = io;
	next();
});

app.use("/", IndexRouter);

const server = app.listen(PORT, (error) => {
	if (error) {
		console.log(error);
	}

	console.log("servidor esta running en el puerto " + PORT);
});

const io = new Server(server);

io.on("connection", (socket) => {
	console.log("Se conecto un nuevo ususario");
});

startMongoConnection()
	.then(() => {
		console.log("Conectado a la base de datos");
	})
	.catch((err) => console.log(err));

async function startMongoConnection() {
	await mongoose.connect(DB_URL);
}
