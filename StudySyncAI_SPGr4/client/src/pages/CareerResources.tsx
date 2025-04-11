import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BriefcaseIcon, 
  FileTextIcon, 
  UsersIcon, 
  CalendarIcon, 
  GraduationCapIcon,
  GlobeIcon,
  BookOpenIcon,
  AwardIcon
} from 'lucide-react';

export default function CareerResources() {
  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#F5A623]">Career Resources</h1>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Morgan State University Career Development</CardTitle>
              <CardDescription className="text-[#003366]">
                Resources to help you prepare for your career in computer science
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366]">
              <p className="mb-4">
                The Computer Science department at Morgan State University partners with the 
                University Career Development Center to provide specialized resources for CS 
                students looking to enter the tech industry.
              </p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students', '_blank')}>
                  Visit Career Center Website
                </Button>
                <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/appointment', '_blank')}>
                  Schedule Career Counseling
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="resume" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4 bg-neutral-700">
              <TabsTrigger value="resume" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Resume/CV
              </TabsTrigger>
              <TabsTrigger value="interview" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Interview Prep
              </TabsTrigger>
              <TabsTrigger value="networking" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Networking
              </TabsTrigger>
              <TabsTrigger value="career-path" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Career Paths
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="resume">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Build a Strong Tech Resume</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Create a resume that stands out to tech recruiters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex items-start mb-4">
                        <FileTextIcon className="h-6 w-6 mr-3 text-[#F5A623]" />
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-1">Resume Essentials for CS Students</h3>
                          <ul className="space-y-2 text-[#003366]">
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Highlight technical skills with proficiency levels</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Showcase projects with measurable outcomes</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>List relevant coursework that demonstrates technical depth</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Include GitHub/portfolio links</span>
                            </li>
                            <li className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>Quantify achievements with metrics when possible</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/resumes-cover-letters', '_blank')}>
                          Download Resume Templates
                        </Button>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex items-start mb-4">
                        <CalendarIcon className="h-6 w-6 mr-3 text-[#F5A623]" />
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-1">Resume Review Sessions</h3>
                          <p className="text-[#003366] mb-2">
                            Get personalized feedback on your resume from industry professionals
                            and career counselors.
                          </p>
                          <p className="text-sm text-[#003366]">
                            <strong>When:</strong> Every Tuesday and Thursday, 2-4 PM<br />
                            <strong>Where:</strong> Career Center (Jenkins Behavioral Science Building, 1st Floor) or virtually<br />
                            <strong>How:</strong> Schedule an appointment through the Career Center website
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/appointment', '_blank')}>
                          Schedule Resume Review
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="interview">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Technical Interview Preparation</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Resources to help you excel in technical and behavioral interviews
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-[#F5A623] mb-3">Technical Interview Resources</h3>
                        <ul className="space-y-3 text-[#003366]">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <div>
                              <p className="font-medium">LeetCode Study Plan</p>
                              <p className="text-sm">Practice coding problems commonly asked in interviews</p>
                              <Button variant="link" className="text-[#F5A623] p-0 h-auto mt-1" onClick={() => window.open('https://leetcode.com/study-plan/', '_blank')}>
                                Visit LeetCode
                              </Button>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <div>
                              <p className="font-medium">Morgan State Mock Interview Program</p>
                              <p className="text-sm">Schedule a practice interview with CS faculty</p>
                              <Button variant="link" className="text-[#F5A623] p-0 h-auto mt-1" onClick={() => window.open('https://www.morgan.edu/school-of-computer-mathematical-and-natural-sciences/departments/computer-science', '_blank')}>
                                Learn More
                              </Button>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <div>
                              <p className="font-medium">System Design Fundamentals</p>
                              <p className="text-sm">Resources for approaching system design questions</p>
                              <Button variant="link" className="text-[#F5A623] p-0 h-auto mt-1" onClick={() => window.open('https://github.com/donnemartin/system-design-primer', '_blank')}>
                                Access Resources
                              </Button>
                            </div>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-[#F5A623] mb-3">Behavioral Interview Tips</h3>
                        <div className="space-y-4 text-[#003366]">
                          <p>
                            Prepare for behavioral questions using the STAR method:
                          </p>
                          <ul className="space-y-2">
                            <li><strong>S</strong>ituation: Describe the context</li>
                            <li><strong>T</strong>ask: Explain your responsibility</li>
                            <li><strong>A</strong>ction: Detail the steps you took</li>
                            <li><strong>R</strong>esult: Share the outcome</li>
                          </ul>
                          <p className="text-sm mt-4">
                            The Career Center offers behavioral interview workshops each semester.
                            Check the events calendar for upcoming sessions.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <h3 className="text-lg font-medium text-[#F5A623] mb-3">Mock Interview Sessions</h3>
                      <p className="text-[#003366] mb-4">
                        The Computer Science department partners with alumni and industry professionals 
                        to provide realistic mock interviews for students.
                      </p>
                      <div className="flex justify-end">
                        <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/career-events', '_blank')}>
                          View Upcoming Mock Interview Events
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="networking">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Professional Networking</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Build connections in the tech industry
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex items-start">
                        <UsersIcon className="h-6 w-6 mr-3 text-[#F5A623]" />
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-2">Morgan State Tech Network</h3>
                          <p className="text-[#003366] mb-3">
                            Connect with Morgan State CS alumni working in the tech industry through 
                            our alumni network platform.
                          </p>
                          <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/alumni-and-friends', '_blank')}>
                            Join Alumni Network
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-[#F5A623] mb-3">Upcoming Networking Events</h3>
                        <ul className="space-y-4 text-[#003366]">
                          <li>
                            <p className="font-medium">Annual Tech Career Fair</p>
                            <p className="text-sm">September 15, 2025 • 10AM - 3PM • University Student Center</p>
                          </li>
                          <li>
                            <p className="font-medium">Industry Speaker Series</p>
                            <p className="text-sm">Monthly • Next event: April 20, 2025 • 4PM • Dixon Research Center</p>
                          </li>
                          <li>
                            <p className="font-medium">Women in Computing Mixer</p>
                            <p className="text-sm">May 3, 2025 • 5PM - 7PM • McKeldin Center</p>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <h3 className="text-lg font-medium text-[#F5A623] mb-3">Professional Organizations</h3>
                        <ul className="space-y-3 text-[#003366]">
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <div>
                              <p className="font-medium">ACM Student Chapter</p>
                              <p className="text-sm">Join Morgan's Association for Computing Machinery chapter</p>
                              <Button variant="link" className="text-[#F5A623] p-0 h-auto mt-1" onClick={() => window.open('https://www.morgan.edu/school-of-computer-mathematical-and-natural-sciences/departments/computer-science/student-organizations', '_blank')}>
                                Learn More
                              </Button>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <div>
                              <p className="font-medium">National Society of Black Engineers (NSBE)</p>
                              <p className="text-sm">Connect with peers and professionals in engineering</p>
                              <Button variant="link" className="text-[#F5A623] p-0 h-auto mt-1" onClick={() => window.open('https://www.nsbe.org/', '_blank')}>
                                Visit NSBE Website
                              </Button>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2">•</span>
                            <div>
                              <p className="font-medium">Black Data Processing Associates (BDPA)</p>
                              <p className="text-sm">Professional organization focused on IT careers</p>
                              <Button variant="link" className="text-[#F5A623] p-0 h-auto mt-1" onClick={() => window.open('https://www.bdpa.org/', '_blank')}>
                                Visit BDPA Website
                              </Button>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="career-path">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">CS Career Pathways</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Explore different career options with a CS degree
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <div className="flex flex-col items-center mb-4">
                          <GlobeIcon className="h-10 w-10 text-[#F5A623] mb-2" />
                          <h3 className="text-lg font-medium text-[#F5A623] text-center">Software Development</h3>
                        </div>
                        <ul className="space-y-2 text-[#003366]">
                          <li>Frontend Developer</li>
                          <li>Backend Developer</li>
                          <li>Full Stack Engineer</li>
                          <li>Mobile App Developer</li>
                          <li>DevOps Engineer</li>
                          <li>QA/Test Engineer</li>
                        </ul>
                        <div className="mt-4 flex justify-center">
                          <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/career-resources', '_blank')}>
                            Learn More
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <div className="flex flex-col items-center mb-4">
                          <BookOpenIcon className="h-10 w-10 text-[#F5A623] mb-2" />
                          <h3 className="text-lg font-medium text-[#F5A623] text-center">Data & AI</h3>
                        </div>
                        <ul className="space-y-2 text-[#003366]">
                          <li>Data Scientist</li>
                          <li>Machine Learning Engineer</li>
                          <li>AI Researcher</li>
                          <li>Data Analyst</li>
                          <li>Business Intelligence Analyst</li>
                          <li>Database Administrator</li>
                        </ul>
                        <div className="mt-4 flex justify-center">
                          <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/career-resources', '_blank')}>
                            Learn More
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-neutral-700 p-5 rounded-lg">
                        <div className="flex flex-col items-center mb-4">
                          <AwardIcon className="h-10 w-10 text-[#F5A623] mb-2" />
                          <h3 className="text-lg font-medium text-[#F5A623] text-center">Cybersecurity</h3>
                        </div>
                        <ul className="space-y-2 text-[#003366]">
                          <li>Security Analyst</li>
                          <li>Network Security Engineer</li>
                          <li>Security Consultant</li>
                          <li>Penetration Tester</li>
                          <li>Security Architect</li>
                          <li>Digital Forensics Analyst</li>
                        </ul>
                        <div className="mt-4 flex justify-center">
                          <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/career-resources', '_blank')}>
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex items-start">
                        <GraduationCapIcon className="h-6 w-6 mr-3 text-[#F5A623]" />
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-2">Graduate Education Pathways</h3>
                          <p className="text-[#003366] mb-3">
                            Considering continuing your education after your bachelor's degree? 
                            Morgan State offers master's and doctoral programs in Computer Science and 
                            related fields.
                          </p>
                          <ul className="space-y-2 text-[#003366] mb-4">
                            <li>MS in Computer Science</li>
                            <li>PhD in Computer Science</li>
                            <li>MS in Information Systems</li>
                            <li>MS in Cybersecurity</li>
                          </ul>
                          <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/school-of-graduate-studies/areas-of-study/graduate-programs/graduate-computer-science', '_blank')}>
                            Explore Graduate Programs
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6 text-center">
            <h2 className="text-xl font-bold text-[#F5A623] mb-4">Need Personalized Career Guidance?</h2>
            <p className="text-[#003366] mb-6 max-w-2xl mx-auto">
              Schedule a one-on-one appointment with a career counselor specializing in 
              technology careers to discuss your specific goals and questions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
                onClick={() => window.open('https://www.morgan.edu/career-center/students/appointment', '_blank')}
              >
                Schedule Career Counseling
              </Button>
              <Button 
                variant="outline"
                className="border-[#003366] text-[#F5A623] hover:bg-[#003366]/10"
                onClick={() => window.open('https://www.morgan.edu/career-center/students/career-resources', '_blank')}
              >
                Download Career Guide
              </Button>
            </div>
          </div>
        </div>
      </main>
    </AppContainer>
  );
}