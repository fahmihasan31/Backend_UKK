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

    // Validasi semua field harus diisi
    if (!newMenu.nama_menu || !newMenu.jenis || !newMenu.harga || !newMenu.deskripsi || !newMenu.gambar) {
      return res.status(400).json({
        status: false,
        message: 'Semua field harus diisi',
      });
    }

    // Validasi harga harus berupa angka
    if (isNaN(newMenu.harga)) {
      return res.status(400).json({
        status: false,
        message: 'Harga harus berupa angka',
      });
    }

    // Validasi jenis menu harus makanan atau minuman
    const allowedJenis = ['makanan', 'minuman'];
    if (!allowedJenis.includes(newMenu.jenis.toLowerCase())) {
      return res.status(400).json({
        status: false,
        message: 'Jenis harus makanan atau minuman',
      });
    }

    // Validasi harga tidak boleh minus atau 0
    if (newMenu.harga <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Harga tidak boleh kurang atau sama dengan 0',
      });
    }

    try {
      // Cek apakah menu dengan nama yang sama sudah ada
      const existMenu = await menuModel.findOne({
        where: { nama_menu: newMenu.nama_menu }
      });

      if (existMenu) {
        return res.status(400).json({
          status: false,
          message: 'Menu dengan nama tersebut sudah ada',
        });
      }

      // Menambahkan menu ke database
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

    if (result.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'Menu tidak ditemukan'
      })
    }

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

  // Cek apakah menu dengan id_menu tersebut ada
  const menu = await menuModel.findOne({ where: { id_menu } });
  if (!menu) {
    return res.status(404).json({
      status: false,
      message: 'Menu dengan ID tersebut tidak ditemukan',
    });
  }

  const uploadMenu = upload.single('gambar');

  uploadMenu(req, res, async (error) => {
    if (error) {
      return res.status(400).json({
        status: false,
        message: error.message,
      });
    }

    // Validasi bahwa semua field harus diisi
    const { nama_menu, jenis, harga, deskripsi } = req.body;

    if (!nama_menu || !jenis || !harga || !deskripsi) {
      return res.status(400).json({
        status: false,
        message: 'Semua field harus diisi',
      });
    }

    // Validasi harga harus berupa angka
    if (isNaN(harga)) {
      return res.status(400).json({
        status: false,
        message: 'Harga harus berupa angka',
      });
    }

    // Validasi jenis menu harus makanan atau minuman
    const allowedJenis = ['makanan', 'minuman'];
    if (!allowedJenis.includes(jenis.toLowerCase())) {
      return res.status(400).json({
        status: false,
        message: 'Jenis harus makanan atau minuman',
      });
    }

    // Validasi harga tidak boleh minus atau sama dengan nol
    if (harga <= 0) {
      return res.status(400).json({
        status: false,
        message: 'Harga tidak boleh kurang atau sama dengan 0',
      });
    }

    // Cek apakah nama menu sudah ada, kecuali menu yang sedang di-update
    const existMenu = await menuModel.findOne({
      where: {
        nama_menu,
        id_menu: { [Op.ne]: id_menu }  // Pastikan ID menu yang berbeda
      }
    });

    if (existMenu) {
      return res.status(400).json({
        status: false,
        message: 'Menu dengan nama tersebut sudah ada',
      });
    }

    // Buat objek update data
    const updatedData = {
      nama_menu: nama_menu,
      jenis: jenis.toLowerCase(),
      harga: harga,
      deskripsi: deskripsi,
    };

    // Validasi jika tidak ada file gambar diunggah
    if (!req.file) {
      return res.status(400).json({
        status: false,
        message: 'File tidak boleh kosong',
      });
    }

    // Jika ada file gambar yang diupload, hapus gambar lama
    if (req.file) {
      let oldImage = menu.gambar; // Mengambil nama gambar lama
      let pathFile = path.join(__dirname, '../menu-image', oldImage);
      if (fs.existsSync(pathFile)) {
        fs.unlinkSync(pathFile); // Hapus gambar lama
      }
      updatedData.gambar = req.file.filename; // Set gambar baru
    }

    try {
      // Update data menu di database
      const result = await menuModel.update(updatedData, { where: { id_menu } });

      return res.status(200).json({
        status: true,
        data: result,
        message: 'Menu berhasil diupdate',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: error.message,
      });
    }
  });
};

exports.deleteMenu = async (req, res) => {
  const id_menu = req.params.id;

  try {
    // Cek apakah menu dengan id_menu tersebut ada
    let menu = await menuModel.findOne({ where: { id_menu: id_menu } });

    // Jika menu tidak ditemukan, kembalikan pesan error
    if (!menu) {
      return res.status(404).json({
        status: false,
        message: 'Menu dengan ID tersebut tidak ditemukan',
      });
    }

    // Menghapus gambar dari server
    let pathFile = path.join(__dirname, `../menu-image`, menu.gambar);
    if (fs.existsSync(pathFile)) {
      fs.unlinkSync(pathFile);
    }

    // Menghapus menu dari database
    await menuModel.destroy({ where: { id_menu: id_menu } });
    return res.status(200).json({
      status: true,
      message: 'Menu berhasil dihapus',
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
