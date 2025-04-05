import OpenAI from "openai";
import { Message } from "@shared/schema";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Hardcoded program data for fallback
const programData = `About the Computer Science Program:
The Computer Science Program provides students with fundamental computer science knowledge and training, and prepares them to apply their knowledge and training to produce solutions to specific problems. Students learn to define a problem clearly, determine its feasibility and choose an appropriate solution strategy.

Primary Objective of the Computer Science Curriculum:
- Provide practical knowledge that will be of immediate use in the profession.
- Provide a solid foundation in theoretical computer science, so that graduates will have the fundamentals necessary to acquire knowledge in a rapidly evolving discipline.

Bachelor of Computer Science degree students learning outcomes:
- Analyze a complex computing problem and apply principles of computing to identify solutions.
- Design, implement, and evaluate computing-based solutions for specific requirements.
- Communicate effectively in professional contexts.
- Recognize professional responsibilities and make informed judgments based on legal and ethical principles.
- Function effectively as a member or leader of a team.
- Apply computer science theory and software development fundamentals.

Areas of Learning Focus:
Software Engineering, Cybersecurity, Artificial Intelligence, Quantum Cryptography, Data Science, Game/Robotics, Quantum Computing, Cloud Computing.`;

// Parse the program data into sections for local fallback processing
const programSections = parseProgramData(programData);

const systemPrompt = `
You are msuStudySyncAI, an intelligent assistant designed to help Morgan State University computer science students.
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

    // First try to use OpenAI API
    try {
      // Cast the messages to the correct type expected by OpenAI
      const typedMessages: ChatCompletionMessageParam[] = messages.map(msg => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      }));

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: typedMessages,
        temperature: 0.7,
        max_tokens: 1000,
      });

      return response.choices[0].message.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("Error querying OpenAI:", error);
      
      // If OpenAI fails, use our local fallback
      return generateLocalResponse(userPrompt, chatHistory);
    }
  } catch (error) {
    console.error("Error in query handler:", error);
    throw new Error("Failed to get a response from the AI service");
  }
}

// Function to parse program data into sections for easier processing
function parseProgramData(data: string): Record<string, string> {
  const sections: Record<string, string> = {};
  
  // Define major sections to look for
  const sectionHeaders = [
    "About the Computer Science Program",
    "Primary Objective of the Computer Science Curriculum",
    "Bachelor of Computer Science degree students learning outcomes",
    "Areas of Learning Focus"
  ];
  
  let currentSection = "general";
  const lines = data.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this line is a section header
    const matchedHeader = sectionHeaders.find(header => line.includes(header));
    if (matchedHeader) {
      currentSection = matchedHeader;
      sections[currentSection] = line;
    } else if (currentSection && line) {
      // Append the line to the current section
      sections[currentSection] = (sections[currentSection] || "") + "\n" + line;
    }
  }
  
  return sections;
}

// Local fallback function to generate responses without OpenAI
function generateLocalResponse(
  userPrompt: string, 
  chatHistory: { role: string; content: string }[]
): string {
  const prompt = userPrompt.toLowerCase();
  
  // Extract context from chat history
  const context = getContextFromHistory(chatHistory);
  
  // Check for broad topics first
  const topicMatches = {
    program: [
      "program", "degree", "bachelor", "bs", "b.s.", "computer science", "cs", "major", 
      "what's the program", "tell me about", "overview"
    ],
    objectives: [
      "objectives", "goal", "aim", "purpose", "why study", "outcome", "learning",
      "focus", "what will i learn", "skills", "knowledge", "benefit"
    ],
    electives: [
      "elective", "course", "class", "option", "choose", "select", "group", "pick",
      "what classes", "what courses", "subject"
    ]
  };
  
  // Function to check if a prompt matches any of the topic keywords
  const matchesTopic = (topicKeywords: string[]) => {
    return topicKeywords.some(keyword => prompt.includes(keyword));
  };
  
  // Check for multi-topic questions or contextual questions
  if ((matchesTopic(topicMatches.program) && matchesTopic(topicMatches.objectives)) || 
      prompt.includes("what is the program about") || 
      prompt.includes("tell me about the program") ||
      prompt.includes("what's cs program") ||
      prompt.includes("about morgan") ||
      (prompt.length < 15 && (prompt.includes("about") || prompt.includes("info")))) {
    return formatResponse(`The Computer Science Program at Morgan State University provides students with fundamental computer science knowledge and training. The program has two primary objectives:

1. Provide practical knowledge that is immediately useful in the profession
2. Build a solid foundation in theoretical computer science for continued learning in this rapidly evolving field

The program prepares students to define problems clearly, determine feasibility, and develop appropriate solution strategies. Students learn to:
- Apply computing principles to solve complex problems
- Design and evaluate computing-based solutions
- Communicate effectively in professional contexts
- Make informed judgments based on legal and ethical principles
- Function effectively in team environments
- Apply computer science theory and software development fundamentals

The program focuses on several key areas including Software Engineering, Cybersecurity, Artificial Intelligence, Quantum Computing, Data Science, Game Development, Robotics, and Cloud Computing.`);
  }

  // Check for questions about general program objectives
  if (matchesTopic(topicMatches.objectives) || 
      prompt.includes("what do students learn") || 
      prompt.includes("what will i learn") ||
      prompt.includes("what's the purpose") ||
      (context.includes("objectives") && (prompt.includes("what") || prompt.includes("tell me more")))) {
    return formatResponse(`The primary objectives of the Computer Science Program at Morgan State University are:

1. Provide practical knowledge that will be of immediate use in the profession.
2. Provide a solid foundation in theoretical computer science, so that graduates will have the fundamentals necessary to acquire knowledge in a rapidly evolving discipline.

The program prepares students to:
- Apply principles of computing to identify solutions to complex problems
- Design, implement, and evaluate computing-based solutions
- Communicate effectively in professional contexts
- Make informed judgments based on legal and ethical principles
- Function effectively in teams
- Apply computer science theory and software development fundamentals

These objectives are designed to ensure students can work in the industry immediately upon graduation, while also having the theoretical foundation necessary to adapt to changes in technology throughout their careers.`);
  }
  
  // If no patterns match, provide a more helpful general response
  return formatResponse(`Thank you for your question about "${userPrompt}".

I can provide you with information about the Morgan State University Computer Science program including:

- Program overview and objectives
- Curriculum structure and course requirements
- Elective options in different focus areas
- Graduation requirements and credit hours
- Faculty members and department leadership
- Internship and career opportunities
- Research areas and achievements
- Application and admission process

Based on your question, it seems you're interested in learning more about the CS program. Could you please let me know which specific aspect you'd like more information about?`);
}

// Helper function to extract context from chat history
function getContextFromHistory(chatHistory: { role: string; content: string }[]): string {
  // Extract the last 3 exchanges to provide context
  const recentMessages = chatHistory.slice(-6);
  
  // Join messages into a single string for context analysis
  return recentMessages.map(msg => msg.content.toLowerCase()).join(" ");
}

// Helper to format response text
function formatResponse(text: string): string {
  // Clean up the text, ensure paragraphs are separated properly
  return text.replace(/\n{3,}/g, "\n\n").trim();
}

export { queryOpenAI };