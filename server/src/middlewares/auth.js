const jwt = require("jsonwebtoken");

// Cek apakah user sudah login (ada token valid)
exports.authenticate = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Token tidak ditemukan" });
  }

  try {
    req.user = jwt.verify(header.split(" ")[1], process.env.JWT_SECRET);
    next();
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Token tidak valid atau kadaluarsa" });
  }
};

// Batasi akses berdasarkan role, contoh: authorize('ADMIN')
exports.authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Akses ditolak" });
    }
    next();
  };
