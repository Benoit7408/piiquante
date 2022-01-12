const express = require("express");
const router = express.Router();
const likeCtrl = require("../controllers/sauces-ctrl");
const auth = require('../middleware/auth-md');



//-------------La route pour les likes et dislikes-------------


router.post('/:id/like',auth,likeCtrl.likeSauce)


module.exports =  router