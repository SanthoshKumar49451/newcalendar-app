import Event from "../models/eventModal.js";
import Task from "../models/taskModal.js";
import Goal from "../models/goalMOdal.js";

//all events
async function getAllevents(req,res){
    try {
        const events = await Event.find();
  res.json({ success: true, data: events });
    } catch (error) {
        res.status(400).json({ error: error.message });
        
    }
}


// add event

async function addEvent(req,res) {
    const { title, category, start, end, color } = req.body;
    if (!title || !category || !start || !end || !color) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }
  
    try {
      const event = new Event(req.body);
      await event.save();
      res.status(201).json({ success: true, message: "Event created successfully", data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
    
}

//delete event

async function deleteEvent(req, res) {
  try {
    const now = new Date();
    const result = await Event.deleteMany({ end: { $lt: now } });

    // After deleting expired events, return the updated events list
    const updatedEvents = await Event.find();

    res.json({
      success: true,
      message: `${result.deletedCount} expired event(s) deleted.`,
      data: updatedEvents, // Return the updated events
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}



//all goals
async function allGoals(req,res){
    try {
        const goals = await Goal.find();
    res.json({ success: true, data: goals });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        
    }
}

//add Goal
async function addGoal(req,res) {
    const { title, color } = req.body;
    if (!title || !color) {
      return res.status(400).json({ success: false, message: "Title and color are required." });
    }
  
    try {
      const goal = new Goal(req.body);
      await goal.save();
      res.status(201).json({ success: true, message: "Goal created successfully", data: goal });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
    
}

//all tasks

// Fix allTasks controller to use query
async function allTasks(req, res) {
  try {
    const query = req.query.goalId ? { goalId: req.query.goalId } : {};
    const tasks = await Task.find(query);
    res.json({ success: true, data: tasks });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}


//add task
async function addTask(req,res){
    const { title, goalId } = req.body;
    if (!title || !goalId) {
      return res.status(400).json({ success: false, message: "Title and goalId are required." });
    }
  
    try {
      const task = new Task(req.body);
      await task.save();
      res.status(201).json({ success: true, message: "Task created successfully", data: task });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
}

export{getAllevents,addEvent,deleteEvent,allGoals,addGoal,allTasks,addTask}