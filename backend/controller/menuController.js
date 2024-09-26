const menuModel = require(`../models/index`).menu
const upload = require(`./upload-menu`)
const path = require(`path`)
const fs = require(`fs`)
const { Op } = require(`sequelize`)

exports.addMenu = async (req, res) => {
  const uploadMenu = upload.single('gambar');
  uploadMenu(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: 'File tidak boleh kosong',
      });
    }
    // Membuat objek menu baru
    const newMenu = {
      nama_menu: req.body.nama_menu,
      jenis: req.body.jenis,
      harga: req.body.harga,
      deskripsi: req.body.deskripsi,
      gambar: req.file.filename,
    };
    if (!newMenu.nama_menu || !newMenu.jenis || !newMenu.harga || !newMenu.deskripsi || !newMenu.gambar) {
      return res.status(400).json({
        status: false,
        message: 'Semua field tidak boleh kosong',
      });
    }
    try {
      const result = await menuModel.create(newMenu);
      return res.status(201).json({
        status: true,
        data: result,
        message: 'Menu berhasil ditambahkan',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });
};

exports.getAllMenu = async (req, res) => {
  try {
    let result = await menuModel.findAll();
    return res.status(200).json({
      status: true,
      data: result,
      message: 'Data menu ditampilkan semua',
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
}

exports.findMenu = async (req, res) => {
  let keyword = req.params.key
  try {
    let result = await menuModel.findAll({
      where: {
        [Op.or]: {
          id_menu: { [Op.substring]: keyword },
          nama_menu: { [Op.substring]: keyword },
          jenis: { [Op.substring]: keyword },
        }
      }
    })
    return res.status(200).json({
      status: true,
      data: result,
      message: 'Data menu ditemukan'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}
exports.updateMenu = async (req, res) => {
  const id_menu = req.params.id;
  const uploadMenu = upload.single('gambar');

  uploadMenu(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }
    let menu = await menuModel.findOne({ where: { id_menu: id_menu } });
    if (req.file) {
      let oldImage = menu.gambar;
      let pathFile = path.join(__dirname, '../menu-image', oldImage);
      if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile);
      }
      req.body.gambar = req.file.filename;
    }
    const result = await menuModel.update(req.body, { where: { id_menu: id_menu } });
    return res.status(200).json({
      status: true,
      data: result,
      message: 'Menu berhasil diupdate',
    });
  });
};

exports.deleteMenu = async (req, res) => {
  const id_menu = req.params.id
  try {
    let menu = await menuModel.findOne({ where: { id_menu: id_menu } })
    let pathFile = path.join(__dirname, `../menu-image`, menu.gambar)
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile, error => { console.log(error) })
    }
    const result = await menuModel.destroy({ where: { id_menu: id_menu } })
    return res.status(200).json({
      status: true,
      message: 'Menu berhasil di hapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message
    })
  }
}