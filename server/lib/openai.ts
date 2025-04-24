import OpenAI from "openai";
import { Message } from "@shared/schema";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";

// The newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || "" });

// Hardcoded program data for fallback
const programData = `About Morgan State University:
Morgan State University is a historically Black research university (HBCU) located in Baltimore, Maryland. Founded in 1867 as the Centenary Biblical Institute, it was initially established to train young men for ministry. The institution was renamed Morgan College in 1890 in honor of Reverend Lyttleton Morgan, the first chairman of its Board of Trustees. Morgan State awarded its first baccalaureate degree in 1895. It became a public institution in 1939 when the state of Maryland purchased it to provide greater educational opportunities for Black citizens. In 1975, Morgan State achieved university status and was authorized to offer doctoral programs. Notable alumni include Mo'Nique (actress), Earl G. Graves Sr. (founder of Black Enterprise magazine), and Kweisi Mfume (former President of the NAACP and U.S. Congressman).

About the Computer Science Program:
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
Software Engineering, Cybersecurity, Artificial Intelligence, Quantum Cryptography, Data Science, Game/Robotics, Quantum Computing, Cloud Computing.

Graduate Programs in Computer Science:
Morgan State University offers the following graduate programs in Computer Science:

1. Master of Science (M.S.) in Advanced Computing:
   - Available both online and onsite
   - Focus areas: Cybersecurity, Artificial Intelligence, Data Science, Cloud Computing
   - Completion options: Coursework only, project track, or thesis track
   - Designed for specialization in high-demand fields

2. Doctor of Philosophy (Ph.D.) in Advanced Computing:
   - Research areas: Quantum Cryptography, Algorithms, Cybersecurity, AI/ML, Data Analytics
   - Emphasizes responsible computing innovations
   - Available on campus or fully online/remote

3. Master of Science (M.S.) in Bioinformatics:
   - Coursework in computational biology methods, programming, and biostatistics
   - Flexible electives to specialize in life sciences and computer sciences
   - Prepares graduates for the growing field of bioinformatics

Other Related Graduate Programs:
- Ph.D. in Interdisciplinary Engineering, Information, and Computational Sciences
- Master of Science (M.S.) in Data Analytics and Visualization (Department of Mathematics)
- Master of Science (M.S.) in Electrical Engineering (Clarence M. Mitchell, Jr. School of Engineering)

These graduate programs prepare students for high-level research and professional positions in specialized computing fields. The programs emphasize research in Artificial Intelligence, Machine Learning, Quantum Computing, Cybersecurity, and Data Science. Morgan State's graduate programs in computer science have received grants and support from organizations like NSA, IBM, and Microsoft to fund scholarships, research opportunities, and specialized equipment.`;

// We're skipping the file loading and going straight to using the embedded data

const systemPrompt = `
You are msuStudySyncAI, an intelligent assistant designed to help Morgan State University computer science students.
You provide accurate information about the Computer Science program, course requirements, and academic support.
You are friendly, helpful, and extremely concise in your responses.

Here is the information about Morgan State University's Computer Science program:

${programData}

IMPORTANT: Keep your responses direct and brief. Provide only essential information in 1-3 sentences or short bullet points unless the user specifically asks for detailed information.

STUDY SCHEDULE GENERATION: You can create personalized study schedules when users provide their deadlines, course names, and available study time. When a user asks for a study schedule:
1. If they don't provide enough information, ask specifically for:
   - Course names/subjects they need to study for
   - Deadlines for each course/exam
   - Their available study time (hours per day/week)
   - Any specific topics they find challenging
2. Create a day-by-day schedule that breaks down study sessions by subject
3. Balance time between subjects based on difficulty and deadline proximity
4. Include short breaks between sessions
5. Structure output as a clear, formatted schedule with dates and times

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
        temperature: 0.5, // Lower temperature for more predictable, focused responses
        max_tokens: 600,  // Reduced token limit to encourage brevity
        frequency_penalty: 0.5, // Discourage repetition
        presence_penalty: 0.2,  // Slightly discourage mentioning already-mentioned concepts
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
    "About Morgan State University",
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
  
  // Extract context from chat history
  const context = getContextFromHistory(chatHistory);
  
  // Check for broad topics first
  const topicMatches = {
    university: [
      "university", "morgan state", "morgan", "hbcu", "history", "founded", "school", "location", 
      "baltimore", "maryland", "when was", "where is", "alumni", "notable"
    ],
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
    ],
    groupA: [
      "group a", "a elective", "238", "239", "243", "251", "261", "object", "java", "data science"
    ],
    groupB: [
      "group b", "b elective", "320", "323", "332", "338", "383", "385", "386", "313", "317",
      "algorithm", "game", "mobile", "cryptography"
    ],
    groupC: [
      "group c", "c elective", "470", "472", "460", "480", "486", "491", "498", "499", "471",
      "ai", "artificial", "machine", "graphics", "image", "quantum", "internship"
    ],
    groupD: [
      "group d", "d elective", "391", "494", "481", "483", "security"
    ],
    requirements: [
      "requirement", "graduate", "graduation", "credit", "gpa", "grade", "pass", "need to", 
      "have to", "required", "finish", "complete", "degree requirement", "how many"
    ],
    faculty: [
      "faculty", "professor", "teacher", "instructor", "staff", "department chair",
      "who teaches", "contact", "chair", "director"
    ],
    advisors: [
      "adviser", "advisor", "counselor", "academic advisor", "academic adviser", 
      "find advisor", "find my advisor", "who is my advisor", "advising", "schedule advising", 
      "advising appointment", "meet with advisor"
    ],
    internships: [
      "internship", "career", "job", "employment", "work", "industry", "opportunity",
      "practical", "experience", "company", "corporate", "position", "hire", "hiring"
    ],
    research: [
      "research", "project", "study", "investigation", "area", "field", "topic", "interest",
      "focus area", "specialization", "lab", "laboratory", "grant", "funding"
    ],
    curriculum: [
      "curriculum", "schedule", "sequence", "plan", "path", "roadmap", "year", "semester", 
      "freshman", "sophomore", "junior", "senior", "first year", "second year", "third year", "fourth year"
    ],
    credits: [
      "credit", "hour", "120", "how many", "units", "total"
    ],
    graduate: [
      "graduate", "grad", "ms", "master", "master's", "masters", "phd", "doctorate", 
      "doctoral", "advanced computing", "bioinformatics", "graduate school", "grad school"
    ]
  };
  
  // Function to check if a prompt matches any of the topic keywords
  const matchesTopic = (topicKeywords: string[]) => {
    return topicKeywords.some(keyword => prompt.includes(keyword));
  };

  // STUDY SCHEDULE DETECTION FIRST - Process before any other matchers
  // Check for study schedule requests - higher priority pattern to intercept before electives matcher
  if ((prompt.includes("study schedule") || prompt.includes("schedule for") || prompt.includes("create a schedule") || 
      prompt.includes("plan my study") || prompt.includes("study plan") || prompt.includes("study time")) ||
      prompt.includes("generate a study schedule") ||  // Added for form-generated requests
      prompt.includes("please create a study schedule") || // Added for form-generated requests
      (prompt.includes("courses") && prompt.includes("deadline")) || // Remove study requirement for matching
      (prompt.includes("available study time"))) { // Specific form field from StudyScheduleForm
    
    // Attempt to extract course information
    const courseMatches = prompt.match(/[-•*]\s*(.*?):\s*due\s*on\s*(.*?)(\(specific topics:\s*(.*?)\))?($|\n)/gi);
    const timeMatch = prompt.match(/available\s*study\s*time:\s*(.*?)($|\n)/i);
    
    const currentDate = new Date();
    const courseInfo = courseMatches ? courseMatches.map(match => {
      const courseParts = match.match(/[-•*]\s*(.*?):\s*due\s*on\s*(.*?)(?:\(specific topics:\s*(.*?)\))?($|\n)/i);
      if (courseParts) {
        return {
          course: courseParts[1].trim(),
          deadline: courseParts[2].trim(),
          topics: courseParts[3] ? courseParts[3].trim() : ''
        };
      }
      return null;
    }).filter(Boolean) : [];
    
    const availableTime = timeMatch ? timeMatch[1].trim() : '';
    
    if (courseInfo.length > 0 && availableTime) {
      // Format a sample study schedule response
      let scheduleResponse = `# Personalized Study Schedule\n\n`;
      
      // Basic scheduling logic
      const daysUntilDeadlines: Record<string, number> = {};
      const today = new Date();
      
      for (const course of courseInfo) {
        if (course && course.course && course.deadline) {
          // Parse availability days from the input
      const availableDays: number[] = [];
      if (availableTime.toLowerCase().includes('monday')) availableDays.push(1); // Monday is 1 (0 is Sunday)
      if (availableTime.toLowerCase().includes('tuesday')) availableDays.push(2);
      if (availableTime.toLowerCase().includes('wednesday')) availableDays.push(3);
      if (availableTime.toLowerCase().includes('thursday')) availableDays.push(4);
      if (availableTime.toLowerCase().includes('friday')) availableDays.push(5);
      if (availableTime.toLowerCase().includes('saturday')) availableDays.push(6);
      if (availableTime.toLowerCase().includes('sunday')) availableDays.push(0);
      
      // If no specific days mentioned, assume all days are available
      if (availableDays.length === 0) {
        availableDays.push(0, 1, 2, 3, 4, 5, 6); // All days of the week
      }
      
      // Basic scheduling logic
      const today = new Date();
      
      // Find earliest deadline to know how many days we need to schedule
      let earliestDeadline = new Date();
      earliestDeadline.setFullYear(earliestDeadline.getFullYear() + 1); // Default to 1 year from now
      
      for (const course of courseInfo) {
        if (course && course.course && course.deadline) {
          try {
            const deadlineDate = new Date(course.deadline);
            if (!isNaN(deadlineDate.getTime()) && deadlineDate < earliestDeadline) {
              earliestDeadline = deadlineDate;
            }
          } catch (e) {
            console.error("Error parsing date:", e);
          }
        }
      }
      
      // Calculate days until earliest deadline
      const daysUntilDeadline = Math.max(0, Math.floor((earliestDeadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
      
      // Create a schedule up to the earliest deadline or 14 days max, whichever is less
      const maxDays = Math.min(14, daysUntilDeadline);
      const schedule = [];
      let scheduledDays = 0;
      let daysChecked = 0;
      
      // Don't schedule past the deadline
      while (scheduledDays < 5 && daysChecked < maxDays) {
        daysChecked++;
        const day = new Date(today);
        day.setDate(today.getDate() + daysChecked);
        
        // Skip this day if it's not in the available days
        if (!availableDays.includes(day.getDay())) {
          continue;
        }
        
        // Skip days that are on or after any deadline
        let isAfterDeadline = false;
        for (const course of courseInfo) {
          if (course && course.deadline) {
            const deadlineDate = new Date(course.deadline);
            if (!isNaN(deadlineDate.getTime()) && day >= deadlineDate) {
              isAfterDeadline = true;
              break;
            }
          }
        }
        
        if (isAfterDeadline) {
          continue;
        }
        
        scheduledDays++;
        
        const formattedDate = day.toLocaleDateString('en-US', { 
          weekday: 'long', 
          month: 'long', 
          day: 'numeric',
          year: 'numeric'
        });
        
        schedule.push(`## ${formattedDate}\n`);
        
        // Assign study sessions based on deadline proximity
        for (const course of courseInfo) {
          if (course && course.course) {
            let studyDuration = '';
            
            if (availableTime.includes('hour')) {
              const hourMatch = availableTime.match(/(\d+)\s*hours?/i);
              if (hourMatch) {
                const totalHours = parseInt(hourMatch[1]);
                studyDuration = Math.max(1, Math.min(2, Math.floor(totalHours / courseInfo.length))) + ' hours';
              } else {
                studyDuration = '1 hour';
              }
            } else {
              studyDuration = '1 hour';
            }
            
            schedule.push(`- **${course.course}** (${studyDuration})\n  - Focus: ${course.topics || 'General review'}\n  - Take a 10-minute break after this session\n`);
          }
        }
        
        schedule.push('\n');
      }
      
      scheduleResponse += schedule.join('');
      scheduleResponse += `\n## Study Tips:\n- Break large topics into smaller, manageable chunks\n- Use active recall techniques (flashcards, practice problems)\n- Review material regularly to reinforce learning\n- Get enough sleep before deadlines\n\nThis schedule prioritizes your course work based on deadline proximity. Adjust as needed based on your progress and energy levels.`;
      
      return formatResponse(scheduleResponse);
    } else {
      // If we don't have enough information, ask for it
      return formatResponse(`I'd be happy to create a personalized study schedule for you. To make it effective, please provide:

1. Course names/subjects and their deadlines (e.g., "Algorithms: due on April 25")
2. Any specific topics you need to focus on for each course
3. Your available study time (e.g., "3 hours on weekdays after 6pm")

Format your request like this:
"Please create a study schedule for:
- Course 1: due on [date] (specific topics: topic1, topic2)
- Course 2: due on [date] (specific topics: topic3, topic4)
My available study time: [your available hours]"

Once you provide this information, I'll create a day-by-day schedule that balances your subjects and includes appropriate breaks.`);
    }
  }
  
  // Check for thank you messages
  if (prompt.includes("thank") || prompt.includes("thanks") || prompt === "ty") {
    return formatResponse(`You're welcome! Feel free to ask if you have any other questions about Morgan State's CS program.`);
  }
  
  // Check for university history and info questions
  if (matchesTopic(topicMatches.university) || 
      prompt.includes("tell me about morgan") ||
      prompt.includes("morgan state history") ||
      prompt.includes("where is morgan") ||
      prompt.includes("when was morgan founded") ||
      prompt.includes("who are famous alumni")) {
    return formatResponse(`Morgan State University is a historically Black research university (HBCU) located in Baltimore, Maryland. Here are key facts about its history and legacy:

Founded: 1867 as the Centenary Biblical Institute by the Baltimore Conference of the Methodist Episcopal Church
Original Purpose: Initially established to train young men for ministry
Renaming: Renamed Morgan College in 1890 in honor of Reverend Lyttleton Morgan, first chairman of its Board of Trustees
First Degree: Awarded its first baccalaureate degree in 1895
Public Institution: Became a public institution in 1939 when the state of Maryland purchased it
University Status: Achieved university status in 1975 and was authorized to offer doctoral programs

Morgan State University is recognized as Maryland's Preeminent Public Urban Research University and has produced many notable alumni including:
- Mo'Nique (Academy Award-winning actress)
- Earl G. Graves Sr. (founder of Black Enterprise magazine)
- Kweisi Mfume (former President of the NAACP and U.S. Congressman)
- And many other leaders in arts, politics, education, and business

The university continues to be a vital institution serving a diverse student body while maintaining its rich heritage as an HBCU.`);
  }

  // Check for multi-topic questions or contextual questions
  if ((matchesTopic(topicMatches.program) && matchesTopic(topicMatches.objectives)) || 
      prompt.includes("what is the program about") || 
      prompt.includes("tell me about the program") ||
      prompt.includes("what's cs program") ||
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

The program focuses on several key areas including Software Engineering, Cybersecurity, Artificial Intelligence, Quantum Computing, Data Science, Game Development, Robotics, and Cloud Computing.

To graduate, students need to complete 120 credit hours, maintain a GPA of 2.0 or better, and pass a comprehensive examination.`);
  }

  // Check for questions about general program objectives
  if (matchesTopic(topicMatches.objectives) || 
      prompt.includes("what do students learn") || 
      prompt.includes("what will i learn") ||
      prompt.includes("what's the purpose") ||
      (context.includes("objectives") && (prompt.includes("what") || prompt.includes("tell me more")))) {
    return formatResponse(`The primary objectives of the Morgan State University Computer Science program are to:

1. Develop strong problem-solving skills for analyzing complex computing problems and applying principles of computing to identify solutions.

2. Teach students to design, implement, and evaluate computing-based solutions for specific requirements.

3. Build effective communication skills for professional contexts.

4. Foster an understanding of professional responsibilities and ethical principles in computing.

5. Develop teamwork skills for functioning effectively in collaborative environments.

6. Provide a solid foundation in computer science theory and software development fundamentals.

7. Prepare students for careers in high-demand areas such as Software Engineering, Cybersecurity, Artificial Intelligence, Quantum Computing, Data Science, and Game Development.

8. Cultivate the analytical and technical skills needed for lifelong learning in a rapidly evolving field.

Students can choose electives that allow them to concentrate in these areas based on their interests and career goals.`);
  }
  
  // Enhanced checking for elective groups - check for electives generally first
  // Make sure it doesn't match when it's actually a study schedule request
  if (matchesTopic(topicMatches.electives) && 
     !(prompt.includes("group a") || prompt.includes("group b") || 
       prompt.includes("group c") || prompt.includes("group d")) &&
     !(prompt.includes("study schedule") || prompt.includes("create a schedule") ||
       prompt.includes("available study time") || prompt.includes("Please create a study schedule"))) {
    return formatResponse(`The Computer Science program at Morgan State University organizes electives into four groups:

Group A - Foundation courses like Object-Oriented Programming, Java, Computer Architecture, and Data Science (students take 3 courses)

Group B - Advanced theory and specialized areas including Algorithm Design, Cryptography, Game Design, Mobile App Development, and Quantum Computing (students take 2 courses)

Group C - Applied specialized fields like AI, Machine Learning, Graphics, Image Processing, Internships, and Research (students take 4 courses)

Group D - Security-focused courses including Network Security and Risk Management (students take 1 course)

These electives allow students to customize their education based on their interests and career goals. Would you like details about a specific group of electives?`);
  }
  
  // Now check for specific elective groups
  if (matchesTopic(topicMatches.groupA) || 
      (context.includes("elective") && prompt.includes("group a"))) {
    return formatResponse(`Group A Electives in the Computer Science program include:

- COSC 238 - Object Oriented Programming (4 credits)
- COSC 239 - Java Programming (3 credits)
- COSC 243 - Computer Architecture (3 credits)
- COSC 251 - Introduction to Data Science (3 credits)
- CLCO 261 - Introduction to Cloud Computing (3 credits)

Students need to take three courses from Group A electives as part of their degree requirements. These courses provide a foundation in essential programming paradigms and platforms.`);
  }
  
  if (matchesTopic(topicMatches.groupB) || 
      (context.includes("elective") && prompt.includes("group b"))) {
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

Students need to take two courses from Group B electives as part of their degree requirements. These courses build on the foundation courses and introduce students to more specialized areas of computer science.`);
  }
  
  if (matchesTopic(topicMatches.groupC) || 
      (context.includes("elective") && prompt.includes("group c"))) {
    return formatResponse(`Group C Electives in the Computer Science program include:

- COSC 470 - Artificial Intelligence (3 credits) OR COSC 472 - Introduction to Machine Learning (3 credits)
- COSC 460 - Computer Graphics (3 credits)
- COSC 480 - Introduction to Image Processing and Analysis (3 credits)
- COSC 486 - Applied Quantum Computing (3 credits)
- COSC 491 - Conference Course (3 credits)
- COSC 498 - Senior Internship (3 credits)
- COSC 499 - Senior Research or Teaching/Tutorial Assistantship (3 credits)
- CLCO 471 - Data Analytics in Cloud (3 credits)

Students need to take four courses from Group C electives as part of their degree requirements. These advanced courses allow students to delve deeper into specialized areas of computer science and gain practical experience.`);
  }
  
  if (matchesTopic(topicMatches.groupD) || 
      (context.includes("elective") && prompt.includes("group d"))) {
    return formatResponse(`Group D Electives in the Computer Science program include:

- INSS 391 - IT Infrastructure and Security (3 credits)
- INSS 494 - Information Security and Risk Management (3 credits)
- EEGR 481 - Introduction to Network Security (3 credits)
- EEGR 483 - Introduction to Security Management (3 credits)
- Any 300-400 level COSC Course not previously taken (3 credits)

Students need to take one course from Group D electives as part of their degree requirements. These courses focus on cybersecurity aspects, which is an increasingly important area in computer science.`);
  }
  
  // Check for internship questions
  if (matchesTopic(topicMatches.internships) || prompt.includes("where can i work")) {
    return formatResponse(`Internship Opportunities at Morgan State University:

The Computer Science department has established collaborations with many leading companies and organizations to provide valuable internships and career opportunities for students, including:

- Google
- Facebook
- JP Morgan Chase
- NASA
- NSA
- Lockheed Martin
- And many other public and private organizations

These internships help students gain practical experience, build professional networks, and often lead to full-time employment opportunities after graduation.

For the most up-to-date information on internship opportunities:
1. Visit the Internship Opportunities Page on the Morgan CS website
2. Check the CS Twitter account: @Morgan_CompSci
3. Speak with your academic advisor about internship opportunities related to your specific interests

Students can also earn credit through COSC 498 - Senior Internship (3 credits), which is a Group C elective.`);
  }
  
  // Check for graduation requirement questions
  if (matchesTopic(topicMatches.requirements) || 
      prompt.includes("what do i need") || 
      prompt.includes("how do i graduate")) {
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

Required courses include Introduction to Computer Science I & II, Data Structures and Algorithms, Computer Systems, Cybersecurity, Computer Networks, Database Design, Software Engineering, and others.

For more detailed information about specific course requirements, please check the curriculum sequence or speak with your academic advisor.`);
  }
  
  // Check for credit hour questions
  if (matchesTopic(topicMatches.credits) || prompt.includes("class count") || prompt.includes("course count")) {
    return formatResponse(`Credit Hour Requirements for the Computer Science B.S. Degree:

A minimum of 120 credit hours are required to graduate with a B.S. in Computer Science. These credit hours are distributed as follows:

- General Education and University Requirements: 44 credits
  (Includes English, Mathematics, Humanities, Social/Behavioral Sciences, etc.)

- Supporting Courses: 11 credits
  (Includes Calculus I & II, Linear Algebra, Applied Probability and Statistics)

- Required Courses for the Computer Science Major: 65 credits
  (Includes core Computer Science courses and electives)

The 65 credits for the major include:
- Core required CS courses
- Three Group A electives
- Two Group B electives
- Four Group C electives
- One Group D elective

This structure ensures students receive a well-rounded education with both depth in computer science and breadth in related disciplines.`);
  }
  
  // Check for graduate program questions
  if (matchesTopic(topicMatches.graduate) || 
      prompt.includes("masters") || 
      prompt.includes("phd program") || 
      prompt.includes("bioinformatics") ||
      prompt.includes("advanced computing") ||
      (prompt.includes("does") && prompt.includes("cs") && prompt.includes("department") && prompt.includes("offer") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("cs") && prompt.includes("department") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("computer science") && prompt.includes("department") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("morgan") && prompt.includes("offer") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("morgan") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("cs") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("computer science") && prompt.includes("graduate")) ||
      (prompt.includes("cs") && prompt.includes("department") && prompt.includes("graduate")) ||
      (prompt.includes("cs") && prompt.includes("offer") && prompt.includes("graduate")) ||
      prompt.includes("what graduate programs") ||
      prompt.includes("graduate programs")) {
      
      console.log("Graduate program pattern matched for: " + prompt);
    return formatResponse(`Morgan State University offers the following graduate programs in Computer Science:

1. Master of Science (M.S.) in Advanced Computing (Online/Onsite):
   - Focus areas: Cybersecurity, Artificial Intelligence, Data Science, Cloud Computing
   - Completion options: Coursework only, project track, or thesis track
   - Available both online and in-person

2. Doctor of Philosophy (Ph.D.) in Advanced Computing:
   - Research areas: Quantum Cryptography, Algorithms, Cybersecurity, AI/ML, Data Analytics
   - Emphasizes responsible computing innovations
   - Available on campus or fully online/remote

3. Master of Science (M.S.) in Bioinformatics:
   - Coursework in computational biology methods, programming, and biostatistics
   - Flexible electives to specialize in life sciences and computer sciences
   - Prepares graduates for the growing bioinformatics field

Other related graduate programs at Morgan State:
- Ph.D. in Interdisciplinary Engineering, Information, and Computational Sciences
- Master of Science (M.S.) in Data Analytics and Visualization (Mathematics Department)
- Master of Science (M.S.) in Electrical Engineering

For more details: Visit the Morgan State University Department of Computer Science website`);
  }
  
  // Check for faculty questions
  if (matchesTopic(topicMatches.faculty) || prompt.includes("who runs") || prompt.includes("in charge")) {
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

For academic advising, you can find your assigned advisor on DegreeWorks or on the department's website. The department has a team of qualified faculty with expertise in various areas of computer science who are dedicated to student success.`);
  }
  
  // Check for advisor-specific questions
  if (matchesTopic(topicMatches.advisors) || 
      prompt.includes("advising appointment") || 
      prompt.includes("find my advisor") || 
      (prompt.includes("advisor") && prompt.includes("how"))) {
    return formatResponse(`Academic Advising in the Computer Science Department:

The Computer Science Department at Morgan State University assigns academic advisors based on the first letter of your last name.

To find your advisor:
1. Check DegreeWorks through your Morgan State student portal
2. Visit the CS Department website's advising section
3. Contact the department office: (443) 885-3962

Scheduling an advising appointment:
1. Email your assigned advisor directly to set up an appointment
2. Include your name, ID number, and general topics you want to discuss
3. For urgent matters, visit during posted office hours

Important advising periods are:
- Pre-registration advising: 2-3 weeks before course registration opens
- Add/drop period at the beginning of each semester
- Graduation clearance: Early in your final semester

Your advisor can help with course selection, degree progress tracking, internship opportunities, career planning, and academic challenges.`);
  }
  
  // Check for research questions
  if (matchesTopic(topicMatches.research) || prompt.includes("what kind of research")) {
    return formatResponse(`Research Areas in the Morgan State University Computer Science Department:

The department conducts research across several cutting-edge areas of computer science:

1. Artificial Intelligence and Machine Learning
   Research in neural networks, deep learning, natural language processing, and computer vision

2. Cybersecurity and Privacy
   Advanced methods for network security, cryptography, secure systems, and digital forensics

3. Data Science and Analytics
   Big data technologies, data mining, visualization, and predictive analytics

4. Quantum Computing
   Theoretical and applied research in quantum algorithms, quantum cryptography, and quantum simulation

5. Human-Computer Interaction
   Studying how people interact with computers and designing better interfaces

6. Cloud Computing
   Research on distributed computing systems and services delivered over the internet

7. Robotics / Gaming
   Development of autonomous systems, simulators, and interactive experiences

The department has received research funding from NSF, DOD, NASA, and other agencies. Students can get involved in research through Group C electives like COSC 499 - Senior Research, or by directly contacting faculty members working in areas of interest.`);
  }
  
  // Check for curriculum sequence questions
  if (matchesTopic(topicMatches.curriculum) || 
      prompt.includes("what years") || 
      prompt.includes("what order") || 
      (prompt.includes("take") && prompt.includes("classes"))) {
    return formatResponse(`Suggested Curriculum Sequence for B.S. in Computer Science at Morgan State University:

FRESHMAN YEAR
- Semester 1: COSC 112 (Intro to CS I), MATH 241 (Calculus I), ENGL 101, Gen Ed Health, Gen Ed Humanities
- Semester 2: COSC 113 (Intro to CS II), MATH 242 (Calculus II), ENGL 102, PHYS 205 + 205L, HUMA 201

SOPHOMORE YEAR
- Semester 1: COSC 220 (Data Structures), COSC 241 (Computer Systems), MATH 312 (Linear Algebra), Gen Ed Humanities, Gen Ed Art/Music
- Semester 2: COSC 221 (Algorithms), COSC 230 (Web Development), MATH 331 (Probability & Stats), Gen Ed Social Science, Group A Elective

JUNIOR YEAR
- Semester 1: COSC 348 (Database Design), COSC 350 (Software Engineering), Group A Electives (2), Complementary Studies
- Semester 2: COSC 349 (Networks), COSC 351 (Cybersecurity), COSC 352 (Programming Languages), Group B Elective

SENIOR YEAR
- Semester 1: COSC 354 (Operating Systems), MATH 331 (Statistics), Group B Elective, General Education
- Semester 2: COSC 490 (Senior Project), Group C Electives (4), Group D Elective

This sequence may vary based on course availability and individual circumstances. Always consult with your academic advisor when planning your schedule.`);
  }
  
  // Check for summary of program info
  if (prompt.includes("overview") || prompt.includes("summary") || prompt.includes("outline") || 
      prompt.includes("key points") || prompt === "cs program" || prompt === "cs department") {
    return formatResponse(`Morgan State University Computer Science Program Overview:

1. Degree: Bachelor of Science (B.S.) in Computer Science requiring 120 credit hours:
   - 44 credits of general education requirements
   - 11 credits of supporting courses (math & physics)
   - 65 credits of computer science major requirements including electives

2. Learning Focus: The program emphasizes core areas like software engineering, cybersecurity, artificial intelligence, data science, and emerging fields like quantum computing

3. Objectives: Students develop skills in problem-solving, software development, communication, teamwork, and ethical decision-making in computing contexts

4. Opportunities: Students have access to internships with major companies like Google, Facebook, NASA, and JP Morgan Chase

5. Faculty: The department has experienced faculty leading research in cutting-edge areas

6. Flexibility: Through elective options, students can specialize in areas matching their interests and career goals

7. Practical Experience: Senior projects, internships, and research opportunities provide hands-on experience

The program provides both immediately applicable skills and a foundation for adapting to the continuously evolving field of computer science.`);
  }
  
  // Check for application/admission questions
  if (prompt.includes("how to apply") || prompt.includes("admission") || prompt.includes("requirements to get in")) {
    return formatResponse(`How to Apply for the Bachelor of Science (B.S.) in Computer Science:

Application Process:
1. Submit an application through the Morgan State University Admissions website
2. Provide official high school transcripts
3. Submit SAT or ACT scores (if required)
4. Pay the application fee

Admission Requirements:
- High school diploma or equivalent
- Competitive GPA (typically 2.5 or higher)
- Recommended high school preparation includes:
  * 4 years of English
  * 3-4 years of mathematics (including pre-calculus)
  * 2-3 years of science (physics recommended)
  * Computer science courses (if available)

Transfer Students:
- Official transcripts from all colleges attended
- Minimum GPA of 2.0 from previous institutions
- Computer science courses may be evaluated for transfer credit

International Students:
- Additional requirements include TOEFL/IELTS scores
- International transcript evaluation

For specific deadlines and detailed requirements, visit the Morgan State University Admissions website or contact the Office of Undergraduate Admission at admissions@morgan.edu or (443) 885-3000.`);
  }
  
  // Generic helpful response for new users
  if (prompt.length < 10 && prompt.includes("hi") || prompt.includes("hello") || prompt.includes("hey") || prompt === "help") {
    return formatResponse(`Hello! I'm here to help with information about Morgan State University's Computer Science program. I can answer questions about:

- Program overview & objectives
- Curriculum & courses
- Electives & specializations
- Graduation requirements
- Faculty & research
- Internships
- Graduate programs
- Course requirements & electives
- Graduation requirements
- Internships
- Faculty & research

How can I help you today?`);
  }
  
  // If no patterns match, provide a more helpful general response
  return formatResponse(`I can provide information about MSU's Computer Science program:

- Undergraduate/graduate programs
- MS in Advanced Computing and Bioinformatics
- PhD in Advanced and Equitable Computing
- Program objectives and requirements
- Internships and research areas

What specific aspect would you like to know about?`);
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
  const cleaned = text.replace(/\n{3,}/g, "\n\n").trim();
  
  // If the response is very long (over 1500 characters) and doesn't appear to be 
  // specifically asking for details (no keywords 'detail', 'explain', 'tell me more'),
  // try to extract just the key points or summarize
  if (cleaned.length > 1500) {
    const paragraphs = cleaned.split("\n\n");
    // Take first paragraph and any bullet points
    const firstPara = paragraphs[0];
    const bulletPoints = paragraphs
      .filter(p => p.match(/^[-•*]\s/m))
      .slice(0, 5)
      .join("\n\n");
    
    if (bulletPoints) {
      return `${firstPara}\n\n${bulletPoints}\n\n(Ask for more details if needed)`;
    } else {
      // Just return first 2 paragraphs with a note
      return `${paragraphs.slice(0, 2).join("\n\n")}\n\n(Ask for more details if needed)`;
    }
  }
  
  return cleaned;
}

export { queryOpenAI, generateLocalResponse };
