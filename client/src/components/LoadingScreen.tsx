import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
// Using a direct relative path to the assets folder in src
import logoPath from '../assets/StudySyncAILogo.png';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          return 100;
        }
        const newProgress = Math.min(oldProgress + 10, 100);
        return newProgress;
      });
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [progress]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="w-48 h-48 relative mb-4">
          <img src={logoPath} alt="StudySyncAI Logo" className="w-full h-full" />
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#F5A623] mb-2">StudySyncAI</h1>
          <p className="text-gray-300 mb-4">Morgan State University CS Program Assistant</p>
        </div>
        
        <div className="w-64 h-2 bg-neutral-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#003366] to-[#F5A623]"
            style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
          />
        </div>
        
        <div className="flex items-center mt-4 text-gray-400">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          <span>Loading resources...</span>
        </div>
      </div>
    </div>
  );
}