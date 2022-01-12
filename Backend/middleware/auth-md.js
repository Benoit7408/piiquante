const jwt = require("jsonwebtoken");

//--------la verification du token dans la requete,extraction du token , utilisation de la clé secrete-------------


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    req.auth = {userId : userId};
    if (req.body.userId && req.body.userId !== userId) {
      throw 'User id non valable';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'requete non-identifiée' });
  }
};
