const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`running: http://localhost:${process.env.PORT} `);
});
