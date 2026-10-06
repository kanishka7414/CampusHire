const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({

    studentEmail: {
        type: String,
        required: true
    },

    company: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Applied", "Under Review", "Shortlisted", "Rejected"],
        default: "Applied"
    },

    appliedDate: {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model("Application", applicationSchema);