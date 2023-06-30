require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");

console.log(require('./swagger.json'));
  swaggerUi = require("swagger-ui-express");
 swaggerJsdoc = require("swagger-jsdoc");
const Search = require("./Models/searchSchema");
const swaggerDocument = require('./swagger.json');
// Swagger set up
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Memory Game API",
      version: "1.0.0",
      description:
        "API for a memory game app built with React, Node.js and MongoDB",
    },
    servers: [
      {
        url: "http://dir.y2022.kinneret.cc:7013"
      }
    ],
  },
 apis: ["./routes/*.js"]
};
const specs = swaggerJsdoc(options);

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use("/api-docs", swaggerUi.serve);
app.get("/api-docs", swaggerUi.setup(specs,{explorer:true}));
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument,{explorer:true}));

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
// app.use(cors({
//   origin:["https://p7024.y2022.kinneret.cc","https://ser.y2022.kinneret.cc"]
// }));
app.use(cors({
  origin: '*'
}));


app.use("/search", require("./routes/search"));
app.use("/user", require("./routes/user"));
app.use("/auth", require("./routes/auth"));
app.use("/note",require("./routes/note"));
// mount the profile routes at the '/profile' path
app.use("/profile", require("./routes/profile"));
app.use("/category", require("./routes/category"));
app.use("/gameHistory", require("./routes/gameHistory"));
app.use("/leaderboards", require("./routes/leaderboards"));
app.use("/achievements", require("./routes/achievements"));
app.use("/feedback",require("./routes/termFeedback"));
app.use("/ai",require("./routes/chatgpt"));

// Set staic folder
app.use("/Storage", express.static(path.join(__dirname, "Storage")));

// app.use(express.static("public"));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// GET
app.get("/", (req, res) => {
  res.json({ msg: "get /  successful ◄◄◄ " });
});

app.get("/counter",async (req,res)=>{
  try{
    const result =await Search.count();
    res.send({result});
  }
  catch(err){
    console.log(err);
    res.send(err);
  }
})


app.get("/return_all_terms",async (req,res)=>{
  try{
  const result = await Search.find();
  res.send(result)
    
  }catch(err){
    
  }
})

//404
// app.use((req, res) => {
//   res.status(404).send("sorry can't find that!");
// });
