const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces-ctrl');

const auth = require('../middleware/auth-md');
const multer = require('../middleware/multer-config');

//-------------Les routes pour les sauces (api/sauce/) deja défini, les controllers séparé-------------


router.post('/', auth, multer, saucesCtrl.createSauce);
router.get('/', auth, multer,saucesCtrl.findSauces);
router.get('/:id', auth, saucesCtrl.findOneSauce);
router.delete('/:id', auth, saucesCtrl.deleteOneSauce);
router.put('/:id',auth,multer, saucesCtrl.updateOne);

module.exports = router;