import * as React from 'react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Building, Mail, Phone } from 'lucide-react';

export default function InfoPanel() {
  return (
    <aside className="hidden lg:block w-80 bg-[#1c1c1c] border-l border-[#333333] overflow-y-auto h-full">
      <div className="px-4 py-5">
        <h2 className="text-lg font-heading font-semibold text-[#F5A623] mb-4">Program Information</h2>
        
        <Accordion type="single" collapsible defaultValue="overview" className="space-y-4">
          <AccordionItem value="overview" className="border border-[#333333] rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 bg-[#262626] text-left">
              <span className="font-medium text-sm text-[#F5A623]">Program Overview</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-300">
              <p className="mb-2">
                The Computer Science Program provides students with fundamental computer science knowledge and training, and prepares them to apply their knowledge and training to produce solutions to specific problems.
              </p>
              <p>
                Students learn to define a problem clearly, determine its feasibility and choose an appropriate solution strategy.
              </p>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="outcomes" className="border border-[#333333] rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 bg-[#262626] text-left">
              <span className="font-medium text-sm text-[#F5A623]">Learning Outcomes</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-300">
              <ul className="list-disc pl-5 space-y-1">
                <li>Analyze complex computing problems and apply principles of computing to identify solutions.</li>
                <li>Design, implement, and evaluate computing-based solutions to meet requirements.</li>
                <li>Communicate effectively in professional contexts.</li>
                <li>Recognize professional responsibilities and make informed judgments based on legal and ethical principles.</li>
                <li>Function effectively as a team member or leader.</li>
                <li>Apply computer science theory and software development fundamentals to produce computing-based solutions.</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="focus" className="border border-[#333333] rounded-md mb-4">
            <AccordionTrigger className="px-4 py-3 bg-[#262626] text-left">
              <span className="font-medium text-sm text-[#F5A623]">Areas of Learning Focus</span>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 text-sm text-gray-300">
              <ul className="list-disc pl-5">
                <li>Software Engineering</li>
                <li>Cybersecurity</li>
                <li>Artificial Intelligence</li>
                <li>Quantum Cryptography</li>
                <li>Data Science</li>
                <li>Game/Robotics</li>
                <li>Quantum Computing</li>
                <li>Cloud Computing</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        {/* Contact info */}
        <div className="border border-[#333333] rounded-md bg-[#262626]">
          <div className="px-4 py-3 bg-[#262626]">
            <span className="font-medium text-sm text-[#F5A623]">Contact Information</span>
          </div>
          <div className="px-4 py-3 text-sm text-gray-300">
            <div className="flex items-start mb-2">
              <Building className="text-[#F5A623] mr-2 h-5 w-5" />
              <div>
                <p>Department of Computer Science</p>
                <p>Morgan State University</p>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <Mail className="text-[#F5A623] mr-2 h-5 w-5" />
              <a href="mailto:cs@morgan.edu" className="text-[#F5A623] hover:underline">cs@morgan.edu</a>
            </div>
            <div className="flex items-center">
              <Phone className="text-[#F5A623] mr-2 h-5 w-5" />
              <p>(443) 885-3000</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
