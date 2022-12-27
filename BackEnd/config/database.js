const mongoose = require("mongoose");
mongoose
  .connect(`${process.env.MONGO_LINK}`)
  .then((result) => {
    console.log("Connected To Database...");
  })
  .catch((err) => {
    console.log(err);
  });