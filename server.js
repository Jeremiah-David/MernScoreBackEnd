const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cp = require("cookie-parser");
require("dotenv").config();

const app = express();

app.use(cp());

app.get("/set/cookie", (req, res) => {
  const payload = {
    name: "Jeremiah David",
    age: "40",
    test: "test",
  };

  const token = jwt.sign(payload, "testkey");

  res
    .cookie("token", token, {
      httpOnly: true,
    })
    .send("Cookie Shipped");
});

app.get("/get/cookie", (req, res) => {
  const token = req.cookies.token;
  const payload = jwt.verify(token, "testkey");
  res.json(payload);
  // res.json();
});

app.get("/", (req, res) => res.send("Hello world"));
connectDB();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Feed the fam with port ${port}`);
});
