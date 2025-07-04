import { useState } from 'react';
import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Loader2 } from 'lucide-react';
import type { Course } from '@shared/schema';

export default function Curriculum() {
  const [yearTab, setYearTab] = useState("first-year");
  const [semesterTab, setSemesterTab] = useState("fall");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  
  // Fetch courses from the API
  const { data: courses, isLoading, error } = useQuery<Course[]>({
    queryKey: ['/api/courses'],
    queryFn: async () => {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return response.json();
    }
  });

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#F5A623]">Curriculum and Courses</h1>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Bachelor of Science (B.S.) in Computer Science</CardTitle>
              <CardDescription className="text-[#003366]">
                The undergraduate program in Computer Science prepares students for entry into 
                the computing profession, for graduate study in computer, computational, and data sciences, 
                and for the many challenges that will confront them in their professional and personal life.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366]">
              <div className="max-w-3xl">
                <p className="mb-4">
                  The Computer Science program prepares students to apply their knowledge and training to produce solutions 
                  to specific and complex problems. Students learn to define the problem clearly; to determine its 
                  tractability; to determine when consultation with outside experts is appropriate; and to choose 
                  an appropriate solution strategy.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Curriculum Sequence</CardTitle>
              <CardDescription className="text-[#003366]">
                Suggested sequence of courses by semester
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="first-year" value={yearTab} onValueChange={setYearTab} className="w-full">
                <TabsList className="grid grid-cols-4 mb-4 bg-neutral-700">
                  <TabsTrigger value="first-year" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    First Year
                  </TabsTrigger>
                  <TabsTrigger value="second-year" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    Second Year
                  </TabsTrigger>
                  <TabsTrigger value="third-year" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    Third Year
                  </TabsTrigger>
                  <TabsTrigger value="fourth-year" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    Fourth Year
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="first-year">
                  <Tabs defaultValue="fall" value={semesterTab} onValueChange={setSemesterTab}>
                    <TabsList className="bg-neutral-700">
                      <TabsTrigger value="fall" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Fall Semester
                      </TabsTrigger>
                      <TabsTrigger value="spring" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Spring Semester
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fall" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">First Year (Fall Semester): 15 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 111</span>
                            <span className="text-[#003366] ml-2">- Introduction to Computer Science I</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">4 credits (IM)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">ENGL 101</span>
                            <span className="text-[#003366] ml-2">- Freshman Composition I</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (EC)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">MATH 241</span>
                            <span className="text-[#003366] ml-2">- Calculus I</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">4 credits (MQ)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">CT General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (CT)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">ORNS 106</span>
                            <span className="text-[#003366] ml-2">- Freshman Orientation</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">1 credit</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="spring" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">First Year (Spring Semester): 15 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">ENGL 102</span>
                            <span className="text-[#003366] ml-2">- Freshman Composition II</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (EC)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">HH General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (HH)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">Phys. ED. Activity</span>
                            <span className="text-[#003366] ml-2">- or FIN 101 or MIND 101 or DSVG 101 or FACS 102</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">1 credit</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 112</span>
                            <span className="text-[#003366] ml-2">- Introduction to Computer Science II</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">4 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">MATH 242</span>
                            <span className="text-[#003366] ml-2">- Calculus II</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">4 credits</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="second-year">
                  <Tabs defaultValue="fall" value={semesterTab} onValueChange={setSemesterTab}>
                    <TabsList className="bg-neutral-700">
                      <TabsTrigger value="fall" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Fall Semester
                      </TabsTrigger>
                      <TabsTrigger value="spring" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Spring Semester
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fall" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">Second Year (Fall Semester): 16 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 220</span>
                            <span className="text-[#003366] ml-2">- Data Structures and Algorithms</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">4 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 241</span>
                            <span className="text-[#003366] ml-2">- Computer Systems and Digital Logic</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">AH General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (AH)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group A Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="spring" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">Second Year (Spring Semester): 16 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 281</span>
                            <span className="text-[#003366] ml-2">- Discrete Structure</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group A Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group A Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">MATH 312</span>
                            <span className="text-[#003366] ml-2">- Linear Algebra I</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">AH General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (AH)</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="third-year">
                  <Tabs defaultValue="fall" value={semesterTab} onValueChange={setSemesterTab}>
                    <TabsList className="bg-neutral-700">
                      <TabsTrigger value="fall" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Fall Semester
                      </TabsTrigger>
                      <TabsTrigger value="spring" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Spring Semester
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fall" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">Third Year (Fall Semester): 15 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 349</span>
                            <span className="text-[#003366] ml-2">- Computer Networks</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 351</span>
                            <span className="text-[#003366] ml-2">- Cybersecurity</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 352</span>
                            <span className="text-[#003366] ml-2">- Organization of Programming Languages</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group B Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">BP General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">4 credits (BP)</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="spring" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">Third Year (Spring Semester): 16 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 354</span>
                            <span className="text-[#003366] ml-2">- Operating Systems</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">MATH 331</span>
                            <span className="text-[#003366] ml-2">- Applied Probability and Statistics</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group B Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">CI General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (CI)</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">BP General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (BP)</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="fourth-year">
                  <Tabs defaultValue="fall" value={semesterTab} onValueChange={setSemesterTab}>
                    <TabsList className="bg-neutral-700">
                      <TabsTrigger value="fall" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Fall Semester
                      </TabsTrigger>
                      <TabsTrigger value="spring" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                        Spring Semester
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="fall" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">Fourth Year (Fall Semester): 15 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 458</span>
                            <span className="text-[#003366] ml-2">- Software Engineering</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 459</span>
                            <span className="text-[#003366] ml-2">- Database Design</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC 490</span>
                            <span className="text-[#003366] ml-2">- Senior Project</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group C Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">SB General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (SB)</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="spring" className="bg-neutral-700 p-5 rounded-b-md">
                      <h3 className="text-xl text-[#F5A623] mb-3">Fourth Year (Spring Semester): 15 Credits</h3>
                      <ul className="space-y-3">
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group C Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group C Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group C Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">COSC Group D Elective</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 bg-neutral-600 rounded-lg">
                          <div>
                            <span className="text-white font-medium">SB General Education Req.</span>
                          </div>
                          <Badge className="bg-[#003366] text-[#F5A623]">3 credits (SB)</Badge>
                        </li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Course Catalog</CardTitle>
              <CardDescription className="text-[#003366]">
                Explore detailed information about all Computer Science courses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge 
                    onClick={() => setCategoryFilter("all")} 
                    className={`cursor-pointer ${categoryFilter === "all" ? "bg-[#F5A623] text-[#003366]" : "bg-[#003366] text-[#F5A623]"}`}
                  >
                    All Courses
                  </Badge>
                  <Badge 
                    onClick={() => setCategoryFilter("Core")} 
                    className={`cursor-pointer ${categoryFilter === "Core" ? "bg-[#F5A623] text-[#003366]" : "bg-[#003366] text-[#F5A623]"}`}
                  >
                    Core Courses
                  </Badge>
                  <Badge 
                    onClick={() => setCategoryFilter("Group A Elective")} 
                    className={`cursor-pointer ${categoryFilter === "Group A Elective" ? "bg-[#F5A623] text-[#003366]" : "bg-[#003366] text-[#F5A623]"}`}
                  >
                    Group A Electives
                  </Badge>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin text-[#F5A623]" />
                </div>
              ) : error ? (
                <div className="bg-red-900/20 p-4 rounded-md text-red-500">
                  Error loading courses. Please try again later.
                </div>
              ) : (
                <Accordion type="single" collapsible className="w-full">
                  {courses?.filter(course => categoryFilter === "all" || course.category === categoryFilter)
                    .map((course) => (
                      <AccordionItem key={course.id} value={`course-${course.id}`} className="border-b border-neutral-700">
                        <AccordionTrigger className="hover:bg-neutral-700 px-4 py-2 rounded-md text-left">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
                            <div>
                              <span className="text-[#F5A623] font-semibold">{course.courseCode}</span>
                              <span className="text-white ml-2">{course.title}</span>
                            </div>
                            <Badge className="hidden sm:inline-flex bg-[#003366] text-[#F5A623] mt-2 sm:mt-0">
                              {course.credits} {course.credits === 1 ? 'credit' : 'credits'}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="bg-neutral-700 rounded-b-md px-4 pb-4 pt-2">
                          <div className="space-y-3 text-[#003366]">
                            <div>
                              <h4 className="text-white font-medium">Description</h4>
                              <p>{course.description}</p>
                            </div>
                            {course.prerequisites && (
                              <div>
                                <h4 className="text-white font-medium">Prerequisites</h4>
                                <p>{course.prerequisites}</p>
                              </div>
                            )}
                            <div>
                              <h4 className="text-white font-medium">Category</h4>
                              <p>{course.category}</p>
                            </div>
                            {course.syllabus && (
                              <div>
                                <h4 className="text-white font-medium">Syllabus</h4>
                                <p>{course.syllabus}</p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </AppContainer>
  );
}