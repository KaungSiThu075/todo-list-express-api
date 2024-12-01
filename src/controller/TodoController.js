const services = require("../services/TodosService");

async function getAllTodos(req, res, next) {
  const todos = await services.getAllTodos();
  //console.log("todos ", todos);
  if (todos) {
    return res.status(200).json(todos);
  } else {
    res.json({message: `there is no todos available now` });
  }
}

async function getTodoById(req, res, next) {
  const todoId = req.params.todoId;
  //console.log("todo id ", todoId);
  try {
    const todoById = await services.getTodoById(todoId);
    if (todoById) {
      return res.status(200).json(todoById);
    }
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
}

async function postTodo(req, res, next) {
  const todo = req.body;
  try {
    const newTodo = await services.postNewTodo(todo);
    if (newTodo) {
      return res.status(201).json(newTodo);
    } else {
      return res.status(400).json(newTodo);
    }
  } catch (err) {
    return res.status(400).json({ err });
  }
}

async function updateTodo(req, res, next) {
  const todoId = req.params.todoId;
  const todo = req.body;
  try {
    const updatedTodo = await services.updateTodo(todoId, todo);
    if (updatedTodo) {
      return res.json(updatedTodo);
    }
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
}

async function deleteTodo(req, res, next) {
  const todoIdToDelete = req.params.todoId;

  try {
    const deletedTodo = await services.deleteTodo(todoIdToDelete);
    if (deletedTodo) {
      return res.json(deletedTodo);
    }
  } catch (err) {
    return res.status(404).json({ err: err.message });
  }
}

module.exports = { getAllTodos, getTodoById, postTodo, updateTodo, deleteTodo };
