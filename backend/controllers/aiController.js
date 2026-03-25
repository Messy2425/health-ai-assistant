const axios = require('axios');
const HealthRecord = require('../models/HealthRecord');

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

/**
 * Parses the AI response into our structured format.
 */
const parseAiOutput = (responseText) => {
    const lines = responseText.split('\n');
    let category = '';
    let summary = '';
    let possibleReasons = [];
    let healthyHabits = [];
    let warningSigns = [];
    let doctorQuestions = [];
    let disclaimer = 'Consult a qualified doctor for medical advice.';

    let currentSection = '';

    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed) return;

        if (trimmed.startsWith('Health Category:')) {
            category = trimmed.replace('Health Category:', '').trim();
        } else if (trimmed.startsWith('Summary:')) {
            summary = trimmed.replace('Summary:', '').trim();
            currentSection = 'summary';
        } else if (trimmed.startsWith('Possible General Reasons:')) {
            currentSection = 'reasons';
        } else if (trimmed.startsWith('Healthy Habits to Follow:')) {
            currentSection = 'habits';
        } else if (trimmed.startsWith('Warning Signs:')) {
            currentSection = 'warning';
        } else if (trimmed.startsWith('Questions to Ask a Doctor:')) {
            currentSection = 'questions';
        } else if (trimmed.startsWith('Disclaimer:')) {
            disclaimer = trimmed.replace('Disclaimer:', '').trim();
            currentSection = '';
        } else {
            // General bullet point parser
            const item = trimmed.replace(/^[-*•\d.]+\s*/, '').trim();
            if (currentSection === 'reasons') possibleReasons.push(item);
            else if (currentSection === 'habits') healthyHabits.push(item);
            else if (currentSection === 'warning') warningSigns.push(item);
            else if (currentSection === 'questions') doctorQuestions.push(item);
            else if (currentSection === 'summary' && !summary) summary = item;
        }
    });

    return { 
        category,
        summary, 
        reasons: possibleReasons, 
        habits: healthyHabits, 
        warning: warningSigns, 
        questions: doctorQuestions, 
        disclaimer 
    };
};

// Handle Health Inquiry
exports.askHealthAssistant = async (req, res) => {
    const { question, category = 'General' } = req.body;
    const userId = req.user._id;

    if (!question) {
        return res.status(400).json({ message: 'Input question is required' });
    }

    try {
        const masterPrompt = `You are an AI Healthcare Assistant designed for educational purposes only.

Rules:
- do not provide medical diagnosis
- do not provide medicine names or dosage
- provide general health awareness guidance
- use simple language
- avoid scary statements
- encourage consulting doctor when necessary

Classify user input into category:
1 Symptom Analysis
2 Diet Recommendation
3 Lifestyle Improvement
4 Medical Report Explanation
5 Doctor Question Generator

User Input: "${question}" (User context: ${category})

Output format exactly as:

Health Category:
Summary:
Possible General Reasons:
- logic points
Healthy Habits to Follow:
- logic points
Warning Signs:
- logic points
Questions to Ask a Doctor:
- logic points
Disclaimer:
Consult a qualified doctor for medical advice.`;

        // Call Gemini API
        const response = await axios.post(`${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`, {
            contents: [{ parts: [{ text: masterPrompt }] }]
        });
        
        const aiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!aiText) {
            throw new Error('Failed to get valid response from AI');
        }

        const structuredResponse = parseAiOutput(aiText);

        // Save to Database
        const healthRecord = await HealthRecord.create({
            userId,
            category: structuredResponse.category || category,
            userInput: question,
            aiResponse: {
                summary: structuredResponse.summary,
                possibleReasons: structuredResponse.reasons,
                healthyHabits: structuredResponse.habits,
                warningSigns: structuredResponse.warning,
                doctorQuestions: structuredResponse.questions,
                disclaimer: structuredResponse.disclaimer
            },
            rawAiOutput: aiText
        });

        res.json(healthRecord);

    } catch (err) {
        console.error('AI Error:', err);
        res.status(500).json({ message: 'Error communicating with AI assistant' });
    }
};

// Get User History
exports.getHistory = async (req, res) => {
    try {
        const records = await HealthRecord.find({ userId: req.user._id }).sort({ createdAt: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching history' });
    }
};

// Get Single Record
exports.getRecordById = async (req, res) => {
    try {
        const record = await HealthRecord.findById(req.params.id);
        if (!record || record.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Record not found' });
        }
        res.json(record);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching record' });
    }
};
