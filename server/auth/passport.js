// server/config/passport.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users.model"); // Assicurati che il percorso sia corretto
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        //const pk = await User.findPkbyEmail(email);
        const user = await User.findByEmail(email);

        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // Verifica la password
        const isValidPassword = await user.validatePassword(password);

        if (!isValidPassword) {
          return done(null, false, { message: "Incorrect password." });
        }
        console.log("correct");

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "your-secret-key", // Sostituisci con la tua chiave segreta per firmare i token JWT
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await User.findByPk(payload.sub);
      console.log("payload " + payload.sub);
      if (!user) {
        return done(null, false, { message: "User not found." });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false, { message: "Error authenticating user." });
    }
  })
);

module.exports = passport;
