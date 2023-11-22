const passport = require("../auth/passport");

const verifyToken = passport.authenticate("jwt", { session: false });

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.role === "admin") {
    return next(); // L'utente è un admin, procedi con la richiesta
  }
  // L'utente non è un admin o non è autenticato
  return res.status(403).json({ message: "Access Denied: Admin Only" });
}
module.exports = {
  verifyToken,
  isAdmin,
};
