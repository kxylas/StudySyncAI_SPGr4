import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarIcon, ClockIcon, BuildingIcon, MapPinIcon, ExternalLinkIcon } from 'lucide-react';

export default function Internships() {
  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#F5A623]">Internship Opportunities</h1>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">About Internship Opportunities</CardTitle>
              <CardDescription className="text-[#003366]">
                The Computer Science department has collaborations with many organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366]">
              <p className="mb-4">
                The department has collaborations with Google, Facebook, JP Morgan Chase, NASA, NSA, 
                Lockheed Martin, and many other public and private organizations to provide internships 
                and other opportunities for students.
              </p>
              <p className="mb-4">
                For the most up-to-date information, please check out CS Twitter: <a href="https://twitter.com/Morgan_CompSci" target="_blank" rel="noopener noreferrer" className="text-[#F5A623] hover:underline">@Morgan_CompSci</a>
              </p>
              <div className="mt-6">
                <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/career-resources', '_blank')}>
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  Visit Internship Opportunities Page
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4 bg-neutral-700">
              <TabsTrigger value="current" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Current Opportunities
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Upcoming Deadlines
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Past Students
              </TabsTrigger>
              <TabsTrigger value="resources" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Resources
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="current">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-[#F5A623]">Google Summer of Code</CardTitle>
                      <Badge className="bg-[#003366] text-[#F5A623]">Remote</Badge>
                    </div>
                    <CardDescription className="text-[#003366]">Software Engineering Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#003366] pt-2">
                    <div className="space-y-4">
                      <p>
                        Build open source projects as part of this global program focused on 
                        bringing student developers into open source development.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-[#003366]">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>Google</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <ClockIcon className="mr-1 h-4 w-4" />
                          <span>Full-time</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Summer 2025</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
                          onClick={() => window.open('https://summerofcode.withgoogle.com/', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-[#F5A623]">NASA Internship Program</CardTitle>
                      <Badge className="bg-[#003366] text-[#F5A623]">Hybrid</Badge>
                    </div>
                    <CardDescription className="text-[#003366]">Data Science Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#003366] pt-2">
                    <div className="space-y-4">
                      <p>
                        Work with NASA scientists and engineers on projects involving machine learning, 
                        data visualization, and analysis of space mission data.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-[#003366]">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>NASA</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <MapPinIcon className="mr-1 h-4 w-4" />
                          <span>Goddard Space Flight Center</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Fall 2024</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
                          onClick={() => window.open('https://intern.nasa.gov/', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-[#F5A623]">JP Morgan Chase Technology Program</CardTitle>
                      <Badge className="bg-[#003366] text-[#F5A623]">On-site</Badge>
                    </div>
                    <CardDescription className="text-[#003366]">Software Development Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#003366] pt-2">
                    <div className="space-y-4">
                      <p>
                        Join the global technology team to develop innovative solutions for financial 
                        services using cutting-edge technologies.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-[#003366]">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>JP Morgan Chase</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <MapPinIcon className="mr-1 h-4 w-4" />
                          <span>New York, NY</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Summer 2025</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]" 
                          onClick={() => window.open('https://careers.jpmorgan.com/us/en/students/programs', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-[#F5A623]">NSA CACI Program</CardTitle>
                      <Badge className="bg-[#003366] text-[#F5A623]">On-site</Badge>
                    </div>
                    <CardDescription className="text-[#003366]">Cybersecurity Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-[#003366] pt-2">
                    <div className="space-y-4">
                      <p>
                        Work on national security projects focusing on cybersecurity, 
                        cryptography, and secure systems development.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-[#003366]">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>National Security Agency</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <MapPinIcon className="mr-1 h-4 w-4" />
                          <span>Fort Meade, MD</span>
                        </div>
                        <div className="flex items-center text-[#003366]">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Spring 2025</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button 
                          className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
                          onClick={() => window.open('https://www.intelligencecareers.gov/nsa/nsastudents.html', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="upcoming">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Upcoming Application Deadlines</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Don't miss these important dates for summer 2025 internships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">Meta University Program</span>
                        <Badge className="bg-red-900 text-red-100">2 days left</Badge>
                      </div>
                      <p className="text-[#003366] mb-2">Engineering internship for underrepresented students in tech</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#003366]">Deadline: April 6, 2025</span>
                        <Button 
                          variant="link" 
                          className="text-[#F5A623] p-0 h-auto"
                          onClick={() => window.open('https://www.metacareers.com/jobs/university-program/', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </li>
                    
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">Microsoft Explore</span>
                        <Badge className="bg-yellow-900 text-yellow-100">1 week left</Badge>
                      </div>
                      <p className="text-[#003366] mb-2">12-week summer internship for first and second-year students</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#003366]">Deadline: April 11, 2025</span>
                        <Button 
                          variant="link" 
                          className="text-[#F5A623] p-0 h-auto"
                          onClick={() => window.open('https://careers.microsoft.com/students/us/en/explore-program', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </li>
                    
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">Amazon Future Engineer</span>
                        <Badge className="bg-green-900 text-green-100">2 weeks left</Badge>
                      </div>
                      <p className="text-[#003366] mb-2">Software development internship with focus on AWS</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#003366]">Deadline: April 18, 2025</span>
                        <Button 
                          variant="link" 
                          className="text-[#F5A623] p-0 h-auto"
                          onClick={() => window.open('https://www.amazonfutureengineer.com/scholarships', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </li>
                    
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">IBM Accelerate</span>
                        <Badge className="bg-blue-900 text-blue-100">1 month left</Badge>
                      </div>
                      <p className="text-[#003366] mb-2">Software engineering internship focused on AI and quantum computing</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#003366]">Deadline: May 5, 2025</span>
                        <Button 
                          variant="link" 
                          className="text-[#F5A623] p-0 h-auto"
                          onClick={() => window.open('https://www.ibm.com/us-en/employment/entrylevel/', '_blank')}
                        >
                          Apply Now
                        </Button>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="past">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Success Stories</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Morgan State Computer Science students who completed prestigious internships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-xl font-bold">
                          JD
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-1">James Davis</h3>
                          <p className="text-sm text-[#003366] mb-3">Class of 2023</p>
                          <p className="text-[#003366] mb-2">
                            Interned at Google as a Software Engineering Intern during Summer 2022,
                            working on Google Cloud Platform services.
                          </p>
                          <Badge className="bg-[#003366] text-[#F5A623]">Google</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-xl font-bold">
                          KW
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-1">Kimberly Williams</h3>
                          <p className="text-sm text-[#003366] mb-3">Class of 2024</p>
                          <p className="text-[#003366] mb-2">
                            Completed a Data Science internship at NASA Goddard Space Flight Center,
                            analyzing satellite data for climate research.
                          </p>
                          <Badge className="bg-[#003366] text-[#F5A623]">NASA</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-xl font-bold">
                          MJ
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-1">Marcus Johnson</h3>
                          <p className="text-sm text-[#003366] mb-3">Class of 2023</p>
                          <p className="text-[#003366] mb-2">
                            Interned at Microsoft as part of the Azure Cloud team, focusing on
                            infrastructure security and reliability.
                          </p>
                          <Badge className="bg-[#003366] text-[#F5A623]">Microsoft</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700 p-5 rounded-lg">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-xl font-bold">
                          TJ
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[#F5A623] mb-1">Tiffany Jones</h3>
                          <p className="text-sm text-[#003366] mb-3">Class of 2022</p>
                          <p className="text-[#003366] mb-2">
                            Completed a cybersecurity internship at NSA, working on
                            encryption algorithms and security protocols.
                          </p>
                          <Badge className="bg-[#003366] text-[#F5A623]">NSA</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card className="bg-neutral-800 border-neutral-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-[#F5A623]">Job Search Tips</CardTitle>
                  <CardDescription className="text-[#003366]">
                    Strategies for finding and securing internships
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-[#003366]">
                  <p className="mb-4">
                    The Computer Science department offers resume reviews, interview preparation, and application 
                    assistance to help you secure internships at top tech companies.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-neutral-700 p-4 rounded-lg">
                      <h3 className="text-[#F5A623] font-medium mb-2">Application Timeline</h3>
                      <ul className="space-y-2 text-[#003366]">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span><strong>Summer Internships:</strong> Apply August-February (big tech companies recruit early!)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span><strong>Fall Internships:</strong> Apply April-July</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span><strong>Spring Internships:</strong> Apply August-November</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-neutral-700 p-4 rounded-lg">
                      <h3 className="text-[#F5A623] font-medium mb-2">Application Strategy</h3>
                      <ul className="space-y-2 text-[#003366]">
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Apply to at least 20-30 positions (tech hiring is competitive)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Mix of large companies, startups, and government opportunities</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>Follow up within 1-2 weeks after applying</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col md:flex-row gap-4">
                    <Button className="flex-1 bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/career-center/students/appointment', '_blank')}>
                      Schedule Resume Review
                    </Button>
                    <Button className="flex-1 bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('/career-resources', '_self')}>
                      Career Resources Center
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold text-[#F5A623] mb-4">Need Help With Your Internship Application?</h2>
            <p className="text-[#003366] mb-6 max-w-2xl mx-auto">
              The Computer Science department offers resume reviews, interview preparation, and application 
              assistance for students applying to internships. Contact your academic advisor for more information.
            </p>
            <Button 
              className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
              onClick={() => window.open('https://www.morgan.edu/school-of-computer-mathematical-and-natural-sciences/departments/computer-science/advising', '_blank')}
            >
              Schedule Advising Appointment
            </Button>
          </div>
        </div>
      </main>
    </AppContainer>
  );
}