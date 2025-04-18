import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    goalId: { type: mongoose.Schema.Types.ObjectId, ref: "Goal", required: true }
  });
  

const Task=mongoose.models.Task||mongoose.model("Task",taskSchema)


export default Task