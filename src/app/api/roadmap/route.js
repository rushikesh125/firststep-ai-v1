import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const promptTemplate = (assessmentData) => `
Based on the following assessment data, provide career recommendations in a structured JSON format.
Assessment data: ${JSON.stringify(assessmentData)}

Provide recommendations in exactly this JSON structure:
{
  "primaryCareerPaths": [{
    "career": string,
    "matchScore": number,
    "reasonForMatch": string,
    "industryOutlook": {
      "growthRate": string,
      "marketDemand": string,
      "futureProspects": string,
      "topRecruiters": [{
        "type": string,
        "companies": [string],
        "averagePackage": string
      }]
    },
    "subFields": [{
      "name": string,
      "description": string,
      "currentTrends": [string],
      "requiredSkills": {
        "technical": [{
          "skill": string,
          "technologies": [string],
          "proficiencyLevel": string
        }],
        "soft": [string]
      },
      "preparationResources": {
        "courses": [{
          "name": string,
          "platform": string,
          "duration": string,
          "cost": string,
          "certification": boolean,
          "link": string
        }]
      }
    }]
  }],
  "additionalInsights": {
    "careerProgression": {
      "year1": { "role": string, "focus": string, "expectedPackage": string },
      "year3": { "role": string, "focus": string, "expectedPackage": string },
      "year5": { "role": string, "focus": string, "expectedPackage": string }
    },
    "workLifeBalance": {
      "averageWorkHours": string,
      "remoteOpportunities": string,
      "stressLevel": string,
      "tips": [string]
    }
  }
}
`;

export async function POST(request) {
  try {
    const body = await request.json();
    const { assessmentData } = body;

    if (!message) {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const prompt = promptTemplate(assessmentData);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    let recommendations = null;
    try {
      recommendations = JSON.parse(text);
    } catch (err) {
      console.error("Error parsing AI response:", err);
      console.error("Raw response:", text);
      throw new Error("Failed to parse recommendations from AI response");
    }

    // Return the AI's response 
    // as JSON
    return new Response(JSON.stringify({ response: recommendations }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
