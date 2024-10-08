'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi Menu ke Detail Transaksi
      menu.hasMany(models.detail_transaksi, {
        foreignKey: 'id_menu',
        as: "detail_transaksi"
      });
    }
  }
  menu.init({
    id_menu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    nama_menu: DataTypes.STRING,
    jenis: DataTypes.ENUM('makanan', 'minuman'),
    deskripsi: DataTypes.STRING,
    gambar: DataTypes.STRING,
    harga: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'menu',
    tableName: 'menu',
    timestamps: false
  });
  return menu;
};