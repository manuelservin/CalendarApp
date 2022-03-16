const { response } = require("express");
const jwt = require("jsonwebtoken");

const validateToken = (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "There isnt a valid token",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
  next();
};

module.exports = {
  validateToken,
};
