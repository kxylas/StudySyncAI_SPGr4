import OpenAI from "openai";
import { Message } from "@shared/schema";
import fs from "fs";
import path from "path";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Load the CS program data
const programDataPath = path.join(process.cwd(), "attached_assets", "Pasted-About-the-Computer-Science-Program-The-Computer-Science-Program-provides-students-with-funda-1743800063769.txt");
const programData = fs.readFileSync(programDataPath, "utf-8");

const systemPrompt = `
You are StudySyncAI, an intelligent assistant designed to help Morgan State University computer science students.
You provide accurate information about the Computer Science program, course requirements, and academic support.
You are friendly, helpful, and concise in your responses.

Here is the information about Morgan State University's Computer Science program:

${programData}

Always be truthful and helpful. If a question is outside the scope of the CS program at Morgan State, politely indicate that, but try to be as helpful as possible with the information you have.
Format your responses in a clear, readable way. Use bullet points and lists when appropriate.
`;

async function queryOpenAI(
  userPrompt: string,
  chatHistory: { role: string; content: string }[]
): Promise<string> {
  try {
    const messages = [
      { role: "system", content: systemPrompt },
      ...chatHistory.map(msg => ({
        role: msg.role as "user" | "assistant",
        content: msg.content
      })),
      { role: "user", content: userPrompt }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error querying OpenAI:", error);
    throw new Error("Failed to get a response from the AI service");
  }
}

export { queryOpenAI };
