const User = require("../models/User-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//--------logique de route selon des conditions, répond au promesse selon les conditions d'acces ou d'authorisation de la requete-------------
//--------donne un token qui expire apres 10 h au utilisateur qui se connecte------------


exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password,10)//plain text password,salt round
    .then((hash) => {
      const user = new User({ // créer un nouveau user,le sauvegarde dans la base de donnée,password encrypté
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur crée" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      
      if (!user) {
        return res.status(401).json({ message: "Aucun compte ne correspond à votre adresse email" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.writeHead(401,'Mot de passe incorrect')
            res.end()
            return
           // return res.status(401).json({ message: "Votre mot de passe est incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "10h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
