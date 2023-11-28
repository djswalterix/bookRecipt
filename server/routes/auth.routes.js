const express = require("express");
const router = express.Router();
const passport = require("../auth/passport"); // Assicurati che il percorso sia corretto
const jwt = require("jsonwebtoken");
router.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("user", user);
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    if (!user) {
      console.log("Authentication failed. User not found.");
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }

    console.log("Token Payload:", { sub: user.id });
    // Genera il token JWT
    const token = jwt.sign(
      { sub: user.id /*, role: user.role*/ },
      process.env.JWT,
      {
        expiresIn: "1h",
      }
    );
    const userForFrontend = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
    };

    return res.json({ success: true, token, user /*user: userForFrontend*/ });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "No user to log out" });
  }
});

module.exports = router;
