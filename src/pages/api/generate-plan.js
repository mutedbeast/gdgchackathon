import OpenAI from "openai";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY, // Load API Key from .env.local
    });

    const { patient_information, lifestyle_information } = req.body;

    const promptData = {
        "task": "Generate a personalized treatment plan based on the patient’s genetic data, medical history, and lifestyle.",
        "patient_information": patient_information,
        "lifestyle_information": lifestyle_information,
        "expected_output": {
            "general_health_recommendations": "Provide an overview of the patient’s health risks, preventive care, and general wellness strategies.",
            "diet_nutrition_plan": "Suggest a customized meal plan based on dietary habits, allergies, and medical conditions.",
            "physical_activity_plan": "Recommend exercises suitable for the patient’s condition, fitness level, and lifestyle.",
            "sleep_improvement_plan": "Give strategies to improve sleep quality and manage disturbances.",
            "medication_supplement_guidance": "Suggest vitamins, supplements, or medications if applicable.",
            "addiction_management": "Provide steps to reduce or manage addictions.",
            "follow_up_monitoring": "Suggest regular check-ups, tests, and self-monitoring techniques."
        }
    };

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: JSON.stringify(promptData) }],
            max_tokens: 500,
        });

        res.status(200).json({ treatment_plan: response.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ error: "Failed to generate treatment plan" });
    }
}
