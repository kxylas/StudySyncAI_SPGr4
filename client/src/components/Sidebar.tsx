import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="hidden md:block bg-white w-64 border-r border-neutral-200 overflow-y-auto">
      <div className="px-4 py-5">
        <h2 className="text-lg font-heading font-semibold text-neutral-900 mb-4">Topics</h2>
        
        <nav className="space-y-1">
          <Link 
            href="/" 
            className={cn(
              "flex items-center px-3 py-2 text-sm font-medium rounded-md", 
              location === "/" 
                ? "bg-primary text-white" 
                : "text-neutral-700 hover:bg-neutral-100"
            )}
          >
            <span className="material-icons mr-3 text-sm">chat</span>
            <span>AI Chat Assistant</span>
          </Link>
          
          <div className="mt-3">
            <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Academic Information
            </h3>
            <div className="mt-1 space-y-1">
              <Link 
                href="/program-overview"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100"
              >
                <span className="material-icons mr-3 text-sm">school</span>
                <span>Program Overview</span>
              </Link>
              <Link 
                href="/curriculum"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100"
              >
                <span className="material-icons mr-3 text-sm">menu_book</span>
                <span>Curriculum & Courses</span>
              </Link>
              <Link 
                href="/requirements"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100"
              >
                <span className="material-icons mr-3 text-sm">assignment</span>
                <span>Requirements</span>
              </Link>
            </div>
          </div>
          
          <div className="mt-3">
            <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Student Resources
            </h3>
            <div className="mt-1 space-y-1">
              <Link 
                href="/internships"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100"
              >
                <span className="material-icons mr-3 text-sm">work</span>
                <span>Internships</span>
              </Link>
              <Link 
                href="/study-groups"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100"
              >
                <span className="material-icons mr-3 text-sm">groups</span>
                <span>Study Groups</span>
              </Link>
              <Link 
                href="/advisors"
                className="flex items-center px-3 py-2 text-sm font-medium text-neutral-700 rounded-md hover:bg-neutral-100"
              >
                <span className="material-icons mr-3 text-sm">contact_support</span>
                <span>Advisors</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
