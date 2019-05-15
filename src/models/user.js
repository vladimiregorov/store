"use strict";
export default (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      email: DataTypes.STRING,
      hash: DataTypes.STRING,
      salt: DataTypes.STRING
    },
    {}
  );
  return Users;
};
