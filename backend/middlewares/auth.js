const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const verify = (req, res, next) => {
  let headers = req.headers.authorization;

  // Cek apakah ada headers authorization dan memisahkan token
  let token = headers && headers.split(" ")[1]; // Mengambil token setelah "Bearer"

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Unauthorized"
    });
  }

  jwt.verify(token, SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json({
        status: false,
        message: "Invalid token"
      });
    }

    console.log("Decoded token:", decoded);
    // Simpan payload token ke req agar bisa digunakan di route selanjutnya
    req.user = decoded;
    next();
  });
};

module.exports = { verify };
