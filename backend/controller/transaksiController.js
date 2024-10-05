const { validationResult } = require("express-validator")
const { where } = require("sequelize")

const userModel = require(`../models/index`).user
const mejaModel = require(`../models/index`).meja
const menuModel = require(`../models/index`).menu
const transaksiModel = require(`../models/index`).transaksi
const detailTransaksiModel = require(`../models/index`).detail_transaksi
const Op = require("sequelize").Op

exports.getTransaksiByIdUser = async (req, res) => {
  const id_user = req.params.id;

  if (!id_user) {
    return res.status(400).json({
      status: false,
      message: "ID user tidak ditemukan.",
    });
  }

  try {
    const result = await transaksiModel.findAll({
      where: { id_user: id_user },
      include: [
        "user",
        "meja",
        {
          model: detailTransaksiModel,
          as: "detail_transaksi",
          include: ["menu"],
        },
      ],
      order: [
        ["id_transaksi", "DESC"]
      ],
    });

    if (result.length === 0) {
      return res.json({
        status: true,
        message: "Tidak ada transaksi ditemukan untuk user ini.",
        data: [],
      });
    }

    return res.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.getTransaksiManajer = async (request, response) => {
  try {
    let result = await transaksiModel.findAll({
      include: [
        "user",
        "meja",
        {
          model: detailTransaksiModel,
          as: "detail_transaksi",
          include: ["menu"],
        },
      ],
      order: [
        ["id_transaksi", "DESC"]
      ],
    });
    return response.json({
      status: true,
      data: result,
    });
  } catch (error) {
    return response.json({
      status: false,
      message: error.message,
    });
  }
};

exports.getNota = async (req, res) => {
  const id_transaksi = req.params.id;
  try {
    const transaksi = await transaksiModel.findOne({
      where: { id_transaksi },
      include: [
        { model: userModel, as: 'user', attributes: ['nama_user'] },
        { model: mejaModel, as: 'meja', attributes: ['nomor_meja'] },
        {
          model: detailTransaksiModel, as: 'detail_transaksi',
          include: [{ model: menuModel, as: 'menu', attributes: ['id_menu', 'nama_menu', 'harga'] }]
        }
      ]
    });

    if (!transaksi) {
      return res.status(404).json({
        status: false,
        message: `Transaksi dengan id ${id_transaksi} tidak ditemukan`
      });
    }
    // Format data transaksi menjadi struktur nota
    const nota = {
      Nama_Cafe: "Cafe Wikusama",
      tanggal: transaksi.tgl_transaksi,
      pelanggan: transaksi.nama_pelanggan,
      kasir: transaksi.user ? transaksi.user.nama_user : "Tidak diketahui",
      meja: transaksi.meja ? transaksi.meja.nomor_meja : "Tidak ada nomor meja",
      detail_pesanan: transaksi.detail_transaksi.map(detail => ({
        nama_menu: detail.menu.nama_menu,
        harga_satuan: detail.menu.harga,
        qty: detail.qty,
        subTotal: detail.qty * detail.menu.harga
      })),
      total_bayar: transaksi.detail_transaksi.reduce((total, detail) => total + (detail.qty * detail.menu.harga), 0),
      status: transaksi.status,
    };
    return res.status(200).json({
      status: true,
      data: nota,
      message: 'Data transaksi berhasil ditampilkan dalam format nota'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

exports.getTransaksiFilteredByDate = async (req, res) => {
  const param = { tgl_transaksi: req.params.tgl_transaksi };

  transaksiModel
    .findAll({
      where: {
        tgl_transaksi: {
          [Op.between]: [
            param.tgl_transaksi + " 00:00:00",
            param.tgl_transaksi + " 23:59:59",
          ], // mencari data transaksi berdasarkan tanggal transaksi yang dikirimkan melalui parameter
        },
      },
      include: [
        {
          model: userModel,
          as: "user",
        },
        {
          model: mejaModel,
          as: "meja",
        },
      ],
      order: [['tgl_transaksi', 'DESC']], // Mengurutkan berdasarkan tgl_transaksi dari yang lama ke terbaru (ascending)
    })
    .then((result) => {
      if (result.length === 0) {
        // jika data tidak ditemukan
        res.status(404).json({
          status: "error",
          message: "data tidak ditemukan",
        });
      } else {
        // jika data ditemukan
        res.status(200).json({
          status: "success",
          message: "data ditemukan",
          data: result,
        });
      }
    })
    .catch((error) => {
      // jika gagal
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
};

exports.addTransaksi = async (req, res) => {
  const { id_user, id_meja, nama_pelanggan, status, detailTransaksi } = req.body;

  try {
    // Cek status meja sebelum menambahkan transaksi
    const meja = await mejaModel.findOne({ where: { id_meja } });

    if (!meja) {
      return res.status(404).json({
        status: false,
        message: `Meja dengan ID ${id_meja} tidak ditemukan.`,
      });
    }

    if (meja.status === "terisi") {
      return res.status(400).json({
        status: false,
        message: `Meja dengan ID ${id_meja} sudah terisi. Cari meja yang lain.`,
      });
    }

    // Validasi detail transaksi
    if (!detailTransaksi || detailTransaksi.length === 0) {
      return res.status(400).json({
        status: false,
        message: 'Detail transaksi tidak boleh kosong.',
      });
    }

    // Cek setiap menu di detailTransaksi
    for (const detail of detailTransaksi) {
      if (!detail.id_menu) {
        return res.status(400).json({
          status: false,
          message: 'ID menu tidak boleh kosong.',
        });
      }

      if (!detail.qty) {
        return res.status(400).json({
          status: false,
          message: 'Qty tidak boleh kosong untuk ID menu ' + detail.id_menu,
        });
      }

      const menu = await menuModel.findOne({ where: { id_menu: detail.id_menu } });

      if (!menu) {
        return res.status(404).json({
          status: false,
          message: `Menu dengan ID ${detail.id_menu} tidak ditemukan. Silakan periksa dan coba lagi.`,
        });
      }
    }

    // Buat transaksi baru
    const transaksi = await transaksiModel.create({
      tgl_transaksi: new Date(),
      id_user,
      id_meja,
      nama_pelanggan,
      status: status || "belum_bayar",
    });

    if (transaksi.status === "belum_bayar") {
      await mejaModel.update(
        { status: "terisi" },
        { where: { id_meja: id_meja } }
      );
    }

    let totalHarga = 0;

    // Tambahkan detail transaksi
    for (const detail of detailTransaksi) {
      const menu = await menuModel.findOne({ where: { id_menu: detail.id_menu } });

      const subTotal = menu.harga * detail.qty;
      totalHarga += subTotal;

      await detailTransaksiModel.create({
        id_menu: detail.id_menu,
        id_transaksi: transaksi.id_transaksi,
        harga: menu.harga,
        qty: detail.qty,
        total: subTotal,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Transaksi berhasil ditambahkan",
      data: {
        id_transaksi: transaksi.id_transaksi,
        id_user: transaksi.id_user,
        nama_pelanggan: transaksi.nama_pelanggan,
        detail_transaksi: detailTransaksi,
        total_harga: totalHarga,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.updateTransaksi = async (req, res) => {
  const id_transaksi = req.params.id;
  const { status } = req.body;

  try {
    const transaksi = await transaksiModel.findOne({ where: { id_transaksi: id_transaksi } });

    if (!transaksi) {
      return res.status(404).json({
        status: false,
        message: `Transaksi dengan ID ${id_transaksi} tidak ditemukan`,
      });
    }

    // Update status transaksi
    await transaksiModel.update(
      { status },
      { where: { id_transaksi: id_transaksi } }
    );

    if (status === "lunas") {
      await mejaModel.update(
        { status: "kosong" },
        { where: { id_meja: transaksi.id_meja } }
      );
    }

    return res.status(200).json({
      status: true,
      message: "Status transaksi berhasil diupdate",
      data: {
        id_transaksi,
        status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};