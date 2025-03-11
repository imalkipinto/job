const mongoose = require("mongoose");

const applicantSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    cvPublicLink: String,
    education: [String],
    qualifications: [String],
    projects: [String],
    processed: Boolean,
    processedAt: Date
});

module.exports = mongoose.model("Applicant", applicantSchema);
