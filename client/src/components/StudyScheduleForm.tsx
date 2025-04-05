import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarIcon, Clock, PlusCircle, Trash2 } from "lucide-react";
import { useChat } from '@/contexts/ChatContext';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface CourseDeadline {
  id: string;
  courseName: string;
  deadline: Date | undefined;
  topics: string;
}

export default function StudyScheduleForm() {
  const [open, setOpen] = useState(false);
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
    setOpen(false);

    // Reset form
    setCourses([{ id: crypto.randomUUID(), courseName: '', deadline: undefined, topics: '' }]);
    setAvailableTime('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="px-3 py-1 text-xs rounded-full bg-[#003366] text-[#F5A623] hover:bg-[#002855] hover:text-[#F5A623] flex items-center gap-1"
        >
          <Calendar className="h-3 w-3" />
          Create Study Schedule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Study Schedule</DialogTitle>
          <DialogDescription>
            Enter your courses, deadlines, and available study time to generate a personalized study schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Courses and Deadlines</h3>
            {courses.map((course, index) => (
              <Card key={course.id} className="p-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor={`course-${index}`}>Course Name</Label>
                        <Input 
                          id={`course-${index}`}
                          value={course.courseName} 
                          onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                          placeholder="e.g., Data Structures"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`deadline-${index}`}>Deadline</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !course.deadline && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {course.deadline ? format(course.deadline, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={course.deadline}
                              onSelect={(date) => updateCourse(course.id, 'deadline', date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor={`topics-${index}`}>Challenging Topics (Optional)</Label>
                      <Input 
                        id={`topics-${index}`}
                        value={course.topics} 
                        onChange={(e) => updateCourse(course.id, 'topics', e.target.value)}
                        placeholder="e.g., Trees, Sorting Algorithms"
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeCourse(course.id)}
                    className="mt-auto"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
            
            <Button variant="outline" size="sm" onClick={addCourse} className="mt-2">
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
              className="min-h-[80px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            <Clock className="mr-2 h-4 w-4" />
            Generate Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}