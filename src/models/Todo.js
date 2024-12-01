const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ToDoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  completed: Boolean,
});

module.exports = mongoose.model("Todos", ToDoSchema);
