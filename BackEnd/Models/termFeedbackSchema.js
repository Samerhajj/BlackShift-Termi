const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const termFeedbackSchema = new mongoose.Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'UserDatabase'},
    termId: {type: Schema.Types.ObjectId, ref: 'allconceptsdatabase'},
    overallRating: Number,
    shortDefinitionRating: Number,
    longDefinitionRating: Number,
    feedbackText: String
});

termFeedbackSchema.index({ userId: 1, termId: 1 }, { unique: true });

const TermFeedback = mongoose.model("TermFeedbackDatabase", termFeedbackSchema);

module.exports = TermFeedback;