const { MongoClient ,ServerApiVersion} = require("mongodb");
// Replace the uri string with your connection string.
const uri = "MongoDB URL";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})


let database;

async function run() {
  try {
    database = client.db('TaskMng');

  } catch (e){
    console.error(e)
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
exports.getDB = () => {
  if (database){
    run()
    return database
  }
  else {
    run()
    return database;
  }
};
