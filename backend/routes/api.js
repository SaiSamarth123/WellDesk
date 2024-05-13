const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/tasks", userController.addTask);
router.get("/tasks", userController.getTasks);

module.exports = router;
