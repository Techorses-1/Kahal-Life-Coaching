const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    bringsYouHere: {
        type: String,
        required: [true, "This field is required"],
        trim: true
    },
    stuck: {
        type: String,
        required: [true, "This field is required"],
        trim: true
    },
    interest: {
        type: String,
        required: [true, "Please select an option"],
        enum: ["1on1", "8week", "exploring"]
    },
    different: {
        type: String,
        trim: true,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Form", formSchema);