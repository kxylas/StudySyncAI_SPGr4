import AppContainer from '@/components/AppContainer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProgramOverview() {
  return (
    <AppContainer>
      <main className="flex-1 overflow-y-auto p-6 bg-[#222222]">
        <div className="max-w-5xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-[#F5A623]">Computer Science Program Overview</h1>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">About the Program</CardTitle>
              <CardDescription className="text-[#003366]">Morgan State University Computer Science</CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366] space-y-4">
              <p>
                The Computer Science Program provides students with fundamental computer science knowledge and training, 
                and prepares them to apply their knowledge and training to produce solutions to specific problems. 
                Students learn to define a problem clearly, determine its feasibility and choose an appropriate solution strategy.
              </p>
              <p>
                The solution strategy will study, specify, design, implement, test, modify, and document the solution. 
                As part of the solution strategy, students will learn to evaluate alternative designs, perform risk analysis 
                on alternative designs, and finally, communicate solutions to colleagues and other professionals. 
                A key element to all of this is the ability of the student to work and collaborate within a team environment 
                throughout the entire problem-solving process.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Primary Objectives</CardTitle>
              <CardDescription className="text-[#003366]">Core goals of the curriculum</CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366]">
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide practical knowledge that will be of immediate use in the profession.</li>
                <li>
                  Provide a solid foundation in theoretical computer science, so that graduates will have the 
                  fundamentals necessary to acquire knowledge in a rapidly evolving discipline.
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Learning Outcomes</CardTitle>
              <CardDescription className="text-[#003366]">Bachelor of Computer Science degree student learning outcomes</CardDescription>
            </CardHeader>
            <CardContent className="text-[#003366]">
              <ul className="list-disc pl-6 space-y-2">
                <li>Analyze a complex computing problem and apply principles of computing and other relevant disciplines to identify solutions.</li>
                <li>Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.</li>
                <li>Communicate effectively in a variety of professional contexts.</li>
                <li>Recognize professional responsibilities and make informed judgments in computing practice based on legal and ethical principles.</li>
                <li>Function effectively as a member or leader of a team engaged in activities appropriate to the program discipline.</li>
                <li>Apply computer science theory and software development fundamentals to produce computing-based solutions.</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card className="bg-neutral-800 border-neutral-700 shadow-md">
            <CardHeader>
              <CardTitle className="text-[#F5A623]">Areas of Learning Focus</CardTitle>
              <CardDescription className="text-[#003366]">Specialized fields within the program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Software Engineering</h3>
                  <p className="text-[#003366]">Design, development, and maintenance of software systems</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Cybersecurity</h3>
                  <p className="text-[#003366]">Protection of computer systems, networks, and data</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Artificial Intelligence</h3>
                  <p className="text-[#003366]">Creating systems that can perform tasks requiring human intelligence</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Quantum Cryptography</h3>
                  <p className="text-[#003366]">Secure communication using quantum mechanical principles</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Data Science</h3>
                  <p className="text-[#003366]">Extracting knowledge and insights from data</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Game/Robotics</h3>
                  <p className="text-[#003366]">Development of interactive games and robotic systems</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Quantum Computing</h3>
                  <p className="text-[#003366]">Computing based on quantum-mechanical phenomena</p>
                </div>
                <div className="bg-neutral-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-[#F5A623] mb-2">Cloud Computing</h3>
                  <p className="text-[#003366]">Delivery of computing services over the internet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </AppContainer>
  );
}