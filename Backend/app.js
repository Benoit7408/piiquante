const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user-route");
const saucesRoutes = require("./routes/sauces-route");
const likesRoutes = require("./routes/likes-route");
//const cors = require("cors");
const path = require("path");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const morgan = require("morgan");
const momorgan = require("mongoose-morgan");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const createError = require('http-errors')

const app = express();
//app.use(cors());

//const corsOptions = {
//  origin: "*",
//};

const apiLimiterCreateCount = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 5 create account requests per `window` (here, per hour)
  message:
    "Too many accounts created from this IP, please try again after an hour",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(morgan("dev"));
app.use(
  momorgan(
    {
      connectionString:
        "mongodb+srv://" +
        process.env.DB_USER_PASS +
        "@cluster0.y7vuz.mongodb.net/" +
        process.env.DB_USER_NAME,
    },
    {},
    "short"
  )
);

app.use(mongoSanitize());

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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//app.use(express.json());
//app.use(express.urlencoded({extended:true}));

//-------------Les differentes routes interne et externe( voir les middleware coorespondant ainsi que les models-------------

app.use(xss());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", apiLimiterCreateCount, userRoutes);
app.use("/api/sauces", likesRoutes);

//app.use(helmet())
module.exports = app;
