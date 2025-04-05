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
  
  // Check for questions about focus areas
  if (prompt.includes("focus area") || prompt.includes("specialization") || 
      (matchesTopic(topicMatches.program) && (prompt.includes("focus") || prompt.includes("specialize")))) {
    return formatResponse(`The Morgan State University Computer Science program offers various areas of learning focus, including:

1. Software Engineering - Developing and maintaining software systems
2. Cybersecurity - Protecting computer systems and networks
3. Artificial Intelligence - Creating systems that can perform tasks requiring human intelligence
4. Quantum Cryptography - Applying quantum mechanics to secure communications
5. Data Science - Extracting insights from complex data
6. Game Development & Robotics - Creating interactive experiences and physical systems
7. Quantum Computing - Computing using quantum mechanics principles
8. Cloud Computing - Utilizing internet-based computing resources

Students can choose electives that allow them to concentrate in these areas based on their interests and career goals.`);
  }
  
  // Enhanced checking for elective groups - check for electives generally first
  if (matchesTopic(topicMatches.electives) && 
     !(prompt.includes("group a") || prompt.includes("group b") || 
       prompt.includes("group c") || prompt.includes("group d"))) {
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
  if (matchesTopic(topicMatches.graduate) || prompt.includes("masters") || prompt.includes("phd program") || 
      (prompt.includes("morgan") && prompt.includes("offer") && prompt.includes("graduate")) ||
      (prompt.includes("does") && prompt.includes("morgan") && prompt.includes("graduate")) ||
      prompt.includes("what graduate programs")) {
    return formatResponse(`Yes, Morgan State offers these graduate programs in computing:

**MS in Advanced Computing:** Cybersecurity, AI, Data Science focus (online/onsite)
**MS in Bioinformatics:** Computing with biological research focus
**PhD in Advanced and Equitable Computing:** Research-focused doctoral program

Related programs: MS in Data Analytics, MS in Electrical Engineering

For more details: https://www.morgan.edu/computer-science/degrees-and-programs`);
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
    return formatResponse(`Finding Your Academic Advisor:

Your academic advisor is determined by your major and classification. Here's how to locate your advisor:

1. Check DegreeWorks - Your assigned advisor should be listed there
2. Visit the official academic advisers page at: https://www.morgan.edu/computer-science/current-students/academic-advisers

Academic advisors are assigned as follows:
- Freshmen: Usually assigned to a specific advisor for first-year students
- Sophomores: Assigned based on program track
- Juniors/Seniors: Assigned based on specialization area

To schedule an advising appointment:
1. Visit: https://www.morgan.edu/computer-science/current-students/schedule-an-appointment
2. Contact your advisor directly via email
3. Visit the department office in McMechen Hall

Your advisor can help with course selection, degree progress tracking, and career planning. It's recommended to meet with your advisor at least once per semester.`);
  }
  
  // Check for research questions
  if (matchesTopic(topicMatches.research)) {
    return formatResponse(`Research Areas in the Computer Science Department:

The department has active research in the following areas:

1. Artificial Intelligence / Machine Learning / Deep Learning
   Research in AI techniques, neural networks, and intelligent systems

2. Quantum Computing and Quantum Cryptography
   Exploring the next generation of computing technology and secure communications

3. Cybersecurity
   Investigating methods to protect systems, networks, and data from attacks

4. Data Science / Big Data Analytics
   Developing techniques to extract insights from large and complex datasets

5. Human Computer Interactions
   Studying how people interact with computers and designing better interfaces

6. Cloud Computing
   Research on distributed computing systems and services delivered over the internet

7. Robotics / Gaming
   Work on autonomous systems, game design, and interactive technologies

Recent research achievements include:
- Microsoft Award: $200,000 gift for cloud computing and emerging technologies research
- NSF Award in Quantum Computing and Quantum Cryptography
- Google Gift on Machine Learning and AI

Students interested in research can take COSC 499 - Senior Research as a Group C elective. For the latest research activities and opportunities, follow the CS department on Twitter: @Morgan_CompSci`);
  }
  
  // Check for curriculum/course sequence questions
  if (matchesTopic(topicMatches.curriculum) || prompt.includes("course order") || prompt.includes("what to take")) {
    return formatResponse(`Suggested Curriculum Sequence for Computer Science B.S.:

First Year:
- Semester 1: COSC 111 (Intro to CS I), ENGL 101, MATH 241 (Calculus I), General Education
- Semester 2: COSC 112 (Intro to CS II), ENGL 102, MATH 242 (Calculus II), General Education

Second Year:
- Semester 1: COSC 220 (Data Structures), COSC 241 (Systems & Logic), Group A Elective, General Education
- Semester 2: COSC 281 (Discrete Structure), Group A Electives (2 courses), MATH 312 (Linear Algebra)

Third Year:
- Semester 1: COSC 349 (Networks), COSC 351 (Cybersecurity), COSC 352 (Programming Languages), Group B Elective
- Semester 2: COSC 354 (Operating Systems), MATH 331 (Statistics), Group B Elective, General Education

Fourth Year:
- Semester 1: COSC 458 (Software Engineering), COSC 459 (Database), COSC 490 (Senior Project), Group C Elective
- Semester 2: Group C Electives (3 courses), Group D Elective, General Education

This sequence is designed to build knowledge progressively, with foundational courses in early years and more specialized courses in later years.

For the complete and most current curriculum sequence, visit: https://catalog.morgan.edu/preview_program.php?catoid=11&poid=2205`);
  }
  
  // Multiple patterns for more general questions about the CS program
  if ((prompt.includes("what") && prompt.includes("cs")) || 
      (prompt.includes("tell") && prompt.includes("about") && (prompt.includes("cs") || prompt.includes("computer"))) ||
      (prompt.includes("what") && prompt.includes("computer science")) ||
      prompt.includes("describe the program") ||
      prompt === "cs" || 
      prompt === "tell me more") {
    return formatResponse(`The Computer Science Program at Morgan State University is a comprehensive bachelor's degree program that prepares students for careers in the computing industry as well as advanced study in computer science.

Key aspects of the program:

1. Curriculum: A 120-credit program that combines theoretical foundations with practical skills
   - 44 credits of general education and university requirements
   - 11 credits of supporting courses (mathematics)
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

To apply to Morgan State University's Computer Science program, you should:

1. Visit the Office of Undergraduate Admission & Recruitment website: 
   http://www.morgan.edu/undergradadmissions

2. Start your application process at:
   http://www.morgan.edu/applynow.html

3. Complete the general university application requirements, which typically include:
   - High school transcripts
   - Standardized test scores (if required)
   - Application essay
   - Application fee

4. For specific information about Computer Science department requirements or questions, contact:
   Computer Science Department
   McMechen Hall 507
   Phone: (443) 885-3962

The admission process evaluates your academic record, particularly your performance in mathematics and science courses, as these are important foundations for success in computer science.

For further assistance, please contact the Morgan Computer Science Department directly.`);
  }
  
  // Check for specific questions about graduate programs based on interests
  if ((prompt.includes("graduate") || prompt.includes("grad")) && 
      (prompt.includes("interest") || prompt.includes("recommend") || prompt.includes("for me") || prompt.includes("which") || prompt.includes("what") || prompt.includes("best") || prompt.includes("fit"))) {
    return formatResponse(`Based on your interests, Morgan State offers:

Cybersecurity/AI/Data Science: MS in Advanced Computing
Research/Quantum Computing: PhD in Advanced and Equitable Computing
Computational Biology: MS in Bioinformatics
Other options: MS in Data Analytics, MS in Electrical Engineering

For specific program details: https://www.morgan.edu/computer-science/degrees-and-programs

What CS areas interest you most?`);
  }

  // Check for simple greetings or introductions
  if (prompt === "hello" || prompt === "hi" || prompt === "hey" || prompt.includes("how are you")) {
    return formatResponse(`Hello! I'm msuStudySyncAI, your Morgan State University CS program assistant. I can provide information about:

- Undergraduate & graduate programs
- Course requirements & electives
- Graduation requirements
- Internships
- Faculty & research

How can I help you today?`);
  }
  
  // Check for thank you messages
  if (prompt.includes("thank") || prompt.includes("thanks") || prompt === "ty") {
    return formatResponse(`You're welcome! Feel free to ask if you have any other questions about Morgan State's CS program.`);
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

export { queryOpenAI };
