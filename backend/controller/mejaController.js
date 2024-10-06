const mejaModel = require(`../models/index`).meja
const { Op } = require(`sequelize`)

exports.getMeja = async (req, res) => {
  try {
    let meja = await mejaModel.findAll()
    return res.status(200).json({
      status: true,
      data: meja,
      message: 'data meja ditampilkan semua'
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

exports.findMeja = async (req, res) => {
  let keyword = req.params.key;

  try {
    let meja = await mejaModel.findAll({
      where: { nomor_meja: { [Op.substring]: keyword } }
    });

    // Jika tidak ada meja yang ditemukan
    if (meja.length === 0) {
      return res.status(404).json({
        status: false,
        message: `Meja tidak ditemukan`
      });
    }

    // Jika ada meja yang ditemukan
    return res.status(200).json({
      status: true,
      data: meja,
      message: 'Data meja ditemukan'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

exports.statusMeja = async (req, res) => {
  const param = { status: req.params.status }
  try {
    const meja = await mejaModel.findAll({ where: param })
    if (meja.length > 0) {
      return res.status(200).json({
        status: true,
        data: meja,
        message: 'data meja ditemukan'
      })
    } else {
      return res.status(404).json({
        status: false,
        message: 'data meja tidak ditemukan'
      })
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

exports.addMeja = async (req, res) => {
  const { nomor_meja } = req.body;
  if (!nomor_meja) {
    return res.status(400).json({
      status: false,
      message: 'Nomor meja tidak boleh kosong'
    });
  }

  try {
    // Cek apakah nomor meja sudah ada
    const existingMeja = await mejaModel.findOne({ where: { nomor_meja } });
    if (existingMeja) {
      return res.status(400).json({
        status: false,
        message: 'Nomor meja sudah ada'
      });
    }

    // Jika tidak ada, buat meja baru
    const newMeja = await mejaModel.create({ nomor_meja });
    return res.status(200).json({
      status: true,
      data: newMeja,
      message: 'Data meja berhasil ditambahkan'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

exports.updateMeja = async (req, res) => {
  const id_meja = req.params.id;
  const { nomor_meja, status } = req.body;

  // Validasi untuk nomor_meja dan status
  if (!nomor_meja) {
    return res.status(400).json({
      status: false,
      message: 'Nomor meja tidak boleh kosong'
    });
  }

  try {
    // Cek apakah meja dengan id_meja ada
    const meja = await mejaModel.findOne({ where: { id_meja } });

    if (!meja) {
      return res.status(404).json({
        status: false,
        message: `Meja dengan ID ${id_meja} tidak ditemukan`
      });
    }

    // Cek apakah nomor_meja yang baru sudah digunakan oleh meja lain
    const existingMeja = await mejaModel.findOne({
      where: {
        nomor_meja,
        id_meja: { [Op.ne]: id_meja } // Menggunakan Op.ne untuk memastikan id_meja tidak sama
      }
    });

    if (existingMeja) {
      return res.status(400).json({
        status: false,
        message: `Nomor meja ${nomor_meja} sudah digunakan oleh meja lain`
      });
    }

    // Update data meja jika tidak ada masalah
    await meja.update({
      nomor_meja: nomor_meja,
      status: status
    });

    return res.status(200).json({
      status: true,
      data: meja,
      message: 'Data meja berhasil di-update'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};

exports.deleteMeja = async (req, res) => {
  const id_meja = req.params.id;
  try {
    // Cek apakah meja dengan id_meja ada
    const result = await mejaModel.destroy({ where: { id_meja } });

    // Jika tidak ada meja yang dihapus (result = 0)
    if (result === 0) {
      return res.status(404).json({
        status: false,
        message: `Meja dengan ID tidak ditemukan`
      });
    }

    return res.status(200).json({
      status: true,
      message: 'Data meja berhasil dihapus'
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    });
  }
};