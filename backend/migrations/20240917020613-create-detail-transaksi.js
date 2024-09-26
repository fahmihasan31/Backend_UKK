'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('detail_transaksi', {
      id_detail_transaksi: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_transaksi: {
        type: Sequelize.INTEGER,
        references: {
          model: 'transaksi', // Referensi ke tabel 'transaksis'
          key: 'id_transaksi'
        },
      },
      id_menu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'menu', // Referensi ke tabel 'menus'
          key: 'id_menu'
        },
      },
      harga: {
        type: Sequelize.INTEGER
      },

      qty: {
        type: Sequelize.INTEGER
      },

      total: {
        type: Sequelize.INTEGER
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('detail_transaksi');
  }
};
