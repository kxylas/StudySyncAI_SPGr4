import { db } from "../db";
import { 
  courses, 
  faculty, 
  researchAreas, 
  facultyResearchAreas,
  graduatePrograms
} from "@shared/schema";

// Initial core course data from available information
const courseData = [
  {
    courseCode: "COSC 111",
    title: "Introduction to Computer Science I",
    credits: 4,
    description: "This is the first course in the computer science major sequence. The course introduces students to the discipline of computer science and programming using a high-level language. It emphasizes problem-solving methods, algorithm development, and object-oriented programming concepts.",
    prerequisites: null,
    category: "Core",
    level: "Undergraduate",
    syllabus: "Introduction to algorithms, problem-solving strategies, program design and development, data types, control structures, functions, arrays, files, and the mechanics of running, testing, and debugging programs."
  },
  {
    courseCode: "COSC 112",
    title: "Introduction to Computer Science II",
    credits: 4,
    description: "A continuation of COSC 111. This course focuses on the specification, design, and implementation of computer programs using an object-oriented programming language. Topics include inheritance, polymorphism, arrays, recursion, and event-driven programming.",
    prerequisites: "COSC 111",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Object-oriented programming concepts including classes, objects, methods, encapsulation, inheritance, and polymorphism. Advanced data structures including lists, stacks, queues, and trees."
  },
  {
    courseCode: "COSC 220",
    title: "Data Structures and Algorithms",
    credits: 4,
    description: "This course introduces data structures and algorithm analysis. Topics include recursion, fundamental data structures (including stacks, queues, linked lists, hash tables, trees, and graphs), and algorithmic analysis.",
    prerequisites: "COSC 112",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Algorithm analysis, sorting algorithms, binary search trees, balanced trees, graphs and algorithm design techniques."
  },
  {
    courseCode: "COSC 241",
    title: "Computer Systems and Digital Logic",
    credits: 3,
    description: "This course introduces students to computer systems and digital logic design. Topics include digital logic, processor design, memory organization, and input/output devices.",
    prerequisites: "COSC 111",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Number systems, Boolean algebra, combinational circuits, sequential circuits, memory elements, and basic computer architecture."
  },
  {
    courseCode: "COSC 281",
    title: "Discrete Structure",
    credits: 3,
    description: "This course introduces the mathematical foundations of computer science, including sets, functions, relations, propositional logic, predicate logic, proof techniques, mathematical induction, recursion, counting, probability, and graphs.",
    prerequisites: "MATH 241",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Set theory, mathematical logic, algorithms, counting techniques, discrete probability, graph theory, and trees."
  },
  {
    courseCode: "COSC 349",
    title: "Computer Networks",
    credits: 3,
    description: "This course introduces the concepts and principles of computer networks. Topics include network architectures, protocols, socket programming, and network security.",
    prerequisites: "COSC 220",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Network architecture, layered protocols, TCP/IP model, socket programming, wireless networks, and network security."
  },
  {
    courseCode: "COSC 351",
    title: "Cybersecurity",
    credits: 3,
    description: "This course introduces the principles of cybersecurity, including cryptography, authentication, access control, and network security.",
    prerequisites: "COSC 349",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Security models, encryption, authentication, access control, security protocols, and network security tools."
  },
  {
    courseCode: "COSC 352",
    title: "Organization of Programming Languages",
    credits: 3,
    description: "This course introduces the organization of programming languages, including language specification, syntax, semantics, data types, control structures, subprograms, and implementation.",
    prerequisites: "COSC 220",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Language design principles, syntax, semantics, data types, control structures, and implementation of programming languages."
  },
  {
    courseCode: "COSC 354",
    title: "Operating Systems",
    credits: 3,
    description: "This course introduces the principles of operating systems, including process management, memory management, file systems, and I/O systems.",
    prerequisites: "COSC 220",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Process management, memory management, file systems, I/O systems, and distributed systems."
  },
  {
    courseCode: "COSC 458",
    title: "Software Engineering",
    credits: 3,
    description: "This course introduces the principles of software engineering, including software processes, requirements, design, implementation, testing, and maintenance.",
    prerequisites: "COSC 220",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Software development life cycle, requirements analysis, design patterns, testing methodologies, and project management."
  },
  {
    courseCode: "COSC 459",
    title: "Database Design",
    credits: 3,
    description: "This course introduces the principles of database design, including data models, relational database design, SQL, and database programming.",
    prerequisites: "COSC 220",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Entity-relationship model, relational model, SQL, normalization, transaction processing, and database security."
  },
  {
    courseCode: "COSC 490",
    title: "Senior Project",
    credits: 3,
    description: "This is a capstone course for computer science majors. Students work in teams to design and implement a significant software system.",
    prerequisites: "COSC 458",
    category: "Core",
    level: "Undergraduate",
    syllabus: "Project planning, requirements analysis, design, implementation, testing, documentation, and presentation."
  },
  {
    courseCode: "COSC 238",
    title: "Object Oriented Programming",
    credits: 4,
    description: "This course provides a thorough introduction to object-oriented programming concepts and techniques. Topics include encapsulation, inheritance, polymorphism, design patterns, and GUI programming.",
    prerequisites: "COSC 112",
    category: "Group A Elective",
    level: "Undergraduate",
    syllabus: "Object-oriented design, class relationships, design patterns, GUI development, and exception handling."
  },
  {
    courseCode: "COSC 239",
    title: "Java Programming",
    credits: 3,
    description: "This course introduces Java programming language. Topics include object-oriented programming, exceptions, file I/O, graphical user interfaces, applets, and Java collections.",
    prerequisites: "COSC 112",
    category: "Group A Elective",
    level: "Undergraduate",
    syllabus: "Java language syntax, object-oriented programming in Java, exception handling, file I/O, GUI programming with Swing, and collection framework."
  },
  {
    courseCode: "COSC 243",
    title: "Computer Architecture",
    credits: 3,
    description: "This course provides an in-depth study of computer architecture, including processor organization, memory hierarchy, pipelining, and parallel processing.",
    prerequisites: "COSC 241",
    category: "Group A Elective",
    level: "Undergraduate",
    syllabus: "CPU design, instruction set architecture, pipelining, memory hierarchy, and multiprocessor systems."
  }
];

// Initial faculty data based on available information
const facultyData = [
  {
    name: "Shuangbao \"Paul\" Wang",
    title: "Professor",
    email: "shuangbao.wang@morgan.edu",
    phone: "(443) 885-4503",
    office: "McMechen Hall 507",
    bio: "Dr. Shuangbao \"Paul\" Wang serves as the Chair of the Computer Science Department at Morgan State University. His research interests include AI, machine learning, and cybersecurity.",
    imageUrl: null,
    researchInterests: "Artificial Intelligence, Machine Learning, Cybersecurity",
    role: "Chair"
  },
  {
    name: "Md Rahman",
    title: "Professor",
    email: "Md.Rahman@morgan.edu",
    phone: "(443) 885-1056",
    office: "McMechen 629",
    bio: "Dr. Md Rahman is a Professor and Associate Chair in the Computer Science Department. His research focuses on data science and algorithms.",
    imageUrl: null,
    researchInterests: "Data Science, Algorithms",
    role: "Associate Chair"
  },
  {
    name: "Guobin Xu",
    title: "Professor",
    email: "guobin.xu@morgan.edu",
    phone: "(443) 885-3371",
    office: "McMechen Hall",
    bio: "Dr. Guobin Xu serves as the Director of Undergraduate Studies for the BS/CS program at Morgan State University.",
    imageUrl: null,
    researchInterests: "Computer Science Education",
    role: "Director of Undergraduate Studies"
  }
];

// Research areas data
const researchAreasData = [
  {
    name: "Artificial Intelligence / Machine Learning / Deep Learning",
    description: "Research in AI, ML, and DL focuses on developing intelligent systems that can learn from data, make decisions, and solve complex problems.",
    imageUrl: null,
    websiteUrl: null
  },
  {
    name: "Quantum Computing and Quantum Cryptography",
    description: "Research in quantum computing and cryptography explores the use of quantum mechanical phenomena to perform computation and secure communication.",
    imageUrl: null,
    websiteUrl: "https://p-neumann.github.io/quantum/"
  },
  {
    name: "Cybersecurity",
    description: "Research in cybersecurity focuses on protecting systems, networks, and programs from digital attacks.",
    imageUrl: null,
    websiteUrl: null
  },
  {
    name: "Data Science / Big Data Analytics",
    description: "Research in data science and big data analytics involves developing methods to extract knowledge and insights from large and complex datasets.",
    imageUrl: null,
    websiteUrl: null
  },
  {
    name: "Human Computer Interactions",
    description: "Research in HCI focuses on the design and use of computer technology, focusing on the interfaces between people and computers.",
    imageUrl: null,
    websiteUrl: null
  },
  {
    name: "Cloud Computing",
    description: "Research in cloud computing explores the delivery of computing services over the internet.",
    imageUrl: null,
    websiteUrl: "https://www.morgan.edu/cs/cloudcomputing"
  },
  {
    name: "Robotics / Gaming",
    description: "Research in robotics and gaming focuses on the design, construction, and use of robots, as well as game development and design.",
    imageUrl: null,
    websiteUrl: null
  }
];

// Graduate programs data
const graduateProgramsData = [
  {
    name: "Advanced Computing",
    degree: "M.S.",
    description: "The Master of Science (M.S.) in Advanced Computing program focuses on emerging interdisciplinary areas within computer science, including Cybersecurity, Artificial Intelligence, Data Science, and Cloud Computing. It's offered both online and in person, with options for completing the degree through coursework only, or with a project or thesis.",
    requirements: "Bachelor's degree in Computer Science or related field, GRE scores, letters of recommendation, statement of purpose.",
    applicationInfo: "Applications are accepted for fall and spring semesters. Visit the Morgan State University School of Graduate Studies website for more information.",
    contactInfo: "Contact the Department of Computer Science for more information."
  },
  {
    name: "Advanced Computing",
    degree: "Ph.D.",
    description: "The Doctor of Philosophy (Ph.D.) in Advanced Computing program delves into advanced areas of computer science research, including Quantum Cryptography, Algorithms, Cybersecurity, AI/ML, and Data Analytics. It also emphasizes responsible computing innovations. The program can be taken on campus or fully online/remote.",
    requirements: "Master's degree in Computer Science or related field, GRE scores, letters of recommendation, statement of purpose, research proposal.",
    applicationInfo: "Applications are accepted for fall and spring semesters. Visit the Morgan State University School of Graduate Studies website for more information.",
    contactInfo: "Contact the Department of Computer Science for more information."
  },
  {
    name: "Bioinformatics",
    degree: "M.S.",
    description: "The Master of Science (M.S.) in Bioinformatics program provides coursework in computational biology methods, programming, and biostatistics. It offers flexibility through electives to specialize in life sciences and computer sciences, preparing graduates for the growing field of bioinformatics.",
    requirements: "Bachelor's degree in Computer Science, Biology, or related field, GRE scores, letters of recommendation, statement of purpose.",
    applicationInfo: "Applications are accepted for fall and spring semesters. Visit the Morgan State University School of Graduate Studies website for more information.",
    contactInfo: "Contact the Department of Computer Science for more information."
  }
];

// Function to populate the database with course data
async function populateCourses() {
  console.log("Populating courses table...");
  
  for (const course of courseData) {
    await db.insert(courses).values(course).onConflictDoNothing();
  }
  
  console.log("Courses table populated successfully.");
}

// Function to populate the database with faculty data
async function populateFaculty() {
  console.log("Populating faculty table...");
  
  for (const member of facultyData) {
    await db.insert(faculty).values(member).onConflictDoNothing();
  }
  
  console.log("Faculty table populated successfully.");
}

// Function to populate the database with research areas data
async function populateResearchAreas() {
  console.log("Populating research areas table...");
  
  for (const area of researchAreasData) {
    await db.insert(researchAreas).values(area).onConflictDoNothing();
  }
  
  console.log("Research areas table populated successfully.");
}

// Function to populate the faculty-research areas junction table
async function populateFacultyResearchAreas() {
  console.log("Populating faculty-research areas junction table...");
  
  // First, get all faculty and research areas
  const allFaculty = await db.select().from(faculty);
  const allResearchAreas = await db.select().from(researchAreas);
  
  // Sample mappings (in a real scenario, this would be more comprehensive)
  const mappings = [
    { 
      facultyName: "Shuangbao \"Paul\" Wang", 
      researchAreaNames: ["Artificial Intelligence / Machine Learning / Deep Learning", "Cybersecurity"] 
    },
    { 
      facultyName: "Md Rahman", 
      researchAreaNames: ["Data Science / Big Data Analytics", "Cloud Computing"] 
    },
    { 
      facultyName: "Guobin Xu", 
      researchAreaNames: ["Human Computer Interactions", "Robotics / Gaming"] 
    }
  ];
  
  for (const mapping of mappings) {
    const facultyMember = allFaculty.find(f => f.name === mapping.facultyName);
    if (!facultyMember) continue;
    
    for (const areaName of mapping.researchAreaNames) {
      const area = allResearchAreas.find(a => a.name === areaName);
      if (!area) continue;
      
      await db.insert(facultyResearchAreas).values({
        facultyId: facultyMember.id,
        researchAreaId: area.id
      }).onConflictDoNothing();
    }
  }
  
  console.log("Faculty-research areas junction table populated successfully.");
}

// Function to populate the graduate programs table
async function populateGraduatePrograms() {
  console.log("Populating graduate programs table...");
  
  for (const program of graduateProgramsData) {
    await db.insert(graduatePrograms).values(program).onConflictDoNothing();
  }
  
  console.log("Graduate programs table populated successfully.");
}

// Main function to populate all tables
async function populateDatabase() {
  try {
    await populateCourses();
    await populateFaculty();
    await populateResearchAreas();
    await populateFacultyResearchAreas();
    await populateGraduatePrograms();
    
    console.log("All tables populated successfully.");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    process.exit(0);
  }
}

// Execute the main function
populateDatabase();