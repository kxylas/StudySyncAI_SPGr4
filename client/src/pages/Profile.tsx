import { User, Mail, Phone, Award, Clock, Calendar, BookOpen, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import AppContainer from '@/components/AppContainer';

export default function Profile() {
  // Normally this would come from an API call or auth context
  const userProfile = {
    name: "Morgan Student",
    email: "student@morgan.edu",
    studentId: "MS123456",
    program: "Computer Science",
    role: "Student",
    level: "Junior",
    enrolled: "Fall 2023",
    gpa: "3.75",
    advisor: "Dr. Guobin Xu",
    completedCredits: 78,
    requiredCredits: 120,
    phoneNumber: "(443) 555-1212",
    office: "McMechen Hall, Room 100",
    officeHours: "Mon/Wed 2-4pm",
    courses: [
      {
        id: "COSC349",
        title: "Computer Networks",
        credits: 3,
        grade: "A",
        term: "Fall 2023"
      },
      {
        id: "COSC351",
        title: "Cybersecurity Fundamentals",
        credits: 3,
        grade: "A-",
        term: "Fall 2023"
      },
      {
        id: "COSC352",
        title: "Programming Languages",
        credits: 3,
        grade: "B+",
        term: "Fall 2023"
      },
      {
        id: "MATH331",
        title: "Applied Probability and Statistics",
        credits: 3,
        grade: "A",
        term: "Fall 2023"
      }
    ],
    achievements: [
      "Dean's List: Fall 2023",
      "Morgan CS Hackathon Winner 2023",
      "Academic Excellence Scholarship Recipient",
      "Google Student Developer Club Member"
    ]
  };

  // Calculate progress towards degree
  const progressPercentage = (userProfile.completedCredits / userProfile.requiredCredits) * 100;

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-[#F5A623] mb-6">My Profile</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <Card className="bg-neutral-800 border-neutral-700 lg:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex justify-center mb-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-3xl font-bold">
                      {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <Badge className="absolute bottom-0 right-0 bg-[#F5A623] hover:bg-[#F5A623] text-[#003366]">
                      {userProfile.role}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl text-center text-[#F5A623]">{userProfile.name}</CardTitle>
                <CardDescription className="text-center text-[#003366] font-medium">
                  {userProfile.program} - {userProfile.level}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-2">
                  <div className="flex items-center text-[#003366]">
                    <Mail className="mr-2 h-5 w-5 text-[#F5A623]" />
                    <span>{userProfile.email}</span>
                  </div>
                  <div className="flex items-center text-[#003366]">
                    <User className="mr-2 h-5 w-5 text-[#F5A623]" />
                    <span>ID: {userProfile.studentId}</span>
                  </div>
                  <div className="flex items-center text-[#003366]">
                    <Phone className="mr-2 h-5 w-5 text-[#F5A623]" />
                    <span>{userProfile.phoneNumber}</span>
                  </div>
                  <div className="flex items-center text-[#003366]">
                    <BookOpen className="mr-2 h-5 w-5 text-[#F5A623]" />
                    <span>Advisor: {userProfile.advisor}</span>
                  </div>
                  <div className="flex items-center text-[#003366]">
                    <Calendar className="mr-2 h-5 w-5 text-[#F5A623]" />
                    <span>Enrolled: {userProfile.enrolled}</span>
                  </div>
                  {userProfile.office && (
                    <div className="flex items-center text-[#003366]">
                      <Building className="mr-2 h-5 w-5 text-[#F5A623]" />
                      <span>{userProfile.office}</span>
                    </div>
                  )}
                  {userProfile.officeHours && (
                    <div className="flex items-center text-[#003366]">
                      <Clock className="mr-2 h-5 w-5 text-[#F5A623]" />
                      <span>{userProfile.officeHours}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="text-[#F5A623] text-lg font-medium mb-2">Degree Progress</h3>
                  <div className="w-full bg-neutral-700 rounded-full h-4 mb-2">
                    <div 
                      className="bg-[#F5A623] h-4 rounded-full" 
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-[#003366]">
                    <span>{userProfile.completedCredits} credits completed</span>
                    <span>{userProfile.requiredCredits} required</span>
                  </div>
                  <div className="text-center mt-2">
                    <Badge className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
                      GPA: {userProfile.gpa}
                    </Badge>
                  </div>
                </div>

                <Separator className="my-6 bg-neutral-700" />

                <div>
                  <h3 className="text-[#F5A623] text-lg font-medium mb-4">Achievements</h3>
                  <ul className="space-y-2">
                    {userProfile.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <Award className="mr-2 h-5 w-5 text-[#F5A623] flex-shrink-0 mt-0.5" />
                        <span className="text-[#003366]">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>

            {/* Academic Details Section */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="courses" className="w-full">
                <TabsList className="grid grid-cols-3 mb-4 bg-neutral-700">
                  <TabsTrigger value="courses" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    Current Courses
                  </TabsTrigger>
                  <TabsTrigger value="transcript" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    Transcript
                  </TabsTrigger>
                  <TabsTrigger value="materials" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                    Learning Materials
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="courses">
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader>
                      <CardTitle className="text-[#F5A623]">Current Semester Courses</CardTitle>
                      <CardDescription className="text-[#003366]">
                        Spring 2024
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {userProfile.courses.map((course) => (
                          <Card key={course.id} className="bg-neutral-700 border-neutral-600">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h4 className="font-semibold text-[#F5A623]">{course.id}: {course.title}</h4>
                                  <p className="text-sm text-[#003366]">{course.credits} credits • {course.term}</p>
                                </div>
                                <Badge className="bg-[#F5A623] text-[#003366]">{course.grade}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transcript">
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader>
                      <CardTitle className="text-[#F5A623]">Academic Transcript</CardTitle>
                      <CardDescription className="text-[#003366]">
                        Your complete academic history
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-2">Fall 2023</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="text-[#003366] border-b border-neutral-700">
                                  <th className="text-left p-2">Course</th>
                                  <th className="text-left p-2">Title</th>
                                  <th className="text-center p-2">Credits</th>
                                  <th className="text-center p-2">Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userProfile.courses.map((course) => (
                                  <tr key={course.id} className="border-b border-neutral-700">
                                    <td className="p-2 text-[#F5A623]">{course.id}</td>
                                    <td className="p-2 text-[#003366]">{course.title}</td>
                                    <td className="p-2 text-center text-[#003366]">{course.credits}</td>
                                    <td className="p-2 text-center">
                                      <Badge className="bg-[#003366] text-[#F5A623]">{course.grade}</Badge>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                              <tfoot>
                                <tr className="text-[#F5A623]">
                                  <td colSpan={2} className="p-2 text-right font-medium">Semester GPA:</td>
                                  <td colSpan={2} className="p-2 text-center font-medium">3.75</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-2">Spring 2023</h3>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="text-[#003366] border-b border-neutral-700">
                                  <th className="text-left p-2">Course</th>
                                  <th className="text-left p-2">Title</th>
                                  <th className="text-center p-2">Credits</th>
                                  <th className="text-center p-2">Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-neutral-700">
                                  <td className="p-2 text-[#F5A623]">COSC 220</td>
                                  <td className="p-2 text-[#003366]">Data Structures & Algorithms</td>
                                  <td className="p-2 text-center text-[#003366]">4</td>
                                  <td className="p-2 text-center">
                                    <Badge className="bg-[#003366] text-[#F5A623]">A</Badge>
                                  </td>
                                </tr>
                                <tr className="border-b border-neutral-700">
                                  <td className="p-2 text-[#F5A623]">COSC 241</td>
                                  <td className="p-2 text-[#003366]">Computer Systems & Organization</td>
                                  <td className="p-2 text-center text-[#003366]">3</td>
                                  <td className="p-2 text-center">
                                    <Badge className="bg-[#003366] text-[#F5A623]">B+</Badge>
                                  </td>
                                </tr>
                                <tr className="border-b border-neutral-700">
                                  <td className="p-2 text-[#F5A623]">MATH 242</td>
                                  <td className="p-2 text-[#003366]">Calculus II</td>
                                  <td className="p-2 text-center text-[#003366]">4</td>
                                  <td className="p-2 text-center">
                                    <Badge className="bg-[#003366] text-[#F5A623]">B</Badge>
                                  </td>
                                </tr>
                              </tbody>
                              <tfoot>
                                <tr className="text-[#F5A623]">
                                  <td colSpan={2} className="p-2 text-right font-medium">Semester GPA:</td>
                                  <td colSpan={2} className="p-2 text-center font-medium">3.60</td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
                        Download Official Transcript
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                
                <TabsContent value="materials">
                  <Card className="bg-neutral-800 border-neutral-700">
                    <CardHeader>
                      <CardTitle className="text-[#F5A623]">Learning Materials</CardTitle>
                      <CardDescription className="text-[#003366]">
                        Access your course materials and resources
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-3">COSC 349: Computer Networks</h3>
                          <div className="grid gap-3">
                            <Card className="bg-neutral-700 border-neutral-600">
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="mr-3 p-2 bg-[#003366] rounded">
                                    <BookOpen className="h-5 w-5 text-[#F5A623]" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-[#F5A623]">Textbook PDF</h4>
                                    <p className="text-sm text-[#003366]">Computer Networks: A Systems Approach</p>
                                  </div>
                                </div>
                                <Button variant="outline" className="border-[#F5A623] text-[#F5A623]">Download</Button>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-neutral-700 border-neutral-600">
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="mr-3 p-2 bg-[#003366] rounded">
                                    <BookOpen className="h-5 w-5 text-[#F5A623]" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-[#F5A623]">Lecture Slides</h4>
                                    <p className="text-sm text-[#003366]">Week 8: TCP/IP Protocol Stack</p>
                                  </div>
                                </div>
                                <Button variant="outline" className="border-[#F5A623] text-[#F5A623]">View</Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-3">COSC 351: Cybersecurity Fundamentals</h3>
                          <div className="grid gap-3">
                            <Card className="bg-neutral-700 border-neutral-600">
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <div className="mr-3 p-2 bg-[#003366] rounded">
                                    <BookOpen className="h-5 w-5 text-[#F5A623]" />
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-[#F5A623]">Lab Instructions</h4>
                                    <p className="text-sm text-[#003366]">Lab 5: Intrusion Detection Systems</p>
                                  </div>
                                </div>
                                <Button variant="outline" className="border-[#F5A623] text-[#F5A623]">Download</Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </AppContainer>
  );
}