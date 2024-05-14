const express = require("express");
const userController = require("../controllers/userController");

module.exports = (pool) => {
  const router = express.Router();

  router.post("/tasks", (req, res) => userController.addTask(req, res, pool));
  router.get("/tasks", (req, res) => userController.getTasks(req, res, pool));

  return router;
};
