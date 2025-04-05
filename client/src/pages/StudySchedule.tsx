import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, PlusCircle, Trash2 } from "lucide-react";
import { useChat } from '@/contexts/ChatContext';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/custom-calendar";

interface CourseDeadline {
  id: string;
  courseName: string;
  deadline: Date | undefined;
  topics: string;
}

export default function StudySchedule() {
  const [courses, setCourses] = useState<CourseDeadline[]>([
    { id: crypto.randomUUID(), courseName: '', deadline: undefined, topics: '' }
  ]);
  const [availableTime, setAvailableTime] = useState('');
  const { toast } = useToast();
  const { sendMessage } = useChat();

  const addCourse = () => {
    setCourses([...courses, { id: crypto.randomUUID(), courseName: '', deadline: undefined, topics: '' }]);
  };

  const removeCourse = (id: string) => {
    if (courses.length === 1) {
      toast({
        title: "Cannot remove",
        description: "You need at least one course",
        variant: "destructive"
      });
      return;
    }
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseDeadline, value: any) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  const handleSubmit = () => {
    // Validate inputs
    const emptyFields = courses.some(course => !course.courseName || !course.deadline);
    if (emptyFields || !availableTime) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Format the message for the AI
    const formattedDeadlines = courses.map(course => {
      const deadline = course.deadline ? format(course.deadline, 'MMMM d, yyyy') : '';
      const topics = course.topics ? ` (specific topics: ${course.topics})` : '';
      return `- ${course.courseName}: due on ${deadline}${topics}`;
    }).join('\n');

    const prompt = `Please create a study schedule for me based on the following information:

Courses and deadlines:
${formattedDeadlines}

My available study time: ${availableTime}

Please create a day-by-day schedule that breaks down study sessions by subject, balances time between subjects based on difficulty and deadline proximity, and includes short breaks between sessions.`;

    // Send the message to the AI
    sendMessage(prompt);

    // Reset form after submission
    setCourses([{ id: crypto.randomUUID(), courseName: '', deadline: undefined, topics: '' }]);
    setAvailableTime('');
    
    toast({
      title: "Schedule request sent",
      description: "Your study schedule will appear in the chat window",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[#F5A623]">Study Schedule Generator</h1>
          <p className="text-muted-foreground mt-2">
            Create a personalized study plan based on your deadlines and available time
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Enter Your Course Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {courses.map((course, index) => (
                <Card key={course.id} className="p-4 border-[#003366]">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`course-${index}`}>Course Name</Label>
                          <Input 
                            id={`course-${index}`}
                            value={course.courseName} 
                            onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                            placeholder="e.g., Data Structures"
                            className="mt-1"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`deadline-${index}`}>Deadline</Label>
                          <div className="mt-1">
                            <Popover>
                              <PopoverTrigger asChild>
                                <div 
                                  className={cn(
                                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer",
                                    !course.deadline && "text-muted-foreground"
                                  )}
                                >
                                  <span className="flex items-center">
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {course.deadline ? format(course.deadline, "PPP") : <span>Pick a date</span>}
                                  </span>
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <div className="calendar-wrapper">
                                  <div className="flex justify-between px-4 py-2">
                                    <div className="text-sm font-medium">Select deadline</div>
                                    <div 
                                      className="text-sm text-muted-foreground cursor-pointer"
                                      onClick={() => updateCourse(course.id, 'deadline', undefined)}
                                    >
                                      Clear
                                    </div>
                                  </div>
                                  <Calendar
                                    mode="single"
                                    selected={course.deadline}
                                    onSelect={(date) => updateCourse(course.id, 'deadline', date)}
                                    initialFocus
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`topics-${index}`}>Challenging Topics (Optional)</Label>
                        <Input 
                          id={`topics-${index}`}
                          value={course.topics} 
                          onChange={(e) => updateCourse(course.id, 'topics', e.target.value)}
                          placeholder="e.g., Trees, Sorting Algorithms"
                          className="mt-1"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCourse(course.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addCourse} 
                className="mt-2 border-[#003366] text-[#F5A623] hover:bg-[#003366]/10"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="available-time">Available Study Time</Label>
              <Textarea 
                id="available-time" 
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                placeholder="e.g., 3 hours on weekdays after 6pm, 6 hours on weekends"
                className="min-h-[100px]"
              />
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-[#F5A623] text-[#003366] hover:bg-[#F5A623]/90"
            >
              <Clock className="mr-2 h-4 w-4" />
              Generate Study Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}