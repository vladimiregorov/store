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
  Users.associate = function(models) {};
  return Users;
};
