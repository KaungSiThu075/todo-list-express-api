const express = require("express");
const router = express.Router();

const todos = require("../controller/TodoController");

router.get("/", todos.getAllTodos);
router.get("/:todoId", todos.getTodoById);
router.post("/", todos.postTodo);
router.put("/:todoId", todos.updateTodo);
router.delete("/:todoId", todos.deleteTodo);

module.exports = router;
