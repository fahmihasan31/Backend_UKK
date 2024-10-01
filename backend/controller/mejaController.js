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
  let keyword = req.params.key
  try {
    let meja = await mejaModel.findAll({ where: { nomor_meja: { [Op.substring]: keyword } } })
    return res.status(200).json({
      status: true,
      data: meja,
      message: 'data meja ditemukan'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

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
  const { nomor_meja } = req.body
  if (!nomor_meja) {
    return res.status(400).json({
      status: false,
      message: 'nomor meja tidak boleh kosong'
    })
  }
  try {
    const newMeja = await mejaModel.create({ nomor_meja })
    return res.status(200).json({
      status: true,
      data: newMeja,
      message: 'data meja ditambahkan'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

exports.updateMeja = async (req, res) => {
  const id_meja = req.params.id
  const { nomor_meja, status } = req.body
  try {
    const meja = await mejaModel.findOne({ where: { id_meja } });

    // Jika meja tidak ditemukan, return error
    if (!meja) {
      return res.status(404).json({
        status: false,
        message: `Meja dengan ID ${id_meja} tidak ditemukan`
      });
    }

    await meja.update({
      nomor_meja: nomor_meja,
      status: status
    });

    return res.status(200).json({
      status: true,
      data: meja,
      message: 'data meja di update'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}

exports.deleteMeja = async (req, res) => {
  const id_meja = req.params.id
  try {
    const result = await mejaModel.destroy({ where: { id_meja: id_meja } })
    return res.status(200).json({
      status: true,
      data: result,
      message: 'data meja di hapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}