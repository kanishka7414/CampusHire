const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const Student = require("./models/Student");
const Company = require("./models/company");

const app = express();

app.use(express.json());

connectDB();

// Application routes
app.use("/api/applications", require("./routes/application"));

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.send("CampusHire Backend is Running!");
});

app.get("/api/companies", async (req, res) => {
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to load companies"
        });
    }
});

app.delete("/api/companies/:id", async (req, res) => {

    try {

        await Company.findByIdAndDelete(req.params.id);

        res.json({
            message: "Company removed successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to remove company"
        });

    }

});

app.post("/api/companies", async (req, res) => {

    try {

        const company = new Company(req.body);

        await company.save();

        res.status(201).json({
            message: "Company added successfully",
            company: company
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding company",
            error: error.message
        });

    }

});

app.post("/api/students", async (req, res) => {

    try {

        const student = new Student(req.body);

        await student.save();

        res.json({
            message: "Student registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }

});

app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const student = await Student.findOne({
            email: email,
            password: password
        });

        if (!student) {

            return res.status(401).json({
                message: "Invalid email or password"
            });

        }

        res.json({
            message: "Login successful",
            student: {
                name: student.name,
                email: student.email,
                cgpa: student.cgpa,
                skills: student.skills
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }

});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});