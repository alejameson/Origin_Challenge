const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('action', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
    },
    symbol: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    exchange: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
};