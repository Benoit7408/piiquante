//importation de password-validator

const passwordValidator = require("password-validator");

//creation de schema.

const passwordSchema = new passwordValidator();

passwordSchema
  .is()
  .min(4) // Minimum length 8
  .is()
  .max(100) // Maximum length 100
  .has()
  .uppercase(1) // Must have uppercase letters
  .has()
  .lowercase() // Must have lowercase letters
  .has()
  .digits(1) // Must have at least 2 digits
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(401).json({
      message:
        " Ce mot de passe n'est pas valide. Quatres caractéres au minimun dont une majucule et un chiffre. ",
    });
  }
};

/* 
On pourrait également avoir le model dans le dossier des models,
exporter passwordSchema, faire uniqement la fonction en middleware*/

/*dans cette fonction, on pourrait aussi définir une propriété de la requete avec un boolean qui serait utiliser dans le controlleur user*/
