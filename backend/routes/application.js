const express = require("express");
const Application = require("../models/Application");

const router = express.Router();


// Apply for a company
router.post("/", async (req, res) => {

    try {

        const application = new Application(req.body);

        await application.save();

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {

        res.status(500).json({
            message: "Error submitting application",
            error: error.message
        });

    }

});


// Get applications of a student
router.get("/:email", async (req, res) => {

    try {

        const applications = await Application.find({
            studentEmail: req.params.email
        });

        res.json(applications);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching applications",
            error: error.message
        });

    }

});
// Update application status
router.put("/:id/status", async (req, res) => {

    try {

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true
            }
        );

        if (!application) {

            return res.status(404).json({
                message: "Application not found"
            });

        }

        res.json({
            message: "Application status updated",
            application
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating application status",
            error: error.message
        });

    }

});
// Get all applications for admin
router.get("/", async (req, res) => {

    try {

        const applications = await Application.find();

        res.json(applications);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching all applications",
            error: error.message
        });

    }

});
module.exports = router;