'use strict';
module.exports = (sequelize, DataTypes) => {
  const author = sequelize.define('author', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  
  return author;
};