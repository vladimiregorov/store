import bcrypt from "bcrypt";
import models from "../models";

const creatureHash = async password => {
  let salt = await bcrypt.genSalt(12);
  let hash = await bcrypt.hash(password, salt);
  let pass = { hash: hash, salt: salt };
  return pass;
};

class Users {
  static async createUser(data) {
    let pass = await creatureHash(data.password);
    let user = { email: data.email, hash: pass.hash, salt: pass.salt };
    return models.Users.create(user);
  }

  static getByName(email) {
    return models.Users.findAll({ where: { email: email } });
  }

  static getById(id) {
    return models.Users.findAll({ where: { id: id } });
  }

  static async validPassword(password, UserHash, UserSalt) {
    let EnterPassword = await bcrypt.hash(password, UserSalt);
    return EnterPassword === UserHash;
  }

  static userJson(user) {
    let userRes = {
      id: user.id,
      email: user.email
    };
    return userRes;
  }
}
export default Users;
