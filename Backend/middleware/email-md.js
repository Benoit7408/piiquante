const emailValidator = require("validator");

module.exports = (req, res, next) => {
  if (!emailValidator.isEmail(req.body.email)) {
    req.invalidEmail = 1;
  }
  next();
};
