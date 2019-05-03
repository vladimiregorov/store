const User = require("../controllers/user");

exports.createUsers = (req, res) => {
  const data = req.body.user;
  User.getByName(data.email).then(user => {
    if (user.length != 0) {
      res.json();
    } else {
      User.createUser(data).then(newUser => {
        // console.log(newUser);
        res.json(newUser);
      });
    }
  });
};
