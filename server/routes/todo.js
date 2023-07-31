const express = require("express");
const { verifyToken } = require("../routes/user.js");

const TodoModel = require("../models/Todo.js");
//const UserModel = require("../models/Users.js");

const router = express.Router();

router.post("/add", verifyToken, (req, res) => {
  const { todo, completed } = req.body;
  const newTodo = new TodoModel({ todo, completed, user: req.id });
  newTodo.save();
  res.status(201).json({ todo, completed, user: req.id });
});

router.get("/get", verifyToken, async (req, res) => {
  const todos = await TodoModel.find({ user: req.id });
  if (!todos) {
    return res.status(500).json({ message: "no todos add to see in the list" });
  }
  res.status(200).json(todos);
  //console.log(todos)
});

router.put("/update", verifyToken, async (req, res) => {
  const { completed } = req.body;
  const todo_db = await TodoModel.findById(req.body.id);
  //console.log(todo_db.user.toString());
  if (todo_db.user.toString() === req.id) {
    const updatetodo = await TodoModel.findByIdAndUpdate(req.body.id, {
      completed,
    });
    updatetodo.save();
    return res.status(201).json({ message: `todo updated successfully` });
  } else {
    res.status(500).json({ message: `No authorization` });
  }
});

router.delete("/delete", verifyToken, async (req, res) => {
  const todo_db = await TodoModel.findById(req.body.id);
  console.log(req.body.id);
  console.log(todo_db);
  if (todo_db.user.toString() === req.id) {
    const todo_delete = await TodoModel.findByIdAndDelete(req.body.id);
    //todo_delete.save();
    //await TodoModel.find({});
    return res.status(200).json({ message: `todo deleted successfully` });
  } else {
    res.status(500).json({ message: `No authorization` });
  }
});

module.exports = router;
