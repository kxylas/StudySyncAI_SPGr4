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
The department offers several graduate programs including:
- MS in Advanced Computing with specializations in cutting-edge research fields
- MS in Bioinformatics combining computer science with biological research
- PhD in Computer Science focusing on advanced research

These graduate programs prepare students for high-level research and professional positions in specialized computing fields. The programs emphasize research in Artificial Intelligence, Machine Learning, Quantum Computing, Cybersecurity, and Data Science. Morgan State's graduate programs in computer science have received grants and support from organizations like NSA, IBM, and Microsoft to fund scholarships, research opportunities, and specialized equipment.`;

// Parse the program data into sections for local fallback processing
const programSections = parseProgramData(programData);

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
  
  // Check for study schedule requests
  if (prompt.includes("study schedule") || prompt.includes("schedule for") || prompt.includes("create a schedule") || 
      prompt.includes("plan my study") || prompt.includes("study plan") || prompt.includes("study time") ||
      (prompt.includes("courses") && prompt.includes("deadline") && prompt.includes("study"))) {
    
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
          const deadlineDate = new Date(course.deadline);
          const diffTime = Math.abs(deadlineDate.getTime() - today.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          daysUntilDeadlines[course.course] = diffDays;
        }
      }
      
      // Create a 5-day schedule starting from tomorrow
      const schedule = [];
      for (let i = 1; i <= 5; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        
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
  
  // Extract context from chat history
  const context = getContextFromHistory(chatHistory);
  
  // Check for repetition in recent conversations
  const lastBotMessage = chatHistory.filter(msg => msg.role === "assistant").pop()?.content || "";
  
  // If we seem to be repeating responses, vary the response pattern
  if (chatHistory.length > 2 && 
     (lastBotMessage.includes("Could you please let me know which specific aspect") || 
      lastBotMessage.includes("I can provide you with information about"))) {
    return formatResponse(`I understand you're looking for specific information about the Morgan State University Computer Science program. Let me be more helpful.

The MSU Computer Science program covers:

- Core requirements: Programming fundamentals, data structures, algorithms, computer architecture
- Focus areas: Software Engineering, Cybersecurity, AI, and Data Science
- Credit requirements: 120 total credits including general education requirements
- Capstone project: Required senior project demonstrating practical skills

Please ask about any specific area like course requirements, faculty, internships, or research opportunities, and I'll provide detailed information on that topic.`);
  }
  
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
    courses: [
      "course", "class", "curriculum", "subject", "what classes", "what courses",
      "study", "learn", "teach", "topics", "syllabus"
    ],
    requirements: [
      "requirement", "need", "complete", "finish", "graduate", "credit", "hour",
      "what do i need", "how many", "prerequisite", "exam"
    ],
    careers: [
      "career", "job", "work", "employment", "industry", "company", "field", "opportunity",
      "after graduation", "salary", "position", "hire", "internship"
    ],
    faculty: [
      "faculty", "professor", "teacher", "staff", "instructor", "department", "chair",
      "head", "dean", "advisor", "director", "who teaches"
    ],
    electives: [
      "elective", "group a", "group b", "group c", "concentration", "track", "focus area",
      "specialization", "optional course", "technical elective"
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
  
  // Check for greetings and introductions
  if (prompt.match(/^(hi|hello|hey|greetings|good (morning|afternoon|evening)|howdy)/i) ||
      prompt.length < 10 && !prompt.includes("?")) {
    return formatResponse(`Hello! I'm msuStudySyncAI, your Morgan State University Computer Science program assistant. 

I'm here to help you with information about:
- Undergraduate and graduate programs
- Program curriculum and requirements
- Course offerings and descriptions
- Faculty and research areas
- Career opportunities and internships
- Study resources and academic support

How can I assist you with the MSU Computer Science program today?`);
  }
  
  // University history and information
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
  
  // Program overview questions
  if ((matchesTopic(topicMatches.program) && !matchesTopic(topicMatches.requirements)) || 
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

The program focuses on several key areas including Software Engineering, Cybersecurity, Artificial Intelligence, Quantum Computing, Data Science, Game Development, Robotics, and Cloud Computing.`);
  }

  // Learning outcomes and objectives
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
  
  // Course information
  if (matchesTopic(topicMatches.courses) || prompt.includes("what classes") || prompt.includes("what subjects")) {
    return formatResponse(`The Morgan State University Computer Science curriculum includes:

Core Courses:
- Introduction to Computer Science and Programming
- Data Structures and Algorithms
- Computer Organization and Architecture
- Database Systems
- Operating Systems
- Programming Languages
- Software Engineering
- Computer Networks

Specialized Electives in:
- Artificial Intelligence and Machine Learning
- Cybersecurity and Information Assurance
- Data Science and Big Data Analytics
- Cloud Computing
- Mobile Application Development
- Game Development
- Robotics and Autonomous Systems

The curriculum balances theoretical foundations with hands-on practical experience through projects, labs, and internship opportunities.`);
  }
  
  // Electives information
  if (matchesTopic(topicMatches.electives) || 
      prompt.includes("group a") || 
      prompt.includes("group b") || 
      prompt.includes("group c") ||
      prompt.includes("electives") ||
      prompt.includes("concentration")) {
    
    // Check for specific groups of electives
    if (prompt.includes("group a")) {
      return formatResponse(`Group A Electives in the Morgan State University Computer Science program focus on advanced computing fundamentals and theoretical aspects of computer science. These courses include:

1. Advanced Algorithms (COSC 440): Studies advanced algorithm design techniques including divide-and-conquer, dynamic programming, greedy algorithms, and NP-completeness.

2. Theory of Computing (COSC 450): Covers formal languages, automata theory, computability, and complexity theory.

3. Compiler Design (COSC 458): Introduction to the principles and techniques used in compiler construction including lexical analysis, parsing, and code generation.

4. Computer Graphics (COSC 470): Focuses on 2D and 3D graphics algorithms, rendering techniques, and graphics programming.

5. Artificial Intelligence (COSC 485): Introduction to AI concepts including search algorithms, knowledge representation, reasoning, and machine learning.

Students typically need to complete at least two courses from Group A electives to fulfill degree requirements, providing depth in theoretical computer science foundations.`);
    } 
    else if (prompt.includes("group b")) {
      return formatResponse(`Group B Electives in the Morgan State University Computer Science program focus on applied computing and specialized programming areas. These courses include:

1. Web Development (COSC 461): Covers client and server-side web programming, web frameworks, and responsive design.

2. Mobile Application Development (COSC 462): Focuses on developing applications for mobile platforms including UI design, data persistence, and utilizing device features.

3. Cloud Computing (COSC 473): Introduction to cloud platforms, virtualization, cloud services, and distributed computing.

4. Big Data Analytics (COSC 474): Techniques for processing, analyzing, and visualizing large-scale data sets.

5. Game Programming (COSC 476): Game design principles, game engines, physics simulation, and interactive media development.

Group B electives allow students to gain practical skills in high-demand specializations within the tech industry.`);
    }
    else if (prompt.includes("group c")) {
      return formatResponse(`Group C Electives in the Morgan State University Computer Science program focus on cybersecurity, networking, and systems administration. These courses include:

1. Network Security (COSC 481): Principles of network security, cryptography, secure protocols, and security policy.

2. Ethical Hacking and Penetration Testing (COSC 482): Vulnerability assessment, penetration testing methodologies, and security auditing.

3. Systems Administration (COSC 486): Managing and configuring operating systems, user management, and system services.

4. Wireless Networks (COSC 487): Wireless protocols, mobile communications, and wireless network security.

5. Digital Forensics (COSC 488): Techniques for collecting and analyzing digital evidence, incident response, and legal considerations.

Group C electives are particularly valuable for students pursuing careers in cybersecurity, IT administration, or networking.`);
    }
    else {
      return formatResponse(`The Morgan State University Computer Science program offers a flexible curriculum with three groups of electives that allow students to customize their degree based on their interests and career goals:

Group A Electives: Focus on theoretical foundations and advanced computing concepts including advanced algorithms, theory of computing, compiler design, computer graphics, and artificial intelligence.

Group B Electives: Emphasize applied computing and development skills including web development, mobile applications, cloud computing, big data analytics, and game programming.

Group C Electives: Concentrate on security, networking, and systems including network security, ethical hacking, systems administration, wireless networks, and digital forensics.

The elective structure requires students to complete a minimum number of credits from each group, ensuring both breadth of knowledge and depth in selected areas. This approach allows students to develop specialized expertise while maintaining a strong foundation in core computer science principles.

For graduation, students typically need to complete:
- At least two courses from Group A
- At least two courses from Group B
- At least one course from Group C
- Additional electives from any group to fulfill the required elective credits

Which specific group of electives would you like more information about?`);
    }
  }
  
  // Requirements information
  if (matchesTopic(topicMatches.requirements) || prompt.includes("graduate") || prompt.includes("degree")) {
    return formatResponse(`To earn a Bachelor of Science in Computer Science from Morgan State University, students must complete:

1. General Education Requirements: Approximately 40 credit hours covering English, mathematics, sciences, humanities, and social sciences.

2. Computer Science Core Requirements: About 45 credit hours of foundational CS courses including programming, data structures, algorithms, computer architecture, operating systems, and software engineering.

3. Computer Science Electives: 15-18 credit hours of specialized courses in areas such as AI, cybersecurity, data science, or software development.

4. Mathematics Requirements: Calculus I & II, Discrete Mathematics, Linear Algebra, and Statistics (approximately 15-18 credit hours).

5. Senior Capstone Project: A culminating project that demonstrates comprehensive skills in computer science.

The total program requires 120 credit hours with a minimum GPA requirement for graduation.`);
  }
  
  // Career information
  if (matchesTopic(topicMatches.careers) || prompt.includes("job") || prompt.includes("work")) {
    return formatResponse(`Computer Science graduates from Morgan State University pursue diverse career paths including:

Popular Career Paths:
- Software Engineer/Developer
- Data Scientist/Analyst
- Cybersecurity Specialist
- System Administrator
- Database Administrator
- Web Developer
- Mobile App Developer
- AI/Machine Learning Engineer
- Network Engineer
- IT Project Manager

Many graduates work at leading technology companies, government agencies, financial institutions, and healthcare organizations. The department maintains strong relationships with industry partners like Google, Microsoft, IBM, and various government agencies that regularly recruit MSU CS graduates.

The program also prepares students for graduate studies in specialized fields of computer science.`);
  }
  
  // Faculty information
  if (matchesTopic(topicMatches.faculty) || prompt.includes("who teaches") || prompt.includes("professors")) {
    return formatResponse(`The Computer Science Department at Morgan State University features distinguished faculty with expertise across various computing disciplines:

Faculty members specialize in research areas including:
- Artificial Intelligence and Machine Learning
- Cybersecurity and Privacy
- High-Performance Computing
- Data Science and Analytics
- Software Engineering
- Computer Networks
- Human-Computer Interaction

Our faculty regularly publish in prestigious journals and conferences, secure research grants from organizations like NSF, DOD, and NASA, and collaborate with industry partners on cutting-edge projects.

The department maintains small class sizes to ensure personalized attention and mentoring opportunities for students.`);
  }

  // Graduate program information
  if (matchesTopic(topicMatches.graduate) || 
      prompt.includes("masters program") || 
      prompt.includes("phd program") ||
      prompt.includes("graduate programs") ||
      prompt.includes("advanced degree") ||
      prompt.includes("after bachelor")) {
    return formatResponse(`Morgan State University offers several graduate programs in Computer Science:

MS in Advanced Computing:
- Cutting-edge curriculum focused on emerging technologies
- Research opportunities in AI, machine learning, quantum computing, and cybersecurity
- Fellowship and assistantship opportunities available
- Prepares students for technology leadership positions and doctoral studies

MS in Bioinformatics:
- Interdisciplinary program combining computer science with biological sciences
- Focus on computational analysis of biological data
- Research in genomics, proteomics, and biological data mining
- Collaboration opportunities with healthcare and biotechnology partners

PhD in Computer Science:
- Rigorous research-oriented program
- Development of novel solutions to complex computing problems
- Dissertation focused on original contributions to computer science
- Faculty mentorship throughout the research process

The department has received grants from organizations like NSA, IBM, and Microsoft to support graduate students. In 2020, the department received an NSA grant providing full scholarships (tuition and stipends) for two Advanced Computing graduate students. Additionally, an MS student in the Advanced Computing Program received the prestigious IBM Masters Fellowship award with a $10,000 monetary award for research in quantum cryptography and cybersecurity.

For detailed application requirements and deadlines, prospective students should visit the official Morgan State University graduate admissions page.`);
  }
  
  // If no patterns match, provide a helpful general response
  return formatResponse(`Thank you for your question about "${userPrompt}".

I can provide you with information about the Morgan State University Computer Science program including:

- Undergraduate and graduate program details
- MS in Advanced Computing and MS in Bioinformatics
- PhD in Computer Science program
- Program overview and objectives
- Curriculum structure and course requirements
- Elective options in different focus areas
- Graduation requirements and credit hours
- Faculty members and department leadership
- Internship and career opportunities
- Research areas and achievements
- Application and admission process

Could you please rephrase your question or specify which aspect of the CS program you're interested in learning more about?`);
  }
  
  // Check for study schedule requests
  if ((prompt.includes("study schedule") || prompt.includes("schedule for") || prompt.includes("create a schedule") || 
      prompt.includes("plan my study") || prompt.includes("study plan") || prompt.includes("study time")) ||
      (prompt.includes("courses") && prompt.includes("deadline") && prompt.includes("study"))) {
    
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
          const deadlineDate = new Date(course.deadline);
          const diffTime = Math.abs(deadlineDate.getTime() - today.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          daysUntilDeadlines[course.course] = diffDays;
        }
      }
      
      // Create a 5-day schedule starting from tomorrow
      const schedule = [];
      for (let i = 1; i <= 5; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() + i);
        
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

export { queryOpenAI };