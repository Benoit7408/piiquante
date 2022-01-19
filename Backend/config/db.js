const mongoose = require("mongoose");
require('dotenv').config()
//--------connection mongodb-------------

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USER_PASS +
      "@cluster0.y7vuz.mongodb.net/" +
      process.env.DB_USER_NAME,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("mongodb est connect"))
  .catch((err) => console.log("pas de connection", err));


  //ancien url mongoAtlas

// mongodb://ben:ben@cluster0-shard-00-00.y7vuz.mongodb.net:27017,cluster0-shard-00-01.y7vuz.mongodb.net:27017,cluster0-shard-00-02.y7vuz.mongodb.net:27017/piiquante?ssl=true&replicaSet=atlas-g752l0-shard-0&authSource=admin&retryWrites=true&w=majority
