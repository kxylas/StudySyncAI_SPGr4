import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UsersIcon, 
  BookOpenIcon, 
  PlusIcon,
  SearchIcon
} from 'lucide-react';

export default function StudyGroups() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample study groups data
  const studyGroups = [
    {
      id: 1,
      title: 'Data Structures Study Group',
      course: 'COSC 220',
      description: 'Weekly meetup to practice data structures problems and algorithms.',
      datetime: 'Tuesdays, 5:00 PM - 7:00 PM',
      location: 'McMechen Hall, Room 212',
      members: 8,
      maxMembers: 12,
      topics: ['Arrays', 'Linked Lists', 'Trees', 'Graphs']
    },
    {
      id: 2,
      title: 'Operating Systems Concepts',
      course: 'COSC 354',
      description: 'Studying process management, memory management, and file systems concepts.',
      datetime: 'Thursdays, 4:00 PM - 6:00 PM',
      location: 'Online (Zoom)',
      members: 5,
      maxMembers: 10,
      topics: ['Process Scheduling', 'Memory Management', 'File Systems']
    },
    {
      id: 3,
      title: 'Database Design Group',
      course: 'COSC 459',
      description: 'Working through database design principles and SQL queries.',
      datetime: 'Mondays, 6:00 PM - 8:00 PM',
      location: 'Library, Study Room 3',
      members: 6,
      maxMembers: 8,
      topics: ['ERD Design', 'SQL Optimization', 'Normalization']
    },
    {
      id: 4,
      title: 'AI & Machine Learning',
      course: 'COSC 470/472',
      description: 'Exploring machine learning algorithms and AI concepts.',
      datetime: 'Fridays, 3:00 PM - 5:00 PM',
      location: 'McMechen Hall, Room 305',
      members: 10,
      maxMembers: 15,
      topics: ['Neural Networks', 'Decision Trees', 'NLP']
    }
  ];

  const myGroups = [
    studyGroups[0],
    studyGroups[3]
  ];

  const filteredGroups = searchQuery 
    ? studyGroups.filter(group => 
        group.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : studyGroups;

  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-3xl font-bold text-[#F5A623]">Study Groups</h1>
            <Button 
              className="bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]"
              onClick={() => navigate('/create-study-group')}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Study Group
            </Button>
          </div>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Find Study Groups</CardTitle>
              <CardDescription className="text-[#003366]">
                Search for study groups by course, topic, or keyword
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#003366]" />
                <Input
                  placeholder="Search study groups..."
                  className="pl-10 bg-neutral-700 border-neutral-600 text-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 mb-4 bg-neutral-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                All Groups
              </TabsTrigger>
              <TabsTrigger value="my-groups" className="data-[state=active]:bg-[#003366] data-[state=active]:text-[#F5A623]">
                My Groups
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {filteredGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredGroups.map(group => (
                    <Card key={group.id} className="bg-neutral-800 border-neutral-700 shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-[#F5A623]">{group.title}</CardTitle>
                          <Badge className="bg-[#003366] text-[#F5A623]">{group.course}</Badge>
                        </div>
                        <CardDescription className="text-[#003366]">
                          {group.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-[#003366] pt-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#003366]" />
                            <span>{group.datetime}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="mr-2 h-4 w-4 text-[#003366]" />
                            <span>{group.location}</span>
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="mr-2 h-4 w-4 text-[#003366]" />
                            <span>{group.members} / {group.maxMembers} members</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-[#003366] mb-2">Topics:</h4>
                          <div className="flex flex-wrap gap-1">
                            {group.topics.map(topic => (
                              <Badge key={topic} variant="outline" className="text-[#F5A623] border-[#F5A623]">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2">
                        <Button className="w-full bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
                          Join Group
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <BookOpenIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#003366] mb-2">No study groups found</h3>
                  <p className="text-[#003366] mb-6">No study groups match your search criteria.</p>
                  <Button 
                    className="bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="my-groups">
              {myGroups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myGroups.map(group => (
                    <Card key={group.id} className="bg-neutral-800 border-neutral-700 shadow-md">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-[#F5A623]">{group.title}</CardTitle>
                          <Badge className="bg-[#003366] text-[#F5A623]">{group.course}</Badge>
                        </div>
                        <CardDescription className="text-[#003366]">
                          {group.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-[#003366] pt-2">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4 text-[#003366]" />
                            <span>{group.datetime}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPinIcon className="mr-2 h-4 w-4 text-[#003366]" />
                            <span>{group.location}</span>
                          </div>
                          <div className="flex items-center">
                            <UsersIcon className="mr-2 h-4 w-4 text-[#003366]" />
                            <span>{group.members} / {group.maxMembers} members</span>
                          </div>
                        </div>
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-[#003366] mb-2">Topics:</h4>
                          <div className="flex flex-wrap gap-1">
                            {group.topics.map(topic => (
                              <Badge key={topic} variant="outline" className="text-[#F5A623] border-[#F5A623]">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 flex gap-2">
                        <Button className="flex-1 bg-neutral-700 text-gray-200 hover:bg-neutral-600">
                          Leave Group
                        </Button>
                        <Button className="flex-1 bg-[#003366] text-[#F5A623] hover:bg-[#004488]">
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <UsersIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-[#003366] mb-2">No study groups joined</h3>
                  <p className="text-[#003366] mb-6">You haven't joined any study groups yet.</p>
                  <Button 
                    className="bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]"
                    onClick={() => navigate('/create-study-group')}
                  >
                    <PlusIcon className="mr-2 h-4 w-4" />
                    Create Study Group
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 bg-neutral-800 border border-neutral-700 rounded-lg p-6 text-center">
            <h2 className="text-xl font-bold text-[#F5A623] mb-3">Can't find what you're looking for?</h2>
            <p className="text-[#003366] mb-6 max-w-2xl mx-auto">
              Start your own study group and invite classmates to join. You can schedule meetings,
              share resources, and collaborate on assignments.
            </p>
            <Button 
              className="bg-[#F5A623] text-[#003366] hover:bg-[#f6b951]"
              onClick={() => navigate('/create-study-group')}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Create a New Study Group
            </Button>
          </div>
        </div>
      </main>
    </AppContainer>
  );
}