const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  profit: { type: Number, required: true },
  link: { type: String, required: true },
  tie: { type: Boolean, required: true },
});

module.exports =  mongoose.model("Task", taskSchema);
