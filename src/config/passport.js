import passport from "passport";
import Local from "passport-local";
import User from "../controllers/user";

const LocalStrategy = Local.Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: "user[email]", passwordField: "user[password]" },
    function(name, password, done) {
      User.getByName(name).then(user => {
        if (!user) {
          return done(null, false, { message: "incorrect Email." });
        }
        User.validPassword(password, user[0].hash, user[0].salt).then(
          validate => {
            if (!validate)
              return done(null, false, { message: "Incorrect password." });
            return done(null, user);
          }
        );
      });
    }
  )
);
