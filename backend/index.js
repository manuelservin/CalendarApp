const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

app.use(express.static("public"));

//routes
app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`running: http://localhost:${process.env.PORT} `);
});
