const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  todo: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
});

const TodoModel = mongoose.model("todos", TodoSchema);
module.exports = TodoModel;
