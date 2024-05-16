var express = require("express");
const dataBase = require("../dataBase/conn");
var router = express.Router();


/* POST Inquiries listing. */
router.post("/", async (req, res, next) => {
    try {
        const data = req.body;
        const db = await dataBase.getDB(); // Assuming dataBase is a module or function for database connection
        // Generate a random 4-digit number
        var inquiriesId = Math.floor(Math.random() * 9000) + 1000;
        data["id"] = inquiriesId;
        data["Status"] = "Open";
        const insertInquiries = db.collection("Inquiries");
        const result = await insertInquiries.insertOne(data);
        res.status(200).json(data);
        } catch (error) {
            next(error);
            res.status(400).send(data);
        }
});



module.exports = router;
