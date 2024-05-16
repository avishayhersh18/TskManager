var express = require("express");
const dataBase = require("../dataBase/conn");
var router = express.Router();

const getUsers = require("../utils/userFunc").getUsers;
const insert = require("../utils/userFunc").insertUser;
const update = require("../utils/userFunc").updateUser;

router.get("/:user/:pass", async (req, res, next) => {
  getUsers(req,res,next);
});

/* POST User listing. */
router.post("/", async (req, res, next) => {
  insert(req,res,next);
});

/* PATCH User listing. */
router.patch("/", async (req, res, next) => {
  update(req,res,next);
});

module.exports = router;
