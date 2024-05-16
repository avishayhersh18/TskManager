const dataBase = require("../dataBase/conn");
const utilFuncs = require("../utils/functions");

// Retrieves user data, categories, and tasks based on the username and password provided in the request parameters
async function getUsers(req, res, next)
{
    const user_name = req.params.user;
    const password = req.params.pass;
    let db =  dataBase.getDB();
    const users = await db.collection("Users");
    const query = { User_name: user_name, Password: password };
    const login_user = await users.findOne(query);
    const listCategories = await utilFuncs.getCategories();
    // Retrieves the user's tasks and sends the response
    const resultFromDb = async () => {
        delete login_user.Password;
        const jsonResult = JSON.stringify(login_user);
        if (login_user !== null) {
          const listTasks = await utilFuncs.getUsersTasks(login_user.id);
          const resultData = { "user": login_user, "categories": listCategories, "tasks": listTasks};
          res.status(200).send(resultData);
        } else {
        res.status(404).send(jsonResult);
        }
    };
    if (login_user != null){
      resultFromDb();
    } else {
      res.status(404).send(login_user);
    }
}

// Inserts a new user into the database
async function insertUser(req, res, next)
{
  try {
      const data = req.body;
      const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
      // Generate a random 4-digit number
      var userId = Math.floor(Math.random() * 9000) + 1000;
      data["id"] = userId;
      data["Tasks"] = [];
      const insertUser = db.collection("Users");
      const result = await insertUser.insertOne(data);
      let user = await utilFuncs.getNewUser(userId);
      res.status(200).json(user);
    } catch (error) {
      next(error);
      res.status(400).send(result);
    }

}

// Updates a user's data in the database
async function updateUser(req, res, next)
{
    try {
        const data = req.body;
        const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
        const updateUser = db.collection("Users");
        const filter = { id: data.id };
        delete data._id;
        const update = {$set: data};
        const result = await updateUser.updateOne(filter, update);
        res.status(200).json(result);
      } catch (error) {
        next(error);
      }
}

module.exports = {updateUser, insertUser, getUsers};