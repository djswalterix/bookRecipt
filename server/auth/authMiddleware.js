const passport = require("../auth/passport");

const verifyToken = passport.authenticate("jwt", { session: false });

module.exports = {
  verifyToken,
};
