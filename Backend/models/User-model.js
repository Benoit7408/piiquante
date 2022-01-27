const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const validEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

//--------Les schemas, pour la bonne communication back et front-------------

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validEmail, "Veuillez écrire un email valide"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Veuillez écrire un email valide",
    ],
  },
  password: { type: String, required: true },
});

//--------email unique-------------

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
