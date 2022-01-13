const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user-ctrl");
const password = require('../middleware/password')

//-------------Les routes pour les inscription et login (api/auth/) deja défini, les controllers séparé-------------


router.post("/signup", password, userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
