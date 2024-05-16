var express = require('express');
const dataBase = require("../dataBase/conn")
var router = express.Router();
const utilFuncs = require("../utils/functions");

/* GET Categories listing. */
router.get('/', async (req, res, next) => {

    let db = await dataBase.getDB();
    const category = db.collection('Categories');
    const results = await category.find({}).toArray();
    res.status(200).send(results) 
  
  });

  /* POST Category listing. */
router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
        const exist = await utilFuncs.ifCategoryExists(data["Name"]);
        // Check if the category already exists
        if (!exist){
          let categories = await utilFuncs.getCategories()
          var idCategory = (categories.length)+1;
          data["id"] = idCategory;
          const insertCategory = db.collection('Categories');
          const result = await insertCategory.insertOne(data);
          let category = await utilFuncs.getNewCategory(data["id"]);
          res.status(200).json(category);
          return
        }
        // Category already exists, return error response
        res.status(400).json(data);
      } catch (error) {
        next(error);
      }
  
  });

/* PATCH Category listing. */
router.patch('/', async (req, res, next) => {
    try {
      const data = req.body;
      const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
      
      const updateCategory = db.collection('Categories');
      data['Category'] = await getIdCategory(data['Category']); // Assuming getIdCategory is defined elsewhere
      
      const filter = { id: data['id'] };
      const result = await updateCategory.replaceOne(filter, data);
  
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  });
  module.exports = router;

