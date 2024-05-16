var express = require("express");
const dataBase = require("../dataBase/conn");
var router = express.Router();

const getTasksUser = require("../utils/taskFunc").getUserTasks;
const insert = require("../utils/taskFunc").insertTask;
const update = require("../utils/taskFunc").updateTask;
const deleteTask = require("../utils/taskFunc").deleteTaskUser;

/* GET tasks listing. */
router.get("/:user", async (req, res, next) => {
  getTasksUser(req,res,next);
});


/* POST Tasks listing. */
router.post("/", async (req, res, next) => {
  insert(req,res,next);
});

/* PATCH Tasks listing. */
router.patch("/", async (req, res, next) => {
  update(req,res,next);

});

/* DELETE Tasks listing. */
router.delete("/", async (req, res, next) => {
  const data = req.body;
  let request = deleteTask(data["userId"], data["id"]);
  res.status(200).send({ response: request });
});
module.exports = router;
