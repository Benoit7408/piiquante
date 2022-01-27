const express = require("express");
const router = express.Router();

//controller
const userCtrl = require("../controllers/user-ctrl");

//middleware
const password = require("../middleware/password");
const emailValidator = require("../middleware/email-md");

//-------------Les routes pour les inscription et login (api/auth/) deja défini, les controllers séparé-------------

router.post("/signup", emailValidator, password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
