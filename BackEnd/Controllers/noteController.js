const Note = require("../Models/noteSchema");

const getAll = (req, res) => {
res.status(200).send("helllllllllla");
  console.log("get the job done");
};

module.exports = {getAll};
