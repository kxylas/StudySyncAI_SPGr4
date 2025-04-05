import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { MailIcon, PhoneIcon, MapPinIcon, CalendarIcon } from 'lucide-react';

export default function Advisors() {
  // Faculty data based on the Morgan State University website
  const facultyAdvisors = [
    {
      id: 1,
      name: "Dr. Shuangbao \"Paul\" Wang",
      title: "Professor and Chair",
      office: "McMechen Hall 507",
      phone: "(443) 885-4503",
      email: "shuangbao.wang@morgan.edu",
      areas: ["Department Leadership", "Security", "AI"],
      imageInitials: "PW"
    },
    {
      id: 2,
      name: "Dr. Md Rahman",
      title: "Professor, Associate Chair",
      office: "McMechen 629",
      phone: "(443) 885-1056",
      email: "Md.Rahman@morgan.edu",
      areas: ["Department Leadership", "Software Engineering"],
      imageInitials: "MR"
    },
    {
      id: 3,
      name: "Dr. Guobin Xu",
      title: "Director of Undergraduate Studies (BS/CS)",
      office: "McMechen Hall 517",
      phone: "(443) 885-3371",
      email: "guobin.xu@morgan.edu",
      areas: ["Undergraduate Studies", "Distributed Systems"],
      imageInitials: "GX"
    },
    {
      id: 4,
      name: "Dr. Vojislav Stojkovic",
      title: "Graduate Program Coordinator (MS/CS)",
      office: "McMechen Hall 529",
      phone: "(443) 885-3945",
      email: "vojislav.stojkovic@morgan.edu",
      areas: ["Graduate Studies", "Computer Architecture"],
      imageInitials: "VS"
    },
    {
      id: 5,
      name: "Dr. Duhwon Jung",
      title: "Associate Professor",
      office: "McMechen Hall 540",
      phone: "(443) 885-3971",
      email: "duhwon.jung@morgan.edu",
      areas: ["Database Systems", "Big Data"],
      imageInitials: "DJ"
    },
    {
      id: 6,
      name: "Dr. Mahmudur Rahman",
      title: "Associate Professor",
      office: "McMechen Hall 522",
      phone: "(443) 885-1719",
      email: "mahmudur.rahman@morgan.edu",
      areas: ["Visualization", "Data Mining"],
      imageInitials: "MR"
    },
    {
      id: 7,
      name: "Dr. Meikang Qiu",
      title: "Professor",
      office: "McMechen Hall 519",
      phone: "(443) 885-3968",
      email: "meikang.qiu@morgan.edu",
      areas: ["Artificial Intelligence", "Cloud Computing"],
      imageInitials: "MQ"
    },
    {
      id: 8,
      name: "Dr. Monir Sharker",
      title: "Assistant Professor",
      office: "McMechen Hall 518",
      phone: "(443) 885-3980",
      email: "md.sharker@morgan.edu",
      areas: ["Data Science", "Machine Learning"],
      imageInitials: "MS"
    },
    {
      id: 9,
      name: "Dr. Kofi Nyarko",
      title: "Associate Professor",
      office: "McMechen Hall 520",
      phone: "(443) 885-3979",
      email: "kofi.nyarko@morgan.edu",
      areas: ["Robotics", "Embedded Systems"],
      imageInitials: "KN"
    },
    {
      id: 10,
      name: "Dr. Yating Li",
      title: "Assistant Professor",
      office: "McMechen Hall 525",
      phone: "(443) 885-1791",
      email: "yating.li@morgan.edu",
      areas: ["Machine Learning", "Data Analytics"],
      imageInitials: "YL"
    },
    {
      id: 11,
      name: "Dr. Fereydoun Farahmand",
      title: "Associate Professor",
      office: "McMechen Hall 523",
      phone: "(443) 885-2390",
      email: "fereydoun.farahmand@morgan.edu",
      areas: ["Computer Networks", "Cybersecurity"],
      imageInitials: "FF"
    },
    {
      id: 12,
      name: "Dr. Sam Olatunbosum",
      title: "Senior Lecturer",
      office: "McMechen Hall 544",
      phone: "(443) 885-1678",
      email: "sam.olatunbosum@morgan.edu",
      areas: ["Computer Science Education", "Programming"],
      imageInitials: "SO"
    }
  ];

  const staffContacts = [
    {
      id: 1,
      name: "Wendy Smith",
      title: "Administrative Assistant",
      office: "McMechen Hall 507A",
      phone: "(443) 885-3962",
      email: "Wendy.Smith@morgan.edu",
      areas: ["Administrative Support", "Forms Processing"],
      imageInitials: "WS"
    },
    {
      id: 2,
      name: "Grace Steele",
      title: "Administrative Assistant",
      office: "McMechen 507",
      phone: "(443) 885-1053",
      email: "grace.steele@morgan.edu",
      areas: ["Administrative Support", "Student Services"],
      imageInitials: "GS"
    },
    {
      id: 3,
      name: "Dr. Donna Harris-Watson",
      title: "Program Coordinator",
      office: "McMechen Hall",
      phone: "(443) 885-3963",
      email: "donna.harriswatson@morgan.edu",
      areas: ["Program Coordination", "Student Records"],
      imageInitials: "DH"
    }
  ];

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#F5A623]">Academic Advisors</h1>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Finding Your Advisor</CardTitle>
              <CardDescription className="text-[#003366]">
                Academic advisors help you navigate your degree requirements and course selections
              </CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366]">
              <p className="mb-4">
                Your advisers should appear on your DegreeWork. You can also find your 
                specific advisor based on your major and classification (Freshman, Sophomore, 
                Junior, Senior) on the official Morgan State Computer Science website.
              </p>
              <div className="mt-4 flex flex-col md:flex-row gap-3">
                <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/computer-science/current-students/academic-advisers', '_blank')}>
                  Find Your Academic Advisor
                </Button>
                <Button variant="outline" className="border-[#003366] text-[#F5A623]" onClick={() => window.open('https://www.morgan.edu/computer-science/faculty-and-staff', '_blank')}>
                  View All Faculty & Staff
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-[#F5A623] mb-4">
              Schedule an Advising Appointment
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <p className="text-[#003366] mb-4">
                  Speak with a departmental academic advisor about your course selections, 
                  degree progress, or career planning. Select an advisor and choose an available time slot.
                </p>
                <div className="flex space-x-4 mb-6">
                  <Button className="bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]" onClick={() => window.open('https://www.morgan.edu/computer-science/current-students/schedule-an-appointment', '_blank')}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Schedule Now
                  </Button>
                  <Button variant="outline" className="border-[#F5A623] text-[#F5A623]" onClick={() => window.open('https://www.morgan.edu/computer-science/current-students/academic-advisers', '_blank')}>
                    View All Advisors
                  </Button>
                </div>
              </div>
              <div className="bg-neutral-700 p-4 rounded-lg">
                <h3 className="text-white font-medium mb-2">Next Available Slots</h3>
                <ul className="space-y-2 text-sm">
                  <li className="p-2 bg-neutral-600 rounded flex justify-between">
                    <span className="text-[#003366]">Apr 5, 10:00 AM</span>
                    <span className="text-[#F5A623]">Dr. Wang</span>
                  </li>
                  <li className="p-2 bg-neutral-600 rounded flex justify-between">
                    <span className="text-[#003366]">Apr 6, 1:30 PM</span>
                    <span className="text-[#F5A623]">Dr. Rahman</span>
                  </li>
                  <li className="p-2 bg-neutral-600 rounded flex justify-between">
                    <span className="text-[#003366]">Apr 7, 11:00 AM</span>
                    <span className="text-[#F5A623]">Dr. Xu</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="faculty" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-neutral-700">
              <TabsTrigger value="faculty" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Faculty Advisors
              </TabsTrigger>
              <TabsTrigger value="staff" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                Staff Contacts
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="faculty">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {facultyAdvisors.map(advisor => (
                  <Card key={advisor.id} className="bg-neutral-800 border-neutral-700 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-xl font-bold flex-shrink-0">
                          {advisor.imageInitials}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#F5A623]">{advisor.name}</h3>
                          <p className="text-[#003366] text-sm mb-3">{advisor.title}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-[#003366] text-sm">
                              <MapPinIcon className="mr-2 h-4 w-4 text-[#003366]" />
                              <span>{advisor.office}</span>
                            </div>
                            <div className="flex items-center text-[#003366] text-sm">
                              <PhoneIcon className="mr-2 h-4 w-4 text-[#003366]" />
                              <span>{advisor.phone}</span>
                            </div>
                            <div className="flex items-center text-[#003366] text-sm">
                              <MailIcon className="mr-2 h-4 w-4 text-[#003366]" />
                              <span>{advisor.email}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="border-[#F5A623] text-[#F5A623]" onClick={() => window.open('https://www.morgan.edu/computer-science/current-students/schedule-an-appointment', '_blank')}>
                              Schedule Meeting
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="staff">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {staffContacts.map(staff => (
                  <Card key={staff.id} className="bg-neutral-800 border-neutral-700 shadow-md">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-[#003366] flex items-center justify-center text-[#F5A623] text-xl font-bold flex-shrink-0">
                          {staff.imageInitials}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-[#F5A623]">{staff.name}</h3>
                          <p className="text-[#003366] text-sm mb-3">{staff.title}</p>
                          
                          <div className="space-y-2">
                            <div className="flex items-center text-[#003366] text-sm">
                              <MapPinIcon className="mr-2 h-4 w-4 text-[#003366]" />
                              <span>{staff.office}</span>
                            </div>
                            <div className="flex items-center text-[#003366] text-sm">
                              <PhoneIcon className="mr-2 h-4 w-4 text-[#003366]" />
                              <span>{staff.phone}</span>
                            </div>
                            <div className="flex items-center text-[#003366] text-sm">
                              <MailIcon className="mr-2 h-4 w-4 text-[#003366]" />
                              <span>{staff.email}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <Button variant="outline" size="sm" className="border-[#F5A623] text-[#F5A623]" onClick={() => window.open(`mailto:${staff.email}`)}>
                              Contact
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Need Help With Forms?</CardTitle>
              <CardDescription className="text-[#003366]">
                The Computer Science department uses online forms for various requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-[#003366] mb-4">
                The department no longer uses paper forms. The following forms can be filed directly online:
              </p>
              
              <ul className="space-y-3">
                <li className="bg-neutral-700 p-3 rounded-lg">
                  <h3 className="text-[#F5A623] font-medium mb-1">COSC Course Registration Override Request Form</h3>
                  <p className="text-[#003366] text-sm mb-2">Contact your adviser to submit request. Contact Ms. Wendy for updates.</p>
                </li>
                <li className="bg-neutral-700 p-3 rounded-lg">
                  <h3 className="text-[#F5A623] font-medium mb-1">COSC Internal Course Substitution Requests</h3>
                  <p className="text-[#003366] text-sm mb-2">Contact your adviser to submit the request for you. Contact Ms. Wendy for updates.</p>
                  <p className="text-[#003366] text-sm">Core courses cannot be substituted. Requests for approvals are not always granted.</p>
                </li>
                <li className="bg-neutral-700 p-3 rounded-lg">
                  <h3 className="text-[#F5A623] font-medium mb-1">COSC Adviser/Faculty Recommendation Request Form</h3>
                  <p className="text-[#003366] text-sm">Contact Ms. Wendy for assistance.</p>
                </li>
                <li className="bg-neutral-700 p-3 rounded-lg">
                  <h3 className="text-[#F5A623] font-medium mb-1">COSC Action Conference Request Form</h3>
                  <p className="text-[#003366] text-sm">Contact Ms. Wendy for assistance.</p>
                </li>
              </ul>
              
              <div className="mt-6">
                <h3 className="text-white font-medium mb-3">Registrar Forms</h3>
                <p className="text-[#003366] mb-3">
                  The following forms are available on the Registrar website:
                </p>
                <ul className="space-y-2 text-[#003366]">
                  <li>• Excess Credits (more than 18) Request Form</li>
                  <li>• Change Catalog Request Form</li>
                  <li>• Enrollment/Degree Verification Request Form</li>
                  <li>• Time Conflict Request Form</li>
                </ul>
                <div className="mt-4">
                  <Button className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]" onClick={() => window.open('https://www.morgan.edu/registrar', '_blank')}>
                    Visit Registrar Website
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppContainer>
  );
}