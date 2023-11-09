const express = require("express");
const router = express.Router();
const passport = require("../auth/passport"); // Assicurati che il percorso sia corretto

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
    console.log(req.body);
    if (!user) {
      console.log("Authentication failed. User not found.");
      return res
        .status(401)
        .json({ success: false, message: "Authentication failed" });
    }
    req.logIn(user, (loginErr) => {
      if (loginErr) {
        return res
          .status(500)
          .json({ success: false, message: "Login failed" });
      }
      return res.json({ success: true, user: req.user });
    });
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
