import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const WebApp = () => {
  const [formData, setFormData] = useState({});
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const structuredPrompt = {
      task: "Generate a personalized treatment plan based on the patient’s genetic data, medical history, and lifestyle.",
      patient_information: {
        blood_group: formData.bloodGroup,
        parental_medical_history: formData.parentalMedicalHistory,
        chronic_diseases: formData.chronicDiseases,
        acute_diseases: formData.acuteDiseases,
        genetic_disorders: formData.geneticDisorders,
        allergies: formData.allergies,
        vaccines_taken: formData.vaccinesTaken,
        previous_medications: formData.previousMedications,
      },
      lifestyle_information: {
        dietary_habits: formData.dietaryHabits,
        physical_activity: formData.physicalActivity,
        sleep_pattern: formData.sleepPattern,
        bmi: formData.bmi,
        height_weight: formData.heightWeight,
        screen_time: formData.screenTime,
        addictions: formData.addictions,
      },
    };

    const aiResponse = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer YOUR_API_KEY`,
      },
      body: JSON.stringify({ prompt: JSON.stringify(structuredPrompt), model: "gpt-4" }),
    }).then((res) => res.json());

    setResponse(aiResponse.choices[0].text);
  };

  return (
    <div className="p-6 bg-[#cfffdd] min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-[#2d6f3f]">Personalized Treatment Plan Generator</h1>
      <Card className="w-full max-w-2xl bg-[#68ba7f] p-4 mt-6">
        <CardContent>
          <Input name="bloodGroup" placeholder="Blood Group" onChange={handleChange} className="mb-2" />
          <Textarea name="parentalMedicalHistory" placeholder="Parental Medical History" onChange={handleChange} className="mb-2" />
          <Textarea name="chronicDiseases" placeholder="Chronic Diseases" onChange={handleChange} className="mb-2" />
          <Textarea name="acuteDiseases" placeholder="Acute Diseases" onChange={handleChange} className="mb-2" />
          <Textarea name="geneticDisorders" placeholder="Genetic Disorders" onChange={handleChange} className="mb-2" />
          <Textarea name="allergies" placeholder="Allergies" onChange={handleChange} className="mb-2" />
          <Textarea name="vaccinesTaken" placeholder="Vaccines Taken" onChange={handleChange} className="mb-2" />
          <Textarea name="previousMedications" placeholder="Previous Medications" onChange={handleChange} className="mb-2" />
          <Textarea name="dietaryHabits" placeholder="Dietary Habits" onChange={handleChange} className="mb-2" />
          <Textarea name="physicalActivity" placeholder="Physical Activity" onChange={handleChange} className="mb-2" />
          <Textarea name="sleepPattern" placeholder="Sleep Pattern" onChange={handleChange} className="mb-2" />
          <Input name="bmi" placeholder="BMI" onChange={handleChange} className="mb-2" />
          <Input name="heightWeight" placeholder="Height & Weight" onChange={handleChange} className="mb-2" />
          <Input name="screenTime" placeholder="Screen Time" onChange={handleChange} className="mb-2" />
          <Input name="addictions" placeholder="Addictions" onChange={handleChange} className="mb-2" />
          <Button onClick={handleSubmit} className="w-full bg-[#2d6f3f] text-white">Generate Treatment Plan</Button>
        </CardContent>
      </Card>
      {response && (
        <Card className="w-full max-w-2xl bg-[#253d2d] p-4 mt-6 text-white">
          <CardContent>
            <h2 className="text-xl font-bold">Treatment Plan</h2>
            <p>{response}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WebApp;
