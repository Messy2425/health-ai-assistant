const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: [
            'Symptom Analysis',
            'Diet Recommendation',
            'Lifestyle Improvement',
            'Medical Report Explanation',
            'Doctor Question Generator'
        ]
    },
    userInput: {
        type: String,
        required: true
    },
    aiResponse: {
        summary: String,
        possibleReasons: [String],
        healthyHabits: [String],
        warningSigns: [String],
        doctorQuestions: [String],
        disclaimer: String
    },
    rawAiOutput: String, // Store original AI response for debugging
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
