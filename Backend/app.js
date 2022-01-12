
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require('./routes/user-route');
const saucesRoutes = require('./routes/sauces-route');
const likesRoutes = require('./routes/likes-route');
const path = require("path");
const helmet = require('helmet');

const app = express();


//-------------Permet les requete multi origine-------------
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//-------------Securise les en tete http-------------

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
//------------Analyse le corp de la requete, nous permet d'interagir plus simplement et dans ce cas au format Json-------------

app.use(bodyParser.json());

//-------------Les differentes routes interne et externe( voir les middleware coorespondant ainsi que les models-------------

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
app.use('/api/sauces',likesRoutes);

//app.use(helmet())
module.exports = app;
