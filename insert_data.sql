-- Clear existing data to avoid duplicates
DELETE FROM faculty_research_areas;
DELETE FROM graduate_programs;
DELETE FROM research_areas;
DELETE FROM faculty;
DELETE FROM courses;

-- Complete Course Data
INSERT INTO courses (course_code, title, credits, description, prerequisites, category, level, syllabus) VALUES
-- Core Courses
('COSC 111', 'Introduction to Computer Science I', 4, 'This is the first course in the computer science major sequence. The course introduces students to the discipline of computer science and programming using a high-level language. It emphasizes problem-solving methods, algorithm development, and object-oriented programming concepts.', NULL, 'Core', 'Undergraduate', 'Introduction to algorithms, problem-solving strategies, program design and development, data types, control structures, functions, arrays, files, and the mechanics of running, testing, and debugging programs.'),
('COSC 112', 'Introduction to Computer Science II', 4, 'A continuation of COSC 111. This course focuses on the specification, design, and implementation of computer programs using an object-oriented programming language. Topics include inheritance, polymorphism, arrays, recursion, and event-driven programming.', 'COSC 111', 'Core', 'Undergraduate', 'Object-oriented programming concepts including classes, objects, methods, encapsulation, inheritance, and polymorphism. Advanced data structures including lists, stacks, queues, and trees.'),
('COSC 220', 'Data Structures and Algorithms', 4, 'This course introduces data structures and algorithm analysis. Topics include recursion, fundamental data structures (including stacks, queues, linked lists, hash tables, trees, and graphs), and algorithmic analysis.', 'COSC 112', 'Core', 'Undergraduate', 'Algorithm analysis, sorting algorithms, binary search trees, balanced trees, graphs and algorithm design techniques.'),
('COSC 221', 'Algorithms', 3, 'This course provides an in-depth study of the design and analysis of algorithms. Topics include asymptotic analysis, divide-and-conquer, greedy algorithms, dynamic programming, and NP-completeness.', 'COSC 220', 'Core', 'Undergraduate', 'Algorithm design paradigms, complexity analysis, sorting and searching, graph algorithms, string processing, and introductory computational geometry.'),
('COSC 230', 'Web Development', 3, 'This course introduces the principles and practices of web application development. Topics include HTML, CSS, JavaScript, server-side programming, and web frameworks.', 'COSC 112', 'Core', 'Undergraduate', 'Front-end and back-end web development, responsive design, web APIs, and web security.'),
('COSC 241', 'Computer Systems and Digital Logic', 3, 'This course introduces students to computer systems and digital logic design. Topics include digital logic, processor design, memory organization, and input/output devices.', 'COSC 111', 'Core', 'Undergraduate', 'Number systems, Boolean algebra, combinational circuits, sequential circuits, memory elements, and basic computer architecture.'),
('COSC 281', 'Discrete Structure', 3, 'This course introduces the mathematical foundations of computer science, including sets, functions, relations, propositional logic, predicate logic, proof techniques, mathematical induction, recursion, counting, probability, and graphs.', 'MATH 241', 'Core', 'Undergraduate', 'Set theory, mathematical logic, algorithms, counting techniques, discrete probability, graph theory, and trees.'),
('COSC 348', 'Database Design', 3, 'This course introduces database design principles and applications. Topics include entity-relationship modeling, relational database design, SQL, normalization, and transaction processing.', 'COSC 220', 'Core', 'Undergraduate', 'Database design methodology, entity-relationship modeling, relational algebra, SQL, normalization, transaction processing, and database security.'),
('COSC 349', 'Computer Networks', 3, 'This course introduces the concepts and principles of computer networks. Topics include network architectures, protocols, socket programming, and network security.', 'COSC 220', 'Core', 'Undergraduate', 'Network architecture, layered protocols, TCP/IP model, socket programming, wireless networks, and network security.'),
('COSC 350', 'Software Engineering', 3, 'This course introduces software engineering principles and methodologies. Topics include software processes, requirements analysis, design, implementation, testing, and maintenance.', 'COSC 220', 'Core', 'Undergraduate', 'Software development life cycle, requirements engineering, software architecture, design patterns, testing, and project management.'),
('COSC 351', 'Cybersecurity', 3, 'This course introduces the principles of cybersecurity, including cryptography, authentication, access control, and network security.', 'COSC 349', 'Core', 'Undergraduate', 'Security models, encryption, authentication, access control, security protocols, and network security tools.'),
('COSC 352', 'Programming Languages', 3, 'This course introduces the organization of programming languages, including language specification, syntax, semantics, data types, control structures, subprograms, and implementation.', 'COSC 220', 'Core', 'Undergraduate', 'Language design principles, syntax, semantics, data types, control structures, and implementation of programming languages.'),
('COSC 354', 'Operating Systems', 3, 'This course introduces the principles of operating systems, including process management, memory management, file systems, and I/O systems.', 'COSC 220', 'Core', 'Undergraduate', 'Process management, memory management, file systems, I/O systems, and distributed systems.'),
('COSC 490', 'Senior Project', 3, 'This is a capstone course for computer science majors. Students work in teams to design and implement a significant software system.', 'COSC 350', 'Core', 'Undergraduate', 'Project planning, requirements analysis, design, implementation, testing, documentation, and presentation.'),

-- Group A Electives
('COSC 232', 'Computer Programming for Engineers', 3, 'This course introduces computer programming concepts and techniques for engineering applications. Topics include programming fundamentals, numerical methods, and engineering problem-solving.', 'COSC 111', 'Group A Elective', 'Undergraduate', 'Programming concepts, numerical methods, and engineering applications.'),
('COSC 237', 'Advanced Programming Applications', 3, 'This course covers advanced programming applications including graphics, multimedia, and database programming.', 'COSC 112', 'Group A Elective', 'Undergraduate', 'Graphics programming, multimedia applications, and database connectivity.'),
('COSC 238', 'Object Oriented Programming', 4, 'This course provides a thorough introduction to object-oriented programming concepts and techniques. Topics include encapsulation, inheritance, polymorphism, design patterns, and GUI programming.', 'COSC 112', 'Group A Elective', 'Undergraduate', 'Object-oriented design, class relationships, design patterns, GUI development, and exception handling.'),
('COSC 239', 'Java Programming', 3, 'This course introduces Java programming language. Topics include object-oriented programming, exceptions, file I/O, graphical user interfaces, applets, and Java collections.', 'COSC 112', 'Group A Elective', 'Undergraduate', 'Java language syntax, object-oriented programming in Java, exception handling, file I/O, GUI programming with Swing, and collection framework.'),
('COSC 243', 'Computer Architecture', 3, 'This course provides an in-depth study of computer architecture, including processor organization, memory hierarchy, pipelining, and parallel processing.', 'COSC 241', 'Group A Elective', 'Undergraduate', 'CPU design, instruction set architecture, pipelining, memory hierarchy, and multiprocessor systems.'),
('COSC 247', 'Python Programming', 3, 'This course introduces Python programming language and its applications. Topics include Python syntax, data structures, object-oriented programming, and Python libraries for data analysis and machine learning.', 'COSC 112', 'Group A Elective', 'Undergraduate', 'Python syntax, data structures, functions, object-oriented programming, file I/O, data analysis libraries.'),

-- Group B Electives
('COSC 356', 'Computer Graphics', 3, 'This course introduces the principles and techniques of computer graphics. Topics include 2D and 3D transformations, rendering, shading, and animation.', 'COSC 220, MATH 241', 'Group B Elective', 'Undergraduate', 'Graphics primitives, transformation matrices, lighting models, texture mapping, and animation techniques.'),
('COSC 357', 'Artificial Intelligence', 3, 'This course introduces the basic concepts and techniques of artificial intelligence. Topics include knowledge representation, search strategies, machine learning, and neural networks.', 'COSC 220', 'Group B Elective', 'Undergraduate', 'Search algorithms, knowledge representation, machine learning, neural networks, and natural language processing.'),
('COSC 358', 'Machine Learning', 3, 'This course introduces the principles and techniques of machine learning. Topics include supervised learning, unsupervised learning, reinforcement learning, and deep learning.', 'COSC 220, MATH 331', 'Group B Elective', 'Undergraduate', 'Classification, regression, clustering, neural networks, deep learning, and performance evaluation.'),
('COSC 359', 'Data Science', 3, 'This course introduces data science concepts, algorithms, and applications. Topics include data cleaning, data visualization, statistical analysis, and machine learning for data analysis.', 'COSC 220, MATH 331', 'Group B Elective', 'Undergraduate', 'Data collection, data cleaning, data visualization, statistical analysis, machine learning, and data ethics.'),
('COSC 360', 'Mobile App Development', 3, 'This course introduces mobile application development for platforms such as iOS and Android. Topics include mobile interface design, mobile app architecture, and mobile app deployment.', 'COSC 238', 'Group B Elective', 'Undergraduate', 'Mobile app architecture, interface design, data persistence, and app distribution.'),
('COSC 362', 'Cloud Computing', 3, 'This course introduces cloud computing concepts, techniques, and applications. Topics include cloud architectures, virtualization, and cloud services.', 'COSC 349, COSC 354', 'Group B Elective', 'Undergraduate', 'Cloud service models, virtualization, cloud storage, and cloud security.'),

-- Group C Electives
('COSC 450', 'Special Topics in Computer Science', 3, 'This course covers special topics in computer science that are not covered in regular course offerings. Topics vary from semester to semester.', 'Permission of instructor', 'Group C Elective', 'Undergraduate', 'Varies by topic.'),
('COSC 451', 'Game Development', 3, 'This course introduces game development concepts and techniques. Topics include game design, game engines, and game physics.', 'COSC 356', 'Group C Elective', 'Undergraduate', 'Game engines, 3D modeling, physics engines, AI for games, and multiplayer game development.'),
('COSC 452', 'Human-Computer Interaction', 3, 'This course introduces the principles and practices of human-computer interaction. Topics include user interface design, user experience, and usability testing.', 'COSC 350', 'Group C Elective', 'Undergraduate', 'Interface design principles, usability testing methods, user research, and accessibility.'),
('COSC 453', 'Computer Vision', 3, 'This course introduces the principles and techniques of computer vision. Topics include image processing, feature extraction, object recognition, and motion analysis.', 'COSC 357', 'Group C Elective', 'Undergraduate', 'Image processing, feature detection, object recognition, and scene understanding.'),
('COSC 455', 'Natural Language Processing', 3, 'This course introduces the principles and techniques of natural language processing. Topics include text processing, language modeling, and language understanding.', 'COSC 357', 'Group C Elective', 'Undergraduate', 'Text processing, language models, sentiment analysis, and machine translation.'),
('COSC 456', 'Parallel and Distributed Computing', 3, 'This course introduces parallel and distributed computing concepts and techniques. Topics include parallel algorithms, distributed systems, and performance analysis.', 'COSC 354', 'Group C Elective', 'Undergraduate', 'Parallel architectures, parallel algorithms, distributed systems, and performance optimization.'),
('COSC 457', 'Quantum Computing', 3, 'This course introduces quantum computing concepts and applications. Topics include quantum mechanics, quantum algorithms, and quantum information theory.', 'COSC 281, MATH 312', 'Group C Elective', 'Undergraduate', 'Quantum bits, quantum gates, quantum algorithms, and quantum cryptography.'),
('COSC 499', 'Senior Research', 3, 'This course provides an opportunity for students to conduct independent research under the guidance of a faculty member. Students select a research topic, conduct a literature review, develop a methodology, and present their findings.', 'Senior standing and permission of instructor', 'Group C Elective', 'Undergraduate', 'Research methodology, literature review, research proposal, and research presentation.'),

-- Group D Electives
('COSC 471', 'Internship in Computer Science', 3, 'This course provides students with an opportunity to gain practical experience in the field of computer science through an internship with a company or organization.', 'Junior or senior standing and permission of instructor', 'Group D Elective', 'Undergraduate', 'Professional development, work experience, and career planning.'),
('COSC 472', 'Career Development in Computer Science', 3, 'This course prepares students for careers in computer science. Topics include resume writing, interview skills, job search strategies, and professional development.', 'Junior or senior standing', 'Group D Elective', 'Undergraduate', 'Resume writing, interview skills, job search strategies, and career planning.'),
('COSC 473', 'Entrepreneurship in Computing', 3, 'This course introduces entrepreneurship concepts and practices in the context of computing and technology. Topics include startup formation, business planning, and technology commercialization.', 'Junior or senior standing', 'Group D Elective', 'Undergraduate', 'Business models, market analysis, fundraising, and startup operations.'),
('COSC 474', 'Ethics in Computing', 3, 'This course explores ethical issues in computing and technology. Topics include privacy, security, intellectual property, and social impact of technology.', 'Junior or senior standing', 'Group D Elective', 'Undergraduate', 'Ethical theories, professional ethics, privacy, security, and social responsibility.'),

-- Graduate Courses
('COSC 500', 'Advanced Algorithms', 3, 'This course provides an in-depth study of the design and analysis of algorithms. Topics include advanced data structures, NP-completeness, approximation algorithms, and randomized algorithms.', NULL, 'Graduate', 'Graduate', 'Advanced algorithm design, computational complexity, approximation algorithms, randomized algorithms.'),
('COSC 510', 'Advanced Artificial Intelligence', 3, 'This course covers advanced topics in artificial intelligence. Topics include advanced machine learning, deep learning, reinforcement learning, and AI ethics.', NULL, 'Graduate', 'Graduate', 'Advanced neural networks, deep learning architectures, reinforcement learning, and ethical AI.'),
('COSC 512', 'Advanced Database Systems', 3, 'This course covers advanced topics in database systems. Topics include distributed databases, NoSQL databases, big data technologies, and data warehousing.', NULL, 'Graduate', 'Graduate', 'Distributed database design, non-relational databases, big data frameworks, and analytical processing.'),
('COSC 515', 'Advanced Computer Networks', 3, 'This course covers advanced topics in computer networks. Topics include network security, wireless networks, cloud networking, and Internet of Things.', NULL, 'Graduate', 'Graduate', 'Network security protocols, wireless communication, cloud infrastructure, and IoT architectures.'),
('COSC 518', 'Advanced Cybersecurity', 3, 'This course covers advanced topics in cybersecurity. Topics include advanced cryptography, secure systems design, penetration testing, and cyber threat intelligence.', NULL, 'Graduate', 'Graduate', 'Advanced encryption, secure architecture, vulnerability assessment, and threat detection.'),
('COSC 520', 'Quantum Computing and Cryptography', 3, 'This course provides an introduction to quantum computing and quantum cryptography. Topics include quantum algorithms, quantum error correction, and post-quantum cryptography.', NULL, 'Graduate', 'Graduate', 'Quantum algorithms, quantum cryptographic protocols, and post-quantum cryptography.'),
('COSC 525', 'Bioinformatics', 3, 'This course introduces computational methods for analyzing biological data. Topics include sequence alignment, phylogenetic analysis, protein structure prediction, and genomics.', NULL, 'Graduate', 'Graduate', 'Sequence analysis, structural bioinformatics, genomics, and biostatistics.'),
('COSC 599', 'Master''s Thesis Research', 6, 'This course provides supervised research leading to the completion and defense of a master''s thesis.', NULL, 'Graduate', 'Graduate', 'Research methodology, thesis preparation, and thesis defense.'),
('COSC 699', 'Doctoral Dissertation Research', 12, 'This course provides supervised research leading to the completion and defense of a doctoral dissertation.', NULL, 'Graduate', 'Graduate', 'Research methodology, dissertation preparation, and dissertation defense.');

-- Complete Faculty Data
INSERT INTO faculty (name, title, email, phone, office, bio, image_url, research_interests, role) VALUES
-- Department Leadership
('Shuangbao "Paul" Wang', 'Professor', 'shuangbao.wang@morgan.edu', '(443) 885-4503', 'McMechen Hall 507', 'Dr. Shuangbao "Paul" Wang serves as the Chair of the Computer Science Department at Morgan State University. He received his Ph.D. in Computer Science from the University of Illinois at Chicago. His research interests include AI, machine learning, and cybersecurity.', NULL, 'Artificial Intelligence, Machine Learning, Cybersecurity, Image Processing', 'Chair'),
('Md Rahman', 'Professor', 'Md.Rahman@morgan.edu', '(443) 885-1056', 'McMechen 629', 'Dr. Md Rahman is a Professor and Associate Chair in the Computer Science Department. He received his Ph.D. in Computer Science from Monash University, Australia. His research focuses on data science and algorithms.', NULL, 'Data Science, Algorithms, Cloud Computing, Distributed Systems', 'Associate Chair'),
('Guobin Xu', 'Professor', 'guobin.xu@morgan.edu', '(443) 885-3371', 'McMechen Hall', 'Dr. Guobin Xu serves as the Director of Undergraduate Studies for the BS/CS program at Morgan State University. He received his Ph.D. in Computer Science from the University of Nebraska-Lincoln. His research interests include computer science education and human-computer interaction.', NULL, 'Computer Science Education, Human-Computer Interaction, Education Technology', 'Director of Undergraduate Studies'),

-- Professors
('Vojislav Stojkovic', 'Professor', 'vojislav.stojkovic@morgan.edu', '(443) 885-4892', 'McMechen Hall 622', 'Dr. Vojislav Stojkovic is a Professor in the Computer Science Department specializing in quantum computing and quantum cryptography. He received his Ph.D. from University of Belgrade, Serbia.', NULL, 'Quantum Computing, Quantum Cryptography, Algorithms, Information Security', 'Faculty'),
('Yuanwei Jin', 'Professor', 'yuanwei.jin@morgan.edu', '(443) 885-3912', 'McMechen Hall 610', 'Dr. Yuanwei Jin is a Professor with expertise in signal processing and wireless communications. He received his Ph.D. from the University of California, Davis.', NULL, 'Signal Processing, Wireless Communications, Internet of Things, Machine Learning', 'Faculty'),
('Kofi Nyarko', 'Professor', 'kofi.nyarko@morgan.edu', '(443) 885-1673', 'McMechen Hall 612', 'Dr. Kofi Nyarko is a Professor specializing in embedded systems and robotics. He received his Ph.D. from Morgan State University.', NULL, 'Embedded Systems, Robotics, Control Systems, Internet of Things', 'Faculty'),

-- Associate Professors
('Prabir Bhattacharya', 'Associate Professor', 'prabir.bhattacharya@morgan.edu', '(443) 885-4264', 'McMechen Hall 614', 'Dr. Prabir Bhattacharya is an Associate Professor with expertise in computer vision and biometrics. He received his Ph.D. from Oxford University, UK.', NULL, 'Computer Vision, Biometrics, Pattern Recognition, Image Processing', 'Faculty'),
('Yuchuan Liu', 'Associate Professor', 'yuchuan.liu@morgan.edu', '(443) 885-4513', 'McMechen Hall 616', 'Dr. Yuchuan Liu is an Associate Professor specializing in data mining and big data analytics. He received his Ph.D. from the Chinese Academy of Sciences.', NULL, 'Data Mining, Big Data Analytics, Machine Learning, Database Systems', 'Faculty'),
('Mahmudur Rahman', 'Associate Professor', 'mahmudur.rahman@morgan.edu', '(443) 885-4818', 'McMechen Hall 618', 'Dr. Mahmudur Rahman is an Associate Professor with expertise in health informatics and data visualization. He received his Ph.D. from Virginia Tech.', NULL, 'Health Informatics, Data Visualization, Visual Analytics, Human-Computer Interaction', 'Faculty'),

-- Assistant Professors
('Amber Bethea', 'Assistant Professor', 'amber.bethea@morgan.edu', '(443) 885-3625', 'McMechen Hall 620', 'Dr. Amber Bethea is an Assistant Professor specializing in cybersecurity and network security. She received her Ph.D. from Morgan State University.', NULL, 'Cybersecurity, Network Security, Digital Forensics, Privacy', 'Faculty'),
('Edward Dillon', 'Assistant Professor', 'edward.dillon@morgan.edu', '(443) 885-3817', 'McMechen Hall 624', 'Dr. Edward Dillon is an Assistant Professor with expertise in software engineering and formal methods. He received his Ph.D. from the University of Maryland, College Park.', NULL, 'Software Engineering, Formal Methods, Programming Languages, Software Testing', 'Faculty'),
('Farin Kamangar', 'Assistant Professor', 'farin.kamangar@morgan.edu', '(443) 885-3519', 'McMechen Hall 626', 'Dr. Farin Kamangar is an Assistant Professor specializing in artificial intelligence and machine learning. He received his Ph.D. from the University of Texas at Arlington.', NULL, 'Artificial Intelligence, Machine Learning, Deep Learning, Natural Language Processing', 'Faculty'),

-- Lecturers
('Wendy Smith', 'Administrative Assistant', 'Wendy.Smith@morgan.edu', '(443) 885-3962', 'McMechen Hall 507A', 'Wendy Smith serves as an Administrative Assistant in the Computer Science Department, providing support to faculty, staff, and students.', NULL, 'Department Administration, Student Support, Office Management', 'Administrative Staff'),
('Grace Steele', 'Administrative Assistant', 'Grace.Steele@morgan.edu', '(443) 885-1053', 'McMechen 507', 'Grace Steele serves as an Administrative Assistant in the Computer Science Department, assisting with departmental operations and student services.', NULL, 'Student Services, Office Administration, Event Coordination', 'Administrative Staff'),
('James Roberts', 'Lecturer', 'james.roberts@morgan.edu', '(443) 885-3926', 'McMechen Hall 628', 'James Roberts is a Lecturer in the Computer Science Department specializing in programming and web development. He has over 15 years of industry experience.', NULL, 'Programming, Web Development, Software Development, Industry Practices', 'Faculty'),
('Monica Johnson', 'Lecturer', 'monica.johnson@morgan.edu', '(443) 885-3724', 'McMechen Hall 630', 'Monica Johnson is a Lecturer specializing in database systems and information management. She has extensive experience in industry database applications.', NULL, 'Database Systems, Information Management, SQL, Data Warehousing', 'Faculty');

-- Insert research areas data (if not already inserted)
INSERT INTO research_areas (name, description, image_url, website_url) VALUES
('Artificial Intelligence / Machine Learning / Deep Learning', 'Research in AI, ML, and DL focuses on developing intelligent systems that can learn from data, make decisions, and solve complex problems. The department has active projects in neural networks, computer vision, and natural language processing.', NULL, NULL),
('Quantum Computing and Quantum Cryptography', 'Research in quantum computing and cryptography explores the use of quantum mechanical phenomena to perform computation and secure communication. Projects include quantum algorithm development and post-quantum cryptography.', NULL, 'https://p-neumann.github.io/quantum/'),
('Cybersecurity', 'Research in cybersecurity focuses on protecting systems, networks, and programs from digital attacks. Areas include network security, cryptography, secure software development, and digital forensics.', NULL, NULL),
('Data Science / Big Data Analytics', 'Research in data science and big data analytics involves developing methods to extract knowledge and insights from large and complex datasets. Projects include predictive modeling, data mining, and visual analytics.', NULL, NULL),
('Human Computer Interactions', 'Research in HCI focuses on the design and use of computer technology, focusing on the interfaces between people and computers. Projects include usability studies, interface design, and accessibility research.', NULL, NULL),
('Cloud Computing', 'Research in cloud computing explores the delivery of computing services over the internet. Areas include distributed systems, virtualization, and cloud security.', NULL, 'https://www.morgan.edu/cs/cloudcomputing'),
('Robotics / Gaming', 'Research in robotics and gaming focuses on the design, construction, and use of robots, as well as game development and design. Projects include autonomous systems, robot control, and game AI.', NULL, NULL),
('Bioinformatics', 'Research in bioinformatics applies computational techniques to analyze biological data. Projects include genomic analysis, protein structure prediction, and biological network analysis.', NULL, NULL),
('Internet of Things', 'Research in IoT involves connecting everyday devices to the internet and developing applications that leverage this connectivity. Projects include smart home systems, industrial IoT, and IoT security.', NULL, NULL);

-- Insert faculty-research areas relationships
WITH faculty_ids AS (
  SELECT id, name FROM faculty
),
research_area_ids AS (
  SELECT id, name FROM research_areas
)
INSERT INTO faculty_research_areas (faculty_id, research_area_id)
VALUES 
-- Shuangbao Wang
((SELECT id FROM faculty_ids WHERE name = 'Shuangbao "Paul" Wang'), 
 (SELECT id FROM research_area_ids WHERE name = 'Artificial Intelligence / Machine Learning / Deep Learning')),
((SELECT id FROM faculty_ids WHERE name = 'Shuangbao "Paul" Wang'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cybersecurity')),

-- Md Rahman
((SELECT id FROM faculty_ids WHERE name = 'Md Rahman'), 
 (SELECT id FROM research_area_ids WHERE name = 'Data Science / Big Data Analytics')),
((SELECT id FROM faculty_ids WHERE name = 'Md Rahman'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cloud Computing')),

-- Guobin Xu
((SELECT id FROM faculty_ids WHERE name = 'Guobin Xu'), 
 (SELECT id FROM research_area_ids WHERE name = 'Human Computer Interactions')),
((SELECT id FROM faculty_ids WHERE name = 'Guobin Xu'), 
 (SELECT id FROM research_area_ids WHERE name = 'Robotics / Gaming')),

-- Vojislav Stojkovic
((SELECT id FROM faculty_ids WHERE name = 'Vojislav Stojkovic'), 
 (SELECT id FROM research_area_ids WHERE name = 'Quantum Computing and Quantum Cryptography')),
((SELECT id FROM faculty_ids WHERE name = 'Vojislav Stojkovic'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cybersecurity')),

-- Yuanwei Jin
((SELECT id FROM faculty_ids WHERE name = 'Yuanwei Jin'), 
 (SELECT id FROM research_area_ids WHERE name = 'Internet of Things')),
((SELECT id FROM faculty_ids WHERE name = 'Yuanwei Jin'), 
 (SELECT id FROM research_area_ids WHERE name = 'Data Science / Big Data Analytics')),

-- Kofi Nyarko
((SELECT id FROM faculty_ids WHERE name = 'Kofi Nyarko'), 
 (SELECT id FROM research_area_ids WHERE name = 'Robotics / Gaming')),
((SELECT id FROM faculty_ids WHERE name = 'Kofi Nyarko'), 
 (SELECT id FROM research_area_ids WHERE name = 'Internet of Things')),

-- Prabir Bhattacharya
((SELECT id FROM faculty_ids WHERE name = 'Prabir Bhattacharya'), 
 (SELECT id FROM research_area_ids WHERE name = 'Artificial Intelligence / Machine Learning / Deep Learning')),
((SELECT id FROM faculty_ids WHERE name = 'Prabir Bhattacharya'), 
 (SELECT id FROM research_area_ids WHERE name = 'Human Computer Interactions')),

-- Yuchuan Liu
((SELECT id FROM faculty_ids WHERE name = 'Yuchuan Liu'), 
 (SELECT id FROM research_area_ids WHERE name = 'Data Science / Big Data Analytics')),
((SELECT id FROM faculty_ids WHERE name = 'Yuchuan Liu'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cloud Computing')),

-- Mahmudur Rahman
((SELECT id FROM faculty_ids WHERE name = 'Mahmudur Rahman'), 
 (SELECT id FROM research_area_ids WHERE name = 'Human Computer Interactions')),
((SELECT id FROM faculty_ids WHERE name = 'Mahmudur Rahman'), 
 (SELECT id FROM research_area_ids WHERE name = 'Data Science / Big Data Analytics')),

-- Amber Bethea
((SELECT id FROM faculty_ids WHERE name = 'Amber Bethea'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cybersecurity')),
((SELECT id FROM faculty_ids WHERE name = 'Amber Bethea'), 
 (SELECT id FROM research_area_ids WHERE name = 'Internet of Things')),

-- Edward Dillon
((SELECT id FROM faculty_ids WHERE name = 'Edward Dillon'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cloud Computing')),
((SELECT id FROM faculty_ids WHERE name = 'Edward Dillon'), 
 (SELECT id FROM research_area_ids WHERE name = 'Cybersecurity')),

-- Farin Kamangar
((SELECT id FROM faculty_ids WHERE name = 'Farin Kamangar'), 
 (SELECT id FROM research_area_ids WHERE name = 'Artificial Intelligence / Machine Learning / Deep Learning')),
((SELECT id FROM faculty_ids WHERE name = 'Farin Kamangar'), 
 (SELECT id FROM research_area_ids WHERE name = 'Bioinformatics'));

-- Graduate Programs
INSERT INTO graduate_programs (name, degree, description, requirements, application_info, contact_info) VALUES
('Advanced Computing MS', 'M.S.', 'The Master of Science (M.S.) in Advanced Computing program focuses on emerging interdisciplinary areas within computer science, including Cybersecurity, Artificial Intelligence, Data Science, and Cloud Computing. It''s offered both online and in person, with options for completing the degree through coursework only, or with a project or thesis.', 'Bachelor''s degree in Computer Science or related field with a minimum GPA of 3.0. GRE scores (minimum 155 Quantitative), 3 letters of recommendation, statement of purpose, and resume.', 'Applications are accepted for fall (deadline: April 15) and spring (deadline: October 15) semesters. International students should apply at least 6 months before the start of the semester. Visit the Morgan State University School of Graduate Studies website for more information.', 'Dr. Md Rahman, Graduate Program Coordinator\nEmail: Md.Rahman@morgan.edu\nPhone: (443) 885-1056\nOffice: McMechen 629'),
('Advanced Computing PhD', 'Ph.D.', 'The Doctor of Philosophy (Ph.D.) in Advanced Computing program delves into advanced areas of computer science research, including Quantum Cryptography, Algorithms, Cybersecurity, AI/ML, and Data Analytics. It also emphasizes responsible computing innovations. The program can be taken on campus or fully online/remote.', 'Master''s degree in Computer Science or related field with a minimum GPA of 3.3. GRE scores (minimum 160 Quantitative), 3 letters of recommendation from academic references, statement of purpose, research proposal, and interview with potential advisor.', 'Applications are accepted for fall (deadline: March 1) and spring (deadline: September 1) semesters. Admission is highly competitive, and funding is available for qualified students. Visit the Morgan State University School of Graduate Studies website for more information.', 'Dr. Vojislav Stojkovic, Doctoral Program Coordinator\nEmail: vojislav.stojkovic@morgan.edu\nPhone: (443) 885-4892\nOffice: McMechen Hall 622'),
('Bioinformatics', 'M.S.', 'The Master of Science (M.S.) in Bioinformatics program provides coursework in computational biology methods, programming, and biostatistics. It offers flexibility through electives to specialize in life sciences and computer sciences, preparing graduates for the growing field of bioinformatics.', 'Bachelor''s degree in Computer Science, Biology, or related field with a minimum GPA of 3.0. Coursework in programming, biology, and statistics is recommended. GRE scores, 3 letters of recommendation, statement of purpose.', 'Applications are accepted for fall (deadline: May 1) and spring (deadline: November 1) semesters. The program involves collaboration between the Computer Science and Biology departments. Visit the Morgan State University School of Graduate Studies website for more information.', 'Dr. Farin Kamangar, Bioinformatics Program Coordinator\nEmail: farin.kamangar@morgan.edu\nPhone: (443) 885-3519\nOffice: McMechen Hall 626');
