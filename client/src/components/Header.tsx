import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Moon, User } from 'lucide-react';
import studySyncLogo from '../assets/msuStudySyncAILogo.png';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

export default function Header({ toggleMobileMenu }: HeaderProps) {
  const [location] = useLocation();
  
  return (
    <header className="bg-primary shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center">
              <img 
                src={studySyncLogo} 
                alt="msuStudySyncAI Logo" 
                className="h-12 w-auto mr-2" 
              />
            </Link>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="text-white hover:bg-primary-light focus:outline-none"
            >
              <span className="material-icons">menu</span>
            </Button>
          </div>
          
          <nav className="hidden md:flex space-x-10 items-center">
            <Link href="/" className={`text-white hover:text-neutral-200 flex items-center ${location === '/' ? 'font-medium' : ''}`}>
              <span className="material-icons mr-1 text-sm">home</span>
              <span>Home</span>
            </Link>
            <Link href="/history" className={`text-white hover:text-neutral-200 flex items-center ${location === '/history' ? 'font-medium' : ''}`}>
              <span className="material-icons mr-1 text-sm">history</span>
              <span>History</span>
            </Link>
            <Link href="/settings" className={`text-white hover:text-neutral-200 flex items-center ${location === '/settings' ? 'font-medium' : ''}`}>
              <span className="material-icons mr-1 text-sm">settings</span>
              <span>Settings</span>
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button 
              variant="ghost" 
              size="icon" 
              className="mr-4 text-white hover:bg-primary-light"
            >
              <Moon className="h-5 w-5" />
            </Button>
            <Button 
              variant="secondary"
              size="icon"
              className="rounded-full h-8 w-8 flex items-center justify-center"
            >
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
