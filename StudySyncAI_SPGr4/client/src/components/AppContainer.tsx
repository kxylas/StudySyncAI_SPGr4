import { ReactNode } from 'react';
import Header from './Header';
import MobileMenu from './MobileMenu';
import { useState } from 'react';

interface AppContainerProps {
  children: ReactNode;
}

export default function AppContainer({ children }: AppContainerProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden" id="app-container">
      <Header toggleMobileMenu={toggleMobileMenu} />
      <MobileMenu isOpen={mobileMenuOpen} />
      {children}
    </div>
  );
}
