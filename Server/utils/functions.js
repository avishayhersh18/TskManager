const dataBase = require("../dataBase/conn");

// Retrieves the tasks ID for a given user ID
async function getUsersTasksId(id) {
  let db = await dataBase.getDB();
  const users_task = db.collection("Users");
  const query = { id: id };
  let tasks = await users_task.findOne(query);
  return tasks['Tasks'];
}

// Retrieves the tasks for a given user ID
async function getUsersTasks(user_id) {
  const tasks_id = await getUsersTasksId(user_id);
  let db = await dataBase.getDB();

  // Retrieves the task lists based on the tasks ID
  const task_lists = async () => {
    const tasks = db.collection("Tasks");
    const query = { id: { $in: tasks_id } };
    const results = await tasks.find(query).toArray();
    return results;
  };

  const tasksResult = await task_lists(); // Call the function to retrieve the tasks
  const categoryList = await getCategory(tasksResult); // Retrieves the categories for the tasks
  const nameCategory = await getNameCategory(categoryList); // Retrieves the names of the categories

  // Assigns the category name to each task
  for (index in tasksResult) {
    tasksResult[index]["Category"] = nameCategory[index];
  }
  
  return tasksResult;
}

// Retrieves the names of categories based on their IDs
async function getNameCategory(categories) {
  let db = await dataBase.getDB();
  const categoryNames = [];
  const users_task = db.collection("Categories");
  
  for (let i = 0; i < categories.length; i++) {
    let name = await getNameCategorybyID(categories[i]);
    categoryNames.push(name);
  }

  return categoryNames;
}

// Retrieves the categories for the tasks
function getCategory(tasks) {
  const categories = [];

  for (let id in tasks) {
    categories.push(tasks[id]["Category"]);
  }

  return categories;
}

// Retrieves the category ID for a given category name
async function getIdCategory(name) {
  let db = await dataBase.getDB();
  const categories = db.collection("Categories");
  const query = { Name: name };
  const category = await categories.findOne(query);
  return category["id"];
}

// Retrieves the category name for a given category ID
async function getNameCategorybyID(idcategory) {
  let db = await dataBase.getDB();
  const category = db.collection("Categories");
  const query = { id: idcategory };
  const nameCategory = await category.findOne(query);
  return nameCategory["Name"];
}

// Retrieves a new category based on the category ID
async function getNewCategory(categoryId) {
  let db = await dataBase.getDB();
  const categories = db.collection("Categories");
  const query = { id: categoryId };
  const category = await categories.findOne(query);
  return category;
}

// Retrieves a new user based on the user ID
async function getNewUser(userId) {
  let db = await dataBase.getDB();
  const users = db.collection("Users");
  const query = { id: userId };
  const user = await users.findOne(query);
  return user;
}

// Retrieves all categories
async function getCategories() {
  let db = await dataBase.getDB();
  const categories = db.collection("Categories");
  const category = await categories.find({}).toArray();
  return category;
}

// Checks if a category exists by its name
async function ifCategoryExists(name){
  let categories = await getCategories();
  for (let i = 0; i < categories.length; i++) {
    if (categories[i]['Name'] == name){
      return true
    }
  }
  return false
} 

module.exports = {getNameCategorybyID,getUsersTasksId,getNewUser,getUsersTasks,getCategory,getNameCategory,getIdCategory,getNewCategory,ifCategoryExists,getCategories};
