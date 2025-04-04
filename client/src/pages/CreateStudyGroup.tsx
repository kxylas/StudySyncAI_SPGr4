import { useState } from 'react';
import { useLocation } from 'wouter';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import AppContainer from '@/components/AppContainer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeftIcon } from 'lucide-react';

// Form schema
const studyGroupSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters long",
  }).max(100, {
    message: "Title must be less than 100 characters",
  }),
  course: z.string().min(1, {
    message: "Please select a course",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters long",
  }).max(500, {
    message: "Description must be less than 500 characters",
  }),
  day: z.string().min(1, {
    message: "Please select a day",
  }),
  startTime: z.string().min(1, {
    message: "Please select a start time",
  }),
  endTime: z.string().min(1, {
    message: "Please select an end time",
  }),
  location: z.string().min(3, {
    message: "Location must be at least 3 characters long",
  }),
  maxMembers: z.string().refine((val) => {
    const num = parseInt(val);
    return !isNaN(num) && num >= 2 && num <= 50;
  }, {
    message: "Maximum members must be between 2 and 50",
  }),
  topics: z.string().min(3, {
    message: "Please enter at least one topic",
  }),
});

export default function CreateStudyGroup() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Sample courses for the dropdown
  const courses = [
    { id: "COSC111", name: "COSC 111 - Introduction to Computer Science I" },
    { id: "COSC112", name: "COSC 112 - Introduction to Computer Science II" },
    { id: "COSC220", name: "COSC 220 - Data Structures and Algorithms" },
    { id: "COSC241", name: "COSC 241 - Computer Systems and Digital Logic" },
    { id: "COSC281", name: "COSC 281 - Discrete Structure" },
    { id: "COSC349", name: "COSC 349 - Computer Networks" },
    { id: "COSC351", name: "COSC 351 - Cybersecurity" },
    { id: "COSC352", name: "COSC 352 - Organization of Programming Languages" },
    { id: "COSC354", name: "COSC 354 - Operating Systems" },
    { id: "COSC458", name: "COSC 458 - Software Engineering" },
    { id: "COSC459", name: "COSC 459 - Database Design" },
    { id: "COSC470", name: "COSC 470 - Artificial Intelligence" },
  ];
  
  // Day options
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Form 
  const form = useForm<z.infer<typeof studyGroupSchema>>({
    resolver: zodResolver(studyGroupSchema),
    defaultValues: {
      title: "",
      course: "",
      description: "",
      day: "",
      startTime: "",
      endTime: "",
      location: "",
      maxMembers: "10",
      topics: "",
    },
  });

  function onSubmit(values: z.infer<typeof studyGroupSchema>) {
    // Show confirmation dialog
    setShowConfirmDialog(true);
  }

  function handleConfirm() {
    const values = form.getValues();
    
    // Here you would normally save to the backend
    console.log("Creating study group:", values);
    
    // Show success toast
    toast({
      title: "Study Group Created",
      description: "Your study group has been successfully created.",
    });
    
    // Navigate back to study groups page
    navigate('/study-groups');
  }

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              className="h-8 w-8 border-neutral-700 bg-neutral-800 text-[#F5A623]"
              onClick={() => navigate('/study-groups')}
            >
              <ArrowLeftIcon className="h-4 w-4" />
            </Button>
            <h1 className="text-3xl font-bold text-[#F5A623]">Create Study Group</h1>
          </div>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Study Group Details</CardTitle>
              <CardDescription className="text-gray-400">
                Fill out the form below to create a new study group
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Data Structures Study Group" 
                            className="bg-neutral-700 border-neutral-600 text-gray-200"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Give your study group a clear, descriptive title.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Course</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-neutral-700 border-neutral-600 text-gray-200">
                              <SelectValue placeholder="Select a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-neutral-700 border-neutral-600 text-gray-200">
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.id}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription className="text-gray-500">
                          Select the course this study group is for.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe what your study group will focus on..." 
                            className="bg-neutral-700 border-neutral-600 text-gray-200 min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Explain what topics you'll cover and what students can expect.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="day"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Day</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-neutral-700 border-neutral-600 text-gray-200">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-neutral-700 border-neutral-600 text-gray-200">
                              {days.map((day) => (
                                <SelectItem key={day} value={day}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Start Time</FormLabel>
                          <FormControl>
                            <Input 
                              type="time" 
                              className="bg-neutral-700 border-neutral-600 text-gray-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">End Time</FormLabel>
                          <FormControl>
                            <Input 
                              type="time" 
                              className="bg-neutral-700 border-neutral-600 text-gray-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300">Location</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., McMechen Hall, Room 212 or Zoom link" 
                            className="bg-neutral-700 border-neutral-600 text-gray-200"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription className="text-gray-500">
                          Where will the study group meet? Include room number or online meeting link.
                        </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="maxMembers"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Maximum Members</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="2"
                              max="50"
                              className="bg-neutral-700 border-neutral-600 text-gray-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            Limit between 2 and 50 members.
                          </FormDescription>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="topics"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-300">Topics</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Linked Lists, Trees, Algorithms" 
                              className="bg-neutral-700 border-neutral-600 text-gray-200"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-gray-500">
                            Comma-separated list of specific topics.
                          </FormDescription>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      className="w-full bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]"
                    >
                      Create Study Group
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-neutral-800 border-neutral-700 text-gray-200">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#F5A623]">Confirm Study Group Creation</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              You're about to create a new study group. This will be visible to all students.
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-700 text-gray-300 hover:bg-neutral-600">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]"
              onClick={handleConfirm}
            >
              Create Group
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppContainer>
  );
}