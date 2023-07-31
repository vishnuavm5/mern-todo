const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();

const { router: userRouter } = require("./routes/user.js");
const todoRouter = require("./routes/todo.js");

const app = express();

app.use(express.json());

app.use(cors());

mongoose.connect(process.env.CONNECTION_STRING);

app.use("/auth", userRouter);
app.use("/todo", todoRouter);
let PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`SERVER IS RUNNING AT ${PORT}`));
