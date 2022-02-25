const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    createInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  });
  

};
