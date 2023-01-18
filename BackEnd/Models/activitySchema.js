const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    email: String,
    time: {
        type: Date,
        default: Date.now
    },
    activity:String
});

const USERACTIVITY = mongoose.model("allusersactivitydatabase", activitySchema);

module.exports = USERACTIVITY;
