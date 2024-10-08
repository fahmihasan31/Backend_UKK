'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // User memiliki banyak Transaksi
      user.hasMany(models.transaksi, {
        foreignKey: 'id_user',
        as: 'transaksi'
      });
    }
  }
  user.init({
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama_user: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'kasir', 'manajer'),
    username: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',
    timestamps: false,
  });
  return user;
};