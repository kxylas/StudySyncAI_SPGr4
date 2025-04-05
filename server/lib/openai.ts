import OpenAI from "openai";
import { Message } from "@shared/schema";
import fs from "fs";
import path from "path";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Load the CS program data
const programDataPath = path.join(process.cwd(), "attached_assets", "Pasted-About-the-Computer-Science-Program-The-Computer-Science-Program-provides-students-with-funda-1743800063769.txt");
const programData = fs.readFileSync(programDataPath, "utf-8");

// Parse the program data into sections for local fallback processing
const programSections = parseProgramData(programData);

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
    "Areas of Learning Focus",
    "The Bachelor of Science (B.S.) in Computer Science",
    "School-wide requirements",
    "Requirements for the B.S. Degree in Computer Science",
    "Computer Science Electives",
    "Suggested Curriculum Sequence",
    "Advisers",
    "Internship Opportunities",
    "Faculty and Staff",
    "Research",
    "News"
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
  
  // Check for common question patterns and return the appropriate information
  if (prompt.includes("program objectives") || prompt.includes("objective") || 
      prompt.includes("goal") || prompt.includes("aim")) {
    return formatResponse(`The primary objectives of the Computer Science Program at Morgan State University are:

1. Provide practical knowledge that will be of immediate use in the profession.
2. Provide a solid foundation in theoretical computer science, so that graduates will have the fundamentals necessary to acquire knowledge in a rapidly evolving discipline.

The program prepares students to:
- Apply principles of computing to identify solutions to complex problems
- Design, implement, and evaluate computing solutions
- Communicate effectively in professional contexts
- Make informed judgments based on legal and ethical principles
- Function effectively in teams
- Apply computer science theory and software development fundamentals`);
  }
  
  if (prompt.includes("elective") && prompt.includes("group a")) {
    return formatResponse(`Group A Electives in the Computer Science program include:

- COSC 238 - Object Oriented Programming (4 credits)
- COSC 239 - Java Programming (3 credits)
- COSC 243 - Computer Architecture (3 credits)
- COSC 251 - Introduction to Data Science (3 credits)
- CLCO 261 - Introduction to Cloud Computing (3 credits)

Students need to take three courses from Group A electives as part of their degree requirements.`);
  }
  
  if (prompt.includes("elective") && prompt.includes("group b")) {
    return formatResponse(`Group B Electives in the Computer Science program include:

- COSC 320 - Algorithm Design and Analysis (3 credits)
- COSC 323 - Introduction to Cryptography (3 credits)
- COSC 332 - Introduction to Game Design and Development (3 credits)
- COSC 338 - Mobile App Design & Development (3 credits)
- COSC 383 - Numerical Methods and Programming (3 credits)
- COSC 385 - Theory of Languages and Automata (3 credits)
- COSC 386 - Introduction to Quantum Computing (3 credits)
- MATH 313 - Linear Algebra II (3 credits)
- EEGR 317 - Electronic Circuits (4 credits)

Students need to take two courses from Group B electives as part of their degree requirements.`);
  }
  
  if (prompt.includes("elective") && prompt.includes("group c")) {
    return formatResponse(`Group C Electives in the Computer Science program include:

- COSC 470 - Artificial Intelligence (3 credits) OR COSC 472 - Introduction to Machine Learning (3 credits)
- COSC 460 - Computer Graphics (3 credits)
- COSC 480 - Introduction to Image Processing and Analysis (3 credits)
- COSC 486 - Applied Quantum Computing (3 credits)
- COSC 491 - Conference Course (3 credits)
- COSC 498 - Senior Internship (3 credits)
- COSC 499 - Senior Research or Teaching/Tutorial Assistantship (3 credits)
- CLCO 471 - Data Analytics in Cloud (3 credits)

Students need to take four courses from Group C electives as part of their degree requirements.`);
  }
  
  if (prompt.includes("elective") && prompt.includes("group d")) {
    return formatResponse(`Group D Electives in the Computer Science program include:

- INSS 391 - IT Infrastructure and Security (3 credits)
- INSS 494 - Information Security and Risk Management (3 credits)
- EEGR 481 - Introduction to Network Security (3 credits)
- EEGR 483 - Introduction to Security Management (3 credits)
- Any 300-400 level COSC Course not previously taken (3 credits)

Students need to take one course from Group D electives as part of their degree requirements.`);
  }
  
  if (prompt.includes("internship") || prompt.includes("career") || prompt.includes("job")) {
    return formatResponse(`Internship Opportunities at Morgan State University:

The Computer Science department has collaborations with many leading companies and organizations to provide internships and career opportunities for students, including:

- Google
- Facebook
- JP Morgan Chase
- NASA
- NSA
- Lockheed Martin
- And many other public and private organizations

For the most up-to-date information on internship opportunities:
1. Visit the Internship Opportunities Page on the Morgan CS website
2. Check the CS Twitter account: @Morgan_CompSci
3. Speak with your academic advisor about internship opportunities related to your specific interests`);
  }
  
  if (prompt.includes("graduation") || prompt.includes("requirement") || prompt.includes("graduate")) {
    return formatResponse(`Graduation Requirements for the B.S. Degree in Computer Science:

1. Complete General Education Requirements.
2. Earn six (6) credits in the Complementary Studies Program.
3. Pass the Senior Departmental Comprehensive Examination.
4. Take all junior and senior-level requirements in the major at Morgan State University.
5. Earn a cumulative average of 2.0 or better and a major average of 2.0 or better, with no outstanding grades below "C" in the major.

Credit Distribution:
- General Education and University Requirements: 44 credits
- Supporting Courses: 11 credits
- Required Courses for the Computer Science Major: 65 credits
- Total Credits Required: 120 credits

For more detailed information about specific course requirements, please check the curriculum sequence or speak with your academic advisor.`);
  }
  
  if (prompt.includes("advisor") || prompt.includes("adviser") || prompt.includes("faculty")) {
    return formatResponse(`Faculty and Department Leadership:

Department Chair:
- Shuangbao "Paul" Wang (Professor)
  Office: McMechen Hall 507
  Phone: (443) 885-4503
  Email: shuangbao.wang@morgan.edu

Associate Chair:
- Md Rahman (Professor)
  Office: McMechen 629
  Phone: (443) 885-1056
  Email: Md.Rahman@morgan.edu

Administrative Support:
- Wendy Smith (Administrative Assistant)
  Office: McMechen Hall 507A
  Phone: (443) 885-3962
  Email: Wendy.Smith@morgan.edu

- Grace Steele (Administrative Assistant)
  Office: McMechen 507
  Phone: (443) 885-1053

Director of Undergraduate Studies:
- Dr. Guobin Xu
  Email: guobin.xu@morgan.edu
  Phone: (443) 885-3371

For academic advising, you can find your assigned advisor on DegreeWorks or on the department's website.`);
  }
  
  if (prompt.includes("research") || prompt.includes("area")) {
    return formatResponse(`Research Areas in the Computer Science Department:

The department has active research in the following areas:

1. Artificial Intelligence / Machine Learning / Deep Learning
2. Quantum Computing and Quantum Cryptography
3. Cybersecurity
4. Data Science / Big Data Analytics
5. Human Computer Interactions
6. Cloud Computing
7. Robotics / Gaming

Recent research achievements include:
- Microsoft Award: $200,000 gift for cloud computing and emerging technologies research
- NSF Award in Quantum Computing and Quantum Cryptography
- Google Gift on Machine Learning and AI

For the latest research activities and opportunities, follow the CS department on Twitter: @Morgan_CompSci`);
  }
  
  // If no specific match, provide a general response
  return formatResponse(`Thank you for your question about "${userPrompt}".

As your Morgan State University CS program assistant, I provide information about:
- Program objectives and learning outcomes
- Course requirements and electives
- Graduation requirements
- Internship opportunities
- Faculty and advisors
- Research areas

Please try asking a more specific question about the CS program, such as:
- What are the Group A electives?
- What are the graduation requirements?
- Who are the faculty advisors?
- What research areas are available?

I'm here to help with any information about the Morgan State University Computer Science program!`);
}

function formatResponse(text: string): string {
  // Ensure the text is properly formatted
  return text.trim();
}

export { queryOpenAI };
