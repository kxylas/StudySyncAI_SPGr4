import { useState } from 'react';
import { User, Mail, Phone, Award, Clock, Calendar, BookOpen, Building, Send, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import AppContainer from '@/components/AppContainer';

export default function Profile() {
  // State for edit profile dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // State for contact advisor dialog
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // Profile data state
  const [userProfile, setUserProfile] = useState({
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
  });

  // Form data for editing
  const [formData, setFormData] = useState({
    name: userProfile.name,
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber,
    advisor: userProfile.advisor,
    office: userProfile.office,
    officeHours: userProfile.officeHours
  });

  // Handle dialog open
  const handleOpenDialog = () => {
    setFormData({
      name: userProfile.name,
      email: userProfile.email,
      phoneNumber: userProfile.phoneNumber,
      advisor: userProfile.advisor,
      office: userProfile.office,
      officeHours: userProfile.officeHours
    });
    setIsEditDialogOpen(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setUserProfile(prev => ({
      ...prev,
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      advisor: formData.advisor,
      office: formData.office,
      officeHours: formData.officeHours
    }));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
      variant: "default",
    });
  };

  // Handle sending a message to advisor
  const handleSendMessage = async () => {
    if (!contactMessage.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message to send to your advisor.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    try {
      // Simulate API call to send message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Clear form and close dialog
      setContactMessage('');
      setIsContactDialogOpen(false);
      
      // Show success message
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${userProfile.advisor}.`,
        variant: "default",
      });
    } catch (error) {
      // Show error message
      toast({
        title: "Failed to Send Message",
        description: "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
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
                  <div className="flex items-center justify-between text-[#003366]">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-5 w-5 text-[#F5A623]" />
                      <span>Advisor: {userProfile.advisor}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="ml-2 text-[#F5A623] hover:bg-[#003366]/10"
                      onClick={() => setIsContactDialogOpen(true)}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
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
                <Button 
                  className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
                  onClick={handleOpenDialog}
                >
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
      
      {/* Edit Profile Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-neutral-800 border-neutral-700 text-white max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-[#F5A623] text-xl">Edit Profile</DialogTitle>
            <DialogDescription className="text-[#003366]">
              Update your personal information below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-[#F5A623]">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#F5A623]">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber" className="text-[#F5A623]">Phone Number</Label>
              <Input
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="advisor" className="text-[#F5A623]">Advisor</Label>
              <Input
                id="advisor"
                value={formData.advisor}
                onChange={handleInputChange}
                className="bg-neutral-700 border-neutral-600 text-white"
                disabled
              />
              <p className="text-xs text-neutral-400">Contact department to change advisor</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="office" className="text-[#F5A623]">Office</Label>
              <Input
                id="office"
                value={formData.office}
                onChange={handleInputChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="officeHours" className="text-[#F5A623]">Office Hours</Label>
              <Input
                id="officeHours"
                value={formData.officeHours}
                onChange={handleInputChange}
                className="bg-neutral-700 border-neutral-600 text-white"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditDialogOpen(false)}
              className="border-[#F5A623] text-[#F5A623] hover:bg-neutral-700"
            >
              Cancel
            </Button>
            <Button 
              className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
              onClick={handleSaveChanges}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Contact Advisor Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent className="bg-neutral-800 border-neutral-700 text-[#F5A623] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#F5A623]">Contact Your Advisor</DialogTitle>
            <DialogDescription className="text-[#003366]">
              Send a message directly to {userProfile.advisor}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="message" className="text-[#F5A623]">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-[120px] bg-neutral-700 border-neutral-600 text-[#003366]"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
              <p className="text-sm text-[#003366]">
                Your advisor typically responds within 24-48 hours during office hours ({userProfile.officeHours})
              </p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <div className="flex items-center text-sm text-[#003366]">
              <Mail className="mr-2 h-4 w-4 text-[#F5A623]" />
              <span>Copy will be sent to your email</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsContactDialogOpen(false)}
                className="border-[#F5A623] text-[#F5A623] hover:bg-neutral-700"
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#003366] text-[#F5A623] hover:bg-[#004488]"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#F5A623]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppContainer>
  );
}