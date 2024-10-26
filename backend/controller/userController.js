// Import model
const userModel = require('../models/index').user;
//import library
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

exports.getAllUser = async (req, res) => {
  try {
    const data = await userModel.findAll({
      attributes: ['id_user', 'nama_user', 'role', 'username']
    })
    return res.status(200).json({
      status: true,
      data: data,
      message: 'Data user ditampilkan semua'
    })
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    })
  }
};

exports.findUser = async (req, res) => {
  const keyword = req.params.key;

  try {
    let users = await userModel.findAll({
      where: {
        [Op.or]: [
          { id_user: { [Op.substring]: keyword } },
          { nama_user: { [Op.substring]: keyword } },
          { role: { [Op.substring]: keyword } },
          { username: { [Op.substring]: keyword } },
        ]
      }
    });

    if (users.length === 0) {
      return res.status(404).json({
        status: false,
        message: `User tidak ditemukan`
      });
    }

    return res.status(200).json({
      status: true,
      data: users,
      message: 'Data user ditemukan'
    });
  } catch (err) {
    return res.status(400).json({
      status: false,
      message: err.message
    });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const id = req.params.id;
    const { role } = req.body;

    let user = await userModel.findOne({ where: { id_user: id } });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: `User dengan id tersebut tidak ditemukan`
      });
    }
    const validRoles = ['admin', 'kasir', 'manajer'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Role yang dimasukkan tidak valid"
      });
    }

    await userModel.update({ role: role }, { where: { id_user: id } });

    return res.json({
      success: true,
      message: `Role user berhasil diupdate`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan saat proses mengubah role",
      error: error.message
    });
  }
};

exports.UpdateUser = async (req, res) => {
  const id_user = req.params.id;
  const { nama_user, role, username, password } = req.body;

  // Cek apakah semua field yang diperlukan diisi
  if (!nama_user || !role || !username) {
    return res.status(400).json({
      status: false,
      message: 'Semua field harus diisi'
    });
  }

  if (username.length < 5) {
    return res.status(400).json({
      status: false,
      message: 'Username harus minimal 5 karakter'
    });
  }

  if (password && password.length < 8) {
    return res.status(400).json({
      status: false,
      message: 'Password harus minimal 8 karakter'
    });
  }

  // Validasi role
  const validRoles = ['admin', 'manajer', 'kasir'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      status: false,
      message: 'Role harus salah satu dari: admin, manajer, atau kasir'
    });
  }

  const updateUser = {
    nama_user,
    role,
    username,
    password,
  };

  try {
    const user = await userModel.findOne({ where: { id_user } });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: 'User dengan ID tersebut tidak ditemukan'
      });
    }

    // Cek jika password dikirimkan, lakukan hash
    if (updateUser.password) {
      const salt = await bcrypt.genSalt(10);
      updateUser.password = await bcrypt.hash(updateUser.password, salt);
    }

    // Cek jika username sudah ada di user lain
    const existUser = await userModel.findOne({
      where: { username: updateUser.username, id_user: { [Op.ne]: id_user } },
    });
    if (existUser) {
      return res.status(400).json({
        status: false,
        message: 'Username sudah ada'
      });
    }

    const result = await userModel.update(updateUser, { where: { id_user } });
    return res.status(200).json({
      status: true,
      message: 'Data User berhasil di update'
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    });
  }
};

//add User
exports.addUser = async (req, res) => {
  const { nama_user, role, username, password } = req.body;

  // Cek apakah semua field yang diperlukan diisi
  if (!nama_user || !role || !username || !password) {
    return res.status(400).json({
      status: false,
      message: 'Semua field harus diisi'
    });
  }

  // Validasi panjang username dan password
  if (username.length < 5) {
    return res.status(400).json({
      status: false,
      message: 'Username harus minimal 5 karakter'
    });
  }

  if (password.length < 8) {
    return res.status(400).json({
      status: false,
      message: 'Password harus minimal 8 karakter'
    });
  }

  // Validasi role
  const allowedRoles = ['manajer', 'admin', 'kasir'];
  if (!allowedRoles.includes(role.toLowerCase())) {
    return res.status(400).json({
      status: false,
      message: 'Role harus salah satu dari: manajer, admin, atau kasir'
    });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Buat objek user baru
  const newUser = {
    nama_user,
    role,
    username,
    password: hashedPassword
  };

  try {
    let existUser = await userModel.findOne({
      where: { username: newUser.username }
    });

    if (!existUser) {
      const result = await userModel.create(newUser);
      return res.status(200).json({
        status: true,
        data: result,
        message: 'User berhasil ditambahkan'
      });
    } else {
      return res.status(400).json({
        status: false,
        message: 'Username sudah ada'
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message
    });
  }
};


//delete User
exports.deleteUser = async (req, res) => {
  try {
    const data = req.params.id

    // Cek apakah ID valid (tidak kosong dan merupakan angka)
    if (!data || isNaN(data)) {
      return res.status(400).json({
        status: false,
        message: 'ID tidak valid. Harap masukkan ID yang benar.'
      })
    }

    // Proses penghapusan user
    const result = await userModel.destroy({ where: { id_user: data } })

    // Cek apakah user berhasil dihapus (jika result > 0, berarti ada record yang dihapus)
    if (result === 0) {
      return res.status(404).json({
        status: false,
        message: 'User tidak ditemukan'
      })
    }

    return res.status(200).json({
      status: true,
      data: result,
      message: 'User berhasil dihapus'
    })
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: 'Terjadi kesalahan pada server: ' + error.message
    })
  }
}