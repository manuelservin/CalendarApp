const express = require("express");

const createUser = (req, res = express.response) => {
  const { name, email, password } = req.body;

  //manejo de errores

  res.status(201).json({
    ok: true,
    msg: "register",
    name,
    email,
    password,
  });
};

const loginUser = (req, res = express.response) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const renewToken = (req, res = express.response) => {
  res.json({
    ok: true,
    msg: "renew",
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken,
};
