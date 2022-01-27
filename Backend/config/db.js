const mongoose = require("mongoose");
require("dotenv").config();
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
