const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Form Schema (defined here to avoid separate model file)
const formSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    bringsYouHere: { type: String, required: true, trim: true },
    stuck: { type: String, required: true, trim: true },
    interest: { type: String, required: true, enum: ["1on1", "8week", "exploring"] },
    different: { type: String, trim: true, default: "" },
    createdAt: { type: Date, default: Date.now }
});

const Form = mongoose.model("Form", formSchema);

// Email transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// ========== ROUTE 1: Submit form ==========
router.post("/submit-form", async (req, res) => {
    try {
        const { firstName, email, bringsYouHere, stuck, interest, different } = req.body;

        // Check if user submitted within last 48 hours
        const fortyEightHoursAgo = new Date();
        fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);

        const existingSubmission = await Form.findOne({
            email: email,
            createdAt: { $gte: fortyEightHoursAgo }
        });

        if (existingSubmission) {
            return res.status(429).json({
                success: false,
                message: "You have already submitted a form within the last 48 hours. Please wait before submitting again."
            });
        }

        // Save to MongoDB
        const newForm = new Form({
            firstName,
            email,
            bringsYouHere,
            stuck,
            interest,
            different
        });

        await newForm.save();

        // Email to ADMIN (you)
        await transporter.sendMail({
            from: `"Kahal Life Coaching" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: "New Contact Form Submission",
            html: `
                <h2>New Form Submission</h2>
                <p><strong>Name:</strong> ${firstName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>What brings you here:</strong> ${bringsYouHere}</p>
                <p><strong>Where stuck/overwhelmed:</strong> ${stuck}</p>
                <p><strong>Interest:</strong> ${interest === "1on1" ? "1:1 Private Coaching" : interest === "8week" ? "8-Week Kahal Method Program" : "Not Sure Yet / Exploring"}</p>
                <p><strong>What would feel different:</strong> ${different || "Not provided"}</p>
                <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
            `
        });

        // Auto-reply to USER
        await transporter.sendMail({
            from: `"Kahal Life Coaching" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thank you for reaching out - Kahal Life Coaching",
            html: `
                <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
                    <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #2aaa8a;">
                        <h2 style="color: #2aaa8a; margin: 0;">Kahal Life Coaching</h2>
                    </div>
                    
                    <div style="padding: 30px 20px;">
                        <p style="font-size: 18px; color: #333;">Dear ${firstName},</p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">Thank you for reaching out.</p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">I've received your message and will respond within <strong style="color: #2aaa8a;">24 - 48 hours</strong>.</p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #555; font-style: italic;">In the meantime, take a moment to acknowledge that something within you is already seeking change - that awareness is the first step.</p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #555;">I look forward to connecting with you.</p>
                        
                        <p style="font-size: 16px; line-height: 1.6; color: #555; margin-top: 30px;">With warmth,<br><strong style="color: #2aaa8a;">Kahal Life Coaching</strong></p>
                    </div>
                    
                    <div style="text-align: center; padding-top: 20px; font-size: 12px; color: #999; border-top: 1px solid #eee;">
                        <p>© ${new Date().getFullYear()} Kahal Life Coaching. All rights reserved.</p>
                    </div>
                </div>
            `
        });

        res.status(200).json({
            success: true,
            message: "Form submitted successfully! Check your email for confirmation."
        });

    } catch (error) {
        console.error("Form submission error:", error);
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later."
        });
    }
});

// ========== ROUTE 2: Get all form submissions (for future use) ==========
router.get("/all-submissions", async (req, res) => {
    try {
        const allSubmissions = await Form.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: allSubmissions.length,
            data: allSubmissions
        });
    } catch (error) {
        console.error("Error fetching submissions:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching data from database"
        });
    }
});

module.exports = router;