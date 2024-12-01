const Todos = require("../models/Todo");

async function getAllTodos() {
  const allTodos = await Todos.find();
  if (!allTodos.length) {
    return [];
  } else {
    return allTodos;
  }
}

async function getTodoById(id) {
  const todoById = await Todos.findById(id);
  if (!todoById) {
    throw new Error(`can't find todo`);
  } else {
    console.log("todo by id ", todoById);
    return todoById;
  }
  // return Todos.findById(id);
}

async function postNewTodo(todo) {
  const newTodo = new Todos(todo);
  return newTodo.save();
}

async function updateTodo(todoId, todo) {
  let updateTodoById = await Todos.findById(todoId);

  if (!updateTodoById) {
    throw new Error(`can't find todo`);
  } else {
    const updatedTodo = await Todos.findByIdAndUpdate(todoId, todo, {
      new: true,
    });
    return updatedTodo;
  }
}

async function deleteTodo(todoId) {
  let todo = await Todos.findById(todoId);

  if (!todo) {
    throw new Error(`can't find todo`);
  } else {
    const deletedTodo = await Todos.findByIdAndDelete(todoId);
    return deletedTodo;
  }
}

module.exports = {
  getAllTodos,
  postNewTodo,
  getTodoById,
  updateTodo,
  deleteTodo,
};
