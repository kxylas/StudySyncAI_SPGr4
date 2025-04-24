import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, PlusCircle, Trash2 } from "lucide-react";
import { useChat } from '@/contexts/ChatContext';
// Calendar and Popover imports removed as we're using native date inputs
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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

Please create a day-by-day schedule that breaks down study sessions by subject, balances time between subjects based on difficulty and deadline proximity, and includes short breaks between sessions. I'm looking for a format that allows me to clearly see what to study on which day.`;

    // Send the message to the AI
    sendMessage(prompt);
    setOpen(false);

    // Reset form
    setCourses([{ id: crypto.randomUUID(), courseName: '', deadline: undefined, topics: '' }]);
    setAvailableTime('');
  };

  return (
    <div className="inline-block">
      {/* Schedule button trigger - different styling in different contexts */}
      <div 
        onClick={() => setOpen(true)}
        className="cursor-pointer w-full text-left"
      >
        <span className="whitespace-nowrap">Generate Study Schedule</span>
      </div>
      
      {/* Dialog container */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-3 sm:p-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-[#F5A623]">Create Study Schedule</DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              Enter your courses, deadlines, and available study time to generate a personalized study schedule.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-medium">Courses and Deadlines</h3>
              {courses.map((course, index) => (
                <Card key={course.id} className="p-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`course-${index}`} className="text-xs sm:text-sm">Course Name</Label>
                          <Input 
                            id={`course-${index}`}
                            value={course.courseName} 
                            onChange={(e) => updateCourse(course.id, 'courseName', e.target.value)}
                            placeholder="e.g., Data Structures"
                            className="h-8 sm:h-10 text-xs sm:text-sm"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor={`deadline-${index}`} className="text-xs sm:text-sm">Deadline</Label>
                          <Input
                            type="date"
                            value={course.deadline ? format(course.deadline, "yyyy-MM-dd") : ""}
                            onChange={(e) => {
                              const date = e.target.value ? new Date(e.target.value) : undefined;
                              updateCourse(course.id, 'deadline', date);
                            }}
                            className="h-8 sm:h-10 text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor={`topics-${index}`} className="text-xs sm:text-sm">Challenging Topics (Optional)</Label>
                        <Input 
                          id={`topics-${index}`}
                          value={course.topics} 
                          onChange={(e) => updateCourse(course.id, 'topics', e.target.value)}
                          placeholder="e.g., Trees, Sorting Algorithms"
                          className="h-8 sm:h-10 text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeCourse(course.id)}
                      className="mt-2 p-1 h-7 w-7"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
              
              <Button variant="outline" size="sm" onClick={addCourse} className="mt-2 h-8 sm:h-9 text-xs sm:text-sm">
                <PlusCircle className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                Add Course
              </Button>
            </div>

            <div className="space-y-1 sm:space-y-2">
              <Label htmlFor="available-time" className="text-xs sm:text-sm">Available Study Time</Label>
              <Textarea 
                id="available-time" 
                value={availableTime}
                onChange={(e) => setAvailableTime(e.target.value)}
                placeholder="e.g., 3 hours on weekdays after 6pm, 6 hours on weekends"
                className="min-h-[60px] sm:min-h-[80px] text-xs sm:text-sm"
              />
            </div>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setOpen(false)} className="text-xs sm:text-sm h-8 sm:h-10 w-full sm:w-auto">Cancel</Button>
            <Button onClick={handleSubmit} className="text-xs sm:text-sm h-8 sm:h-10 w-full sm:w-auto">
              <Clock className="mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Generate Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
