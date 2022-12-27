const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    categoryId: Number,
    categoryName: Object
});

const CATEGORY = mongoose.model("allcategoriesdatabase", categorySchema);

module.exports = CATEGORY;
