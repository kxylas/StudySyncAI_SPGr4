import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

export default function Requirements() {
  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#F5A623]">Program Requirements</h1>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Degree Requirements Overview</CardTitle>
              <CardDescription className="text-gray-400">
                Bachelor of Science (B.S.) in Computer Science
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-6">
                A minimum of 120 credit hours are required to graduate with a B.S. in Computer Science.
                These credit hours are distributed as follows:
              </p>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">General Education and University Requirements</span>
                    <span className="text-[#F5A623]">44 credits</span>
                  </div>
                  <Progress value={36.6} className="h-2 bg-neutral-600">
                    <div className="h-full bg-gradient-to-r from-[#003366] to-[#F5A623]" style={{ width: '36.6%' }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Supporting Courses</span>
                    <span className="text-[#F5A623]">11 credits</span>
                  </div>
                  <Progress value={9.2} className="h-2 bg-neutral-600">
                    <div className="h-full bg-gradient-to-r from-[#003366] to-[#F5A623]" style={{ width: '9.2%' }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Required Courses for the Computer Science Major</span>
                    <span className="text-[#F5A623]">65 credits</span>
                  </div>
                  <Progress value={54.2} className="h-2 bg-neutral-600">
                    <div className="h-full bg-gradient-to-r from-[#003366] to-[#F5A623]" style={{ width: '54.2%' }} />
                  </Progress>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Total Credits</span>
                    <span className="text-[#F5A623]">120 credits</span>
                  </div>
                  <Progress value={100} className="h-2 bg-neutral-600">
                    <div className="h-full bg-gradient-to-r from-[#003366] to-[#F5A623]" style={{ width: '100%' }} />
                  </Progress>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="school" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-neutral-700">
              <TabsTrigger value="school" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                School-wide Requirements
              </TabsTrigger>
              <TabsTrigger value="program" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Program Requirements
              </TabsTrigger>
              <TabsTrigger value="electives" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Electives
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="school">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">School-wide Requirements</CardTitle>
                  <CardDescription className="text-gray-400">
                    Requirements for all majors in the School of Computer, Mathematical and Natural Sciences
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <ul className="list-disc pl-6 space-y-4">
                    <li>
                      <span className="font-medium block mb-1">General Education Requirements</span>
                      <p className="text-gray-400 text-sm pl-4">
                        Complete all general education requirements as specified by the university.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block mb-1">Complementary Studies Program</span>
                      <p className="text-gray-400 text-sm pl-4">
                        Earn six (6) credits in the Complementary Studies Program required for all majors in the School 
                        of Computer, Mathematical and Natural Sciences.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block mb-1">Senior Departmental Comprehensive Examination</span>
                      <p className="text-gray-400 text-sm pl-4">
                        Pass the Senior Departmental Comprehensive Examination.
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block mb-1">Junior and Senior-level Requirements</span>
                      <p className="text-gray-400 text-sm pl-4">
                        Take all junior and senior-level requirements in the major at Morgan State University
                        (unless granted prior written permission by the Dean to take courses elsewhere).
                      </p>
                    </li>
                    <li>
                      <span className="font-medium block mb-1">GPA Requirements</span>
                      <p className="text-gray-400 text-sm pl-4">
                        Earn a cumulative average of 2.0 or better and a major average of 2.0 or better, with no outstanding 
                        grades below "C" in the major (which includes all courses required for the major and required 
                        supporting courses).
                      </p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="program">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Program-specific Requirements</CardTitle>
                  <CardDescription className="text-gray-400">
                    Required courses for the Computer Science major
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Core Courses</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="bg-neutral-700 p-2 rounded">COSC 111 - Introduction to Computer Science I</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 112 - Introduction to Computer Science II</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 220 - Data Structures and Algorithms</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 241 - Computer Systems and Digital Logic</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 281 - Discrete Structure</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 349 - Computer Networks</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 351 - Cybersecurity</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 352 - Organization of Programming Languages</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 354 - Operating Systems</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 458 - Software Engineering</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 459 - Database Design</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 490 - Senior Project</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Supporting Courses</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="bg-neutral-700 p-2 rounded">MATH 241 - Calculus I</li>
                        <li className="bg-neutral-700 p-2 rounded">MATH 242 - Calculus II</li>
                        <li className="bg-neutral-700 p-2 rounded">MATH 312 - Linear Algebra I</li>
                        <li className="bg-neutral-700 p-2 rounded">MATH 331 - Applied Probability and Statistics</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 201 - Computer Ethics</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Elective Requirements</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Three COSC Group A Electives (3 credits each)</li>
                        <li>Two COSC Group B Electives (3 credits each)</li>
                        <li>Four COSC Group C Electives (3 credits each)</li>
                        <li>One COSC Group D Elective (3 credits)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="electives">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Computer Science Electives</CardTitle>
                  <CardDescription className="text-gray-400">
                    Elective courses grouped by category
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-gray-300">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Group A Electives</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="bg-neutral-700 p-2 rounded">COSC 238 - Object Oriented Programming (4 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 239 - Java Programming (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 243 - Computer Architecture (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 251 - Introduction to Data Science (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">CLCO 261 - Introduction to Cloud Computing (3 credits)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Group B Electives</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="bg-neutral-700 p-2 rounded">COSC 320 - Algorithm Design and Analysis (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 323 - Introduction to Cryptography (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 332 - Introduction to Game Design and Development (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 338 - Mobile App Design & Development (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 383 - Numerical Methods and Programming (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 385 - Theory of Languages and Automata (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 386 - Introduction to Quantum Computing (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">MATH 313 - Linear Algebra II (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">EEGR 317 - Electronic Circuits (4 credits)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Group C Electives</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="bg-neutral-700 p-2 rounded">COSC 470 - Artificial Intelligence (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 472 - Introduction to Machine Learning (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 460 - Computer Graphics (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 480 - Introduction to Image Processing and Analysis (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 486 - Applied Quantum Computing (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 491 - Conference Course (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 498 - Senior Internship (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">COSC 499 - Senior Research or Teaching/Tutorial Assistantship (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">CLCO 471 - Data Analytics in Cloud (3 credits)</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Group D Electives</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="bg-neutral-700 p-2 rounded">INSS 391 - IT Infrastructure and Security (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">INSS 494 - Information Security and Risk Management (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">EEGR 481 - Introduction to Network Security (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">EEGR 483 - Introduction to Security Management (3 credits)</li>
                        <li className="bg-neutral-700 p-2 rounded">300 - 400 level COSC Course (not previously taken) (3 credits)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </AppContainer>
  );
}