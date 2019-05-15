import User from "../controllers/user";

export const createUsers = (req, res) => {
  const data = req.body.user;
  User.getByName(data.email).then(user => {
    if (user.length != 0) {
      res.json();
    } else {
      User.createUser(data).then(newUser => {
        res.json(newUser);
      });
    }
  });
};
