import express from "express";
import {
  getAllevents,
  addEvent,
  deleteEvent,
  allGoals,
  addGoal,
  allTasks,
  addTask,
} from "../controllers/apiController.js"; 

const router = express.Router()

// Event Routes
router.get("/events", getAllevents)
router.post("/events", addEvent)
router.delete("/eventsdelete", deleteEvent)

// Goal Routes
router.get("/goals", allGoals)
router.post("/goals", addGoal)

// Task Routes
router.get("/tasks", allTasks)
router.post("/tasks", addTask)

export default router

