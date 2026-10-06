const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: true
    },

    cgpa: {
        type: Number,
        required: true
    },

    skills: {
        type: String,
        required: true
    },

    deadline: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model("Company", companySchema);