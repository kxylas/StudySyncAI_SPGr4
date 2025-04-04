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
              <CardDescription className="text-gray-400">
                The Computer Science department has collaborations with many organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">
                The department has collaborations with Google, Facebook, JP Morgan Chase, NASA, NSA, 
                Lockheed Martin, and many other public and private organizations to provide internships 
                and other opportunities for students.
              </p>
              <p className="mb-4">
                For the most up-to-date information, please check out CS Twitter: <a href="https://twitter.com/Morgan_CompSci" target="_blank" rel="noopener noreferrer" className="text-[#F5A623] hover:underline">@Morgan_CompSci</a>
              </p>
              <div className="mt-6">
                <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
                  <ExternalLinkIcon className="mr-2 h-4 w-4" />
                  Visit Internship Opportunities Page
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 bg-neutral-700">
              <TabsTrigger value="current" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Current Opportunities
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Upcoming Deadlines
              </TabsTrigger>
              <TabsTrigger value="past" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Past Students
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
                    <CardDescription className="text-gray-400">Software Engineering Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300 pt-2">
                    <div className="space-y-4">
                      <p>
                        Build open source projects as part of this global program focused on 
                        bringing student developers into open source development.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>Google</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <ClockIcon className="mr-1 h-4 w-4" />
                          <span>Full-time</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Summer 2025</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]">Apply Now</Button>
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
                    <CardDescription className="text-gray-400">Data Science Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300 pt-2">
                    <div className="space-y-4">
                      <p>
                        Work with NASA scientists and engineers on projects involving machine learning, 
                        data visualization, and analysis of space mission data.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>NASA</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPinIcon className="mr-1 h-4 w-4" />
                          <span>Goddard Space Flight Center</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Fall 2024</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]">Apply Now</Button>
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
                    <CardDescription className="text-gray-400">Software Development Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300 pt-2">
                    <div className="space-y-4">
                      <p>
                        Join the global technology team to develop innovative solutions for financial 
                        services using cutting-edge technologies.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>JP Morgan Chase</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPinIcon className="mr-1 h-4 w-4" />
                          <span>New York, NY</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Summer 2025</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]">Apply Now</Button>
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
                    <CardDescription className="text-gray-400">Cybersecurity Intern</CardDescription>
                  </CardHeader>
                  <CardContent className="text-gray-300 pt-2">
                    <div className="space-y-4">
                      <p>
                        Work on national security projects focusing on cybersecurity, 
                        cryptography, and secure systems development.
                      </p>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <div className="flex items-center text-gray-400">
                          <BuildingIcon className="mr-1 h-4 w-4" />
                          <span>National Security Agency</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <MapPinIcon className="mr-1 h-4 w-4" />
                          <span>Fort Meade, MD</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <CalendarIcon className="mr-1 h-4 w-4" />
                          <span>Spring 2025</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]">Apply Now</Button>
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
                  <CardDescription className="text-gray-400">
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
                      <p className="text-gray-300 mb-2">Engineering internship for underrepresented students in tech</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Deadline: April 6, 2025</span>
                        <Button variant="link" className="text-[#F5A623] p-0 h-auto">Apply Now</Button>
                      </div>
                    </li>
                    
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">Microsoft Explore</span>
                        <Badge className="bg-yellow-900 text-yellow-100">1 week left</Badge>
                      </div>
                      <p className="text-gray-300 mb-2">12-week summer internship for first and second-year students</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Deadline: April 11, 2025</span>
                        <Button variant="link" className="text-[#F5A623] p-0 h-auto">Apply Now</Button>
                      </div>
                    </li>
                    
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">Amazon Future Engineer</span>
                        <Badge className="bg-green-900 text-green-100">2 weeks left</Badge>
                      </div>
                      <p className="text-gray-300 mb-2">Software development internship with focus on AWS</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Deadline: April 18, 2025</span>
                        <Button variant="link" className="text-[#F5A623] p-0 h-auto">Apply Now</Button>
                      </div>
                    </li>
                    
                    <li className="bg-neutral-700 p-4 rounded-lg">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-[#F5A623]">IBM Accelerate</span>
                        <Badge className="bg-blue-900 text-blue-100">1 month left</Badge>
                      </div>
                      <p className="text-gray-300 mb-2">Software engineering internship focused on AI and quantum computing</p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Deadline: May 5, 2025</span>
                        <Button variant="link" className="text-[#F5A623] p-0 h-auto">Apply Now</Button>
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
                  <CardDescription className="text-gray-400">
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
                          <p className="text-sm text-gray-400 mb-3">Class of 2023</p>
                          <p className="text-gray-300 mb-2">
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
                          <p className="text-sm text-gray-400 mb-3">Class of 2024</p>
                          <p className="text-gray-300 mb-2">
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
                          <p className="text-sm text-gray-400 mb-3">Class of 2023</p>
                          <p className="text-gray-300 mb-2">
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
                          <p className="text-sm text-gray-400 mb-3">Class of 2022</p>
                          <p className="text-gray-300 mb-2">
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
          </Tabs>
          
          <div className="mt-8 text-center">
            <h2 className="text-xl font-bold text-[#F5A623] mb-4">Need Help With Your Internship Application?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              The Computer Science department offers resume reviews, interview preparation, and application 
              assistance for students applying to internships. Contact your academic advisor for more information.
            </p>
            <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
              Schedule Advising Appointment
            </Button>
          </div>
        </div>
      </main>
    </AppContainer>
  );
}