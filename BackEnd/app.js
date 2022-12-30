require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
// Start the server on PORT 5000
let PORT = 7013;
app.use(express.json())
app.listen(PORT || process.env.PORT, (req, res) => {
  console.log("server is running on port",PORT);
  // console.log(process.env.PORT);
});
// Connect to database
const db = require("./config/database");
// Get the Coffees Orders
// Core
app.use(cors({
  origin:"*"
}));

app.use("/search", require("./routes/search"));
app.use("/user", require("./routes/user"))
app.use("/note",require("./routes/note"));
// Set staic folder

// app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET
app.get("/", (req, res) => {
  res.json({ msg: "get /  successful ◄◄◄ " });
});

//404
app.use((req, res) => {
  res.status(404).send("sorry can't find that!");
});
