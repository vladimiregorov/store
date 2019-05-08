import User from "../controllers/user";
import passport from "passport";

export const loginUsers = (req, res) => {
  passport.authenticate("local", function(err, user) {
    if (err) {
      return err;
    }
    if (user) {
      res.json(User.userJson(user[0]));
      console.log(req.session);
    }
    res.json();
  })(req, res);
};
