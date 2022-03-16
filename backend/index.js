const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { dbConnection } = require("./db/config");
const app = express();

// DB
dbConnection();

app.use(cors());

app.use(express.json());

app.use(express.static("public"));

//routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));

app.listen(process.env.PORT, () => {
  console.log(`running: http://localhost:${process.env.PORT} `);
});
