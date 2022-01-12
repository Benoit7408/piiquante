const Sauces = require("../models/Sauces-model");
const fs = require("fs");

//--------logique de route selon des conditions, répond au promesse selon les conditions d'acces ou d'authorisation de la requete-------------

exports.createSauce = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauces
    .save()
    .then(() => res.status(201).json({ message: "sauces enregistré" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.findSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

exports.findOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

exports.updateOne = (req, res, next) => {
  const saucesObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauces.updateOne(
    { _id: req.params.id },
    { ...saucesObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "sauce modifié" }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res
          .status(404)
          .json({ error: new Error("la sauce est introuvable") });
      }
      if (sauce.userId !== req.auth.userId) {
        return res
          .status(401)
          .json({ error: new Error("Requete non authorisée") });
      }
      const filename = sauce.imageUrl.split("/image/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauces.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "sauces supprimé" }))
          .catch((error) => res.status(404).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.likeSauce = (req, res, next) => {
  const userId = req.body.userId;
  const sauceid = req.params.id;

  switch (req.body.like) {
    case 1: {
      Sauces.updateOne(
        { _id: req.params.id },
        { $inc: { likes: req.body.like }, $push: { usersLiked: userId } }
      )
        .then(() => res.status(200).json({ message: "sauces liked" }))
        .catch((error) => res.status(404).json({ error }));

      break;
    }
    case -1: {
      Sauces.updateOne(
        { _id: req.params.id },
        { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }
      )
        .then(() => res.status(200).json({ message: "sauces disliked" }))
        .catch((error) => res.status(404).json({ error }));
      break;
    }
    case 0: {
      Sauces.findOne(
        { _id: req.params.id })
        .then(sauce => {
          if (sauce.usersLiked.includes(userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              { $pull: { usersLiked: userId }, $inc: { likes: -1 } }
            )
              .then(() => res.status(200).json({ message: "sans avis" }))
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(userId)) {
            Sauces.updateOne(
              { _id: req.params.id },
              { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } }
            )
              .then(() => res.status(200).json({ message: "sans avis" }))
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
        break;
      }
  }
  }

