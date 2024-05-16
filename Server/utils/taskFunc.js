const dataBase = require("../dataBase/conn");
const utilFuncs = require("../utils/functions");

// Retrieves the tasks for a given user ID and sends the response
async function getUserTasks(req, res, next)
{
  const user_id = parseInt(req.params.user);
  const tasksResult = await utilFuncs.getUsersTasks(user_id);
  res.status(200).send(tasksResult);
}

// Inserts a new task into the database
async function insertTask(req, res, next)
{
  try {
      const data = await req.body;
      userId = data["userId"];
      const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
      data["Category"] = await utilFuncs.getIdCategory(data["Category"]); // Assuming getIdCategory is defined elsewhere
      // Generate a random 4-digit number
      var taskId = Math.floor(Math.random() * 9000) + 1000;
      data["id"] = taskId;
      delete data.userId;
      const insertTask = db.collection("Tasks");
      const result = await insertTask.insertOne(data);
      await updateUserTask(userId, taskId);
      let task = await getAddedTask(taskId);
      
      res.status(200).json(task);
    } catch (error) {
      next(error);
    }

}

// Updates the user's tasks array by adding a new task ID
async function updateUserTask(idUser, idTask) {
  try {
    const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
    const update = db.collection("Users");
    const filter = { id: idUser };
    const value = { $push: { ["Tasks"]: idTask } };
    const result = await update.updateOne(filter, value);
    return true;
  } catch (error) {
    next(error);
    return false;
  }
}

// Retrieves the added task from the database based on the task ID
async function getAddedTask(taskId) {
  let db = await dataBase.getDB();
  const tasks = db.collection("Tasks");
  const query = { id: taskId };
  const task = await tasks.findOne(query);
  task["Category"] = await utilFuncs.getNameCategorybyID(task["Category"]); // Assuming getNameCategory is defined elsewhere
  return task;
}

// Updates a task in the database
async function updateTask(req, res, next)
{
  try {
    
    let data = req.body;
    const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
    const updateTask = db.collection("Tasks");
    data["Category"] = await utilFuncs.getIdCategory(data["Category"]); // Assuming getIdCategory is defined elsewhere
    const filter = { id: data["id"] };
    delete data.userId;
    const result = await updateTask.replaceOne(filter, data);
    data["Category"] = await utilFuncs.getNameCategorybyID(data["Category"]); // Assuming getNameCategory is defined elsewhere
    res.status(200).json(data);
  } catch (error) {
    next(error);
    res.status(400).json(data);
  }
}

// Deletes a task from the user's tasks in the database
async function deleteTaskUser(idUser, idTask) {
  try {
    const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection

    // Remove the task from the "Tasks" collection
    const taskCollection = db.collection("Tasks");
    const taskFilter = { id: idTask }; // Assuming "_id" is the unique identifier field for tasks
    await taskCollection.deleteOne(taskFilter);

    // Remove the task from the user's array of tasks
    const userCollection = db.collection("Users");
    const userFilter = { id: idUser };
    //pull to remove from the array of tasks of user the taskid
    const userUpdate = { $pull: { Tasks: idTask } };
    await userCollection.updateOne(userFilter, userUpdate);

    return true;
  } catch (error) {
    next(error);
    return false;
  }
}

module.exports = {insertTask, getUserTasks, updateTask,deleteTaskUser};