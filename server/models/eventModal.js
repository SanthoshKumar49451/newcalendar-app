import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: String,
    enum: ["exercise", "eating", "work", "relax", "family", "social"],
    required: true,
  },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String, required: true },
});


const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
