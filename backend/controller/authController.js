const userModel = require('../models/index').user;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;


const Login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      status: false,
      logged: false,
      message: 'Username dan password harus diisi'
    });
  }
  try {
    const data = await userModel.findOne({ where: { username } });
    if (data) {
      const validPassword = await bcrypt.compare(password, data.password);
      if (validPassword) {
        // Generate token
        let payload = { id_user: data.id_user, username: data.username, role: data.role };
        let token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' }); // Set token expiration

        return res.status(200).json({
          status: true,
          logged: true,
          message: 'Anda berhasil login',
          data: { id_user: data.id_user, username: data.username, role: data.role }, // Kembalikan data yang relevan
          token: token
        });
      } else {
        return res.status(400).json({
          status: false,
          logged: false,
          message: 'Password salah'
        });
      }
    } else {
      return res.status(400).json({
        status: false,
        logged: false,
        message: 'Username tidak ditemukan'
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      logged: false,
      message: error.message
    });
  }
}

module.exports = { Login }