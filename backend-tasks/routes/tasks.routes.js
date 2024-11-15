const tasksController = require("../controllers/tasks.controller")

const express = require("express")
const router = express.Router()

router.get("/", tasksController.getAllTasks)
router.delete("/", tasksController.deleteAllTasks)
router.post("/", tasksController.createTask)
router.put("/:id", tasksController.updateTask)
router.delete("/:id", tasksController.deleteTask)
router.get("/:id", tasksController.getTask)
module.exports = router