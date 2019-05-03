const bcrypt = require("bcrypt");
const models = require("../models");

creatureHash = async password => {
  let salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(password, salt);
  let pass = { hash: hash, salt: salt };
  return pass;
};

class Users {
  static async createUser(data) {
    let pass = await creatureHash(data.password);
    let user = { email: data.email, hash: pass.hash, salt: pass.salt };
    // console.log(user);
    return models.Users.create(user);
  }

  static getByName(email) {
    return models.Users.findAll({ where: { email: email } });
  }
}
module.exports = Users;
