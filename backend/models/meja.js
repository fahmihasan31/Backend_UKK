'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meja extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Meja memiliki banyak Transaksi
      meja.hasMany(models.transaksi, {
        foreignKey: 'id_meja',
        as: 'transaksi'
      });
    }
  }
  meja.init({
    id_meja: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nomor_meja: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('terisi', 'kosong'),
      defaultValue: 'kosong' // Default value ditentukan di sini
    }
  }, {
    sequelize,
    modelName: 'meja',
    tableName: 'meja',
    timestamps: false
  });
  return meja;
};
