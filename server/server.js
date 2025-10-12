import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Configure CORS to allow your frontend
app.use(cors({
    origin: [
        'http://localhost:5173',           // Local development
        'http://localhost:3000',           // Alternative local port
        'https://next-step-wash-u-iz85.vercel.app/', // Replace with your actual Vercel URL
        'https://*.vercel.app'             // Allow all Vercel preview deployments
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { messages, journalMode } = req.body;

        // System prompts based on mode
        const systemPrompts = {
            conversation: "You are a supportive career counselor helping a college student explore career paths. Be encouraging, ask thoughtful questions, and help them reflect on their interests and goals. Keep responses concise (2-3 sentences).",
            venting: "You are a compassionate listener. The student just wants to vent without advice. Acknowledge their feelings with empathy. Keep responses brief and validating.",
            structured: "You are a career coach guiding structured reflection. Ask one focused question at a time to help the student clarify their thoughts about careers, skills, and goals."
        };

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Cheap and fast
            messages: [
                { role: "system", content: systemPrompts[journalMode] || systemPrompts.conversation },
                ...messages
            ],
            temperature: 0.7,
            max_tokens: 200 // Keep responses concise
        });

        res.json({
            message: completion.choices[0].message.content,
            usage: completion.usage
        });

    } catch (error) {
        console.error('OpenAI Error:', error);
        res.status(500).json({ error: 'Failed to get response' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});