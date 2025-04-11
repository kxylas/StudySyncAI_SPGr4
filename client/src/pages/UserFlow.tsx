import userFlowDiagramPath from "@assets/user_flow_diagram.svg";
import systemArchitecturePath from "@assets/system_architecture_diagram.svg";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, User, Server, Database } from "lucide-react";

export default function UserFlow() {
  return (
    <div className="flex flex-col min-h-screen bg-[#222222]">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#F5A623] mb-6">msuStudySyncAI Technical Documentation</h1>
        
        <Tabs defaultValue="user-flow" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#003366] mb-6">
            <TabsTrigger 
              value="user-flow" 
              className="data-[state=active]:bg-[#F5A623] data-[state=active]:text-[#003366] text-[#F5A623]"
            >
              User Flow
            </TabsTrigger>
            <TabsTrigger 
              value="architecture" 
              className="data-[state=active]:bg-[#F5A623] data-[state=active]:text-[#003366] text-[#F5A623]"
            >
              System Architecture
            </TabsTrigger>
          </TabsList>
          
          {/* User Flow Diagram Tab */}
          <TabsContent value="user-flow">
            <Card className="p-4 bg-[#003366] border-[#F5A623] shadow-lg">
              <div className="bg-white rounded-lg overflow-auto max-h-[70vh]">
                <img 
                  src={userFlowDiagramPath} 
                  alt="msuStudySyncAI User Flow Diagram" 
                  className="w-full"
                />
              </div>
            </Card>
            
            <div className="mt-8 space-y-4 text-[#F5A623]">
              <div>
                <h2 className="text-xl font-semibold mb-2">About This Diagram</h2>
                <p className="text-neutral-200">
                  This user flow diagram illustrates the navigation paths and interactions within the msuStudySyncAI platform. 
                  It shows how Morgan State University Computer Science students can navigate through the various features
                  of the application and how these features interconnect.
                </p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Main Features</h2>
                <ul className="list-disc pl-5 text-neutral-200 space-y-2">
                  <li>
                    <span className="font-medium text-[#F5A623]">AI-Powered Chat Interface</span> - Ask questions about the CS program, 
                    upload files, receive voice responses, and access chat history
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Program Overview</span> - Browse through curriculum details, 
                    graduation requirements, faculty/advisor information, and graduate program opportunities
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Study Schedule</span> - Create personalized study schedules, 
                    receive AI-generated study plans, track deadlines, and manage study groups
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Profile Settings</span> - Customize user profile, 
                    set application preferences, adjust text-to-speech settings, and change theme options
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-2">Special Interactions</h2>
                <ul className="list-disc pl-5 text-neutral-200 space-y-2">
                  <li>
                    <span className="font-medium text-[#F5A623]">Knowledge Extraction</span> - The system extracts knowledge from 
                    uploaded files to enhance its understanding and responses
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">AI-Generated Plans</span> - Based on deadlines and course information, 
                    the system generates optimal study schedules
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Cross-Section Integration</span> - Different sections of the application 
                    can communicate with each other (represented by dashed lines)
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          {/* System Architecture Tab */}
          <TabsContent value="architecture">
            <Card className="p-4 bg-[#003366] border-[#F5A623] shadow-lg">
              <div className="bg-white rounded-lg overflow-auto max-h-[70vh]">
                <img 
                  src={systemArchitecturePath} 
                  alt="msuStudySyncAI System Architecture" 
                  className="w-full"
                />
              </div>
            </Card>
            
            <div className="mt-8 space-y-4 text-[#F5A623]">
              <div>
                <h2 className="text-xl font-semibold mb-2">System Architecture Overview</h2>
                <p className="text-neutral-200">
                  The msuStudySyncAI platform is built on a modern three-tier architecture consisting of client, server, and data layers.
                  Each layer has specific responsibilities and communicates with adjacent layers to provide a cohesive, responsive user experience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <Card className="bg-[#003366] border-[#F5A623] p-4">
                  <div className="flex justify-center mb-4">
                    <User className="h-10 w-10 text-[#F5A623]" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-3">Client Layer</h3>
                  <ul className="text-sm text-neutral-200 space-y-2">
                    <li><span className="text-[#F5A623]">React Frontend</span> - Responsive UI built with React</li>
                    <li><span className="text-[#F5A623]">Tailwind CSS</span> - Utility-first CSS framework for styling</li>
                    <li><span className="text-[#F5A623]">Shadcn/UI</span> - Component library for consistent design</li>
                    <li><span className="text-[#F5A623]">React Query</span> - Data fetching and state management</li>
                    <li><span className="text-[#F5A623]">Wouter</span> - Lightweight routing solution</li>
                  </ul>
                </Card>
                
                <Card className="bg-[#003366] border-[#F5A623] p-4">
                  <div className="flex justify-center mb-4">
                    <Server className="h-10 w-10 text-[#F5A623]" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-3">Server Layer</h3>
                  <ul className="text-sm text-neutral-200 space-y-2">
                    <li><span className="text-[#F5A623]">Express.js</span> - Node.js web server framework</li>
                    <li><span className="text-[#F5A623]">API Controllers</span> - Handle HTTP requests and responses</li>
                    <li><span className="text-[#F5A623]">OpenAI Integration</span> - Powers chatbot and TTS features</li>
                    <li><span className="text-[#F5A623]">Self-Learning System</span> - Expands knowledge autonomously</li>
                    <li><span className="text-[#F5A623]">File Upload Service</span> - Manages document and image uploads</li>
                  </ul>
                </Card>
                
                <Card className="bg-[#003366] border-[#F5A623] p-4">
                  <div className="flex justify-center mb-4">
                    <Database className="h-10 w-10 text-[#F5A623]" />
                  </div>
                  <h3 className="text-lg font-semibold text-center mb-3">Data Layer</h3>
                  <ul className="text-sm text-neutral-200 space-y-2">
                    <li><span className="text-[#F5A623]">PostgreSQL</span> - Relational database for data storage</li>
                    <li><span className="text-[#F5A623]">Drizzle ORM</span> - Type-safe database access</li>
                    <li><span className="text-[#F5A623]">Knowledge Tables</span> - Store extracted information</li>
                    <li><span className="text-[#F5A623]">File Storage</span> - For uploaded documents and images</li>
                    <li><span className="text-[#F5A623]">Chat History</span> - Persistent conversation storage</li>
                  </ul>
                </Card>
              </div>
              
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Key Technical Features</h2>
                <ul className="list-disc pl-5 text-neutral-200 space-y-3">
                  <li>
                    <span className="font-medium text-[#F5A623]">Self-Learning Knowledge System</span>
                    <p className="mt-1">The platform automatically extracts and stores knowledge from conversations and uploaded files. This information is assigned confidence scores and verification statuses to ensure quality responses.</p>
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Text-to-Speech Integration</span>
                    <p className="mt-1">Implements OpenAI's TTS capability to provide natural-sounding voice responses with visual indicators showing when the system is speaking.</p>
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Bidirectional Data Flow</span>
                    <p className="mt-1">All layers communicate bidirectionally to ensure seamless information exchange between the user interface, server logic, and persistent storage.</p>
                  </li>
                  <li>
                    <span className="font-medium text-[#F5A623]">Enhanced Fallback Mechanism</span>
                    <p className="mt-1">When OpenAI doesn't have specific information about Morgan State's CS program, the system falls back to its internal knowledge base for accurate responses.</p>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}