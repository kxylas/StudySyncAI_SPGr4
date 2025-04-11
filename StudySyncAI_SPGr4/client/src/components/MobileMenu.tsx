import { Link } from 'wouter';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import StudyScheduleForm from './StudyScheduleForm';
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg absolute w-full z-20">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <Link href="/" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">home</span>
            Home
          </span>
        </Link>
        <Link href="/internships" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">work</span>
            Internships
          </span>
        </Link>
        <Link href="/career-resources" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">business_center</span>
            Career Resources
          </span>
        </Link>
        <Link href="/history" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">history</span>
            History
          </span>
        </Link>
        <Link href="/profile" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">person</span>
            My Profile
          </span>
        </Link>
        <Link href="/study-schedule" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">schedule</span>
            Study Schedule
          </span>
        </Link>
        
        {/* Calendar */}
        <div className="text-primary block px-3 py-2 rounded-md text-base font-medium">
          <span className="flex items-center mb-2">
            <span className="material-icons mr-2 text-sm">calendar_month</span>
            Calendar
          </span>
          <div className="mobile-calendar-container bg-[#222222] rounded-lg p-2 border border-[#003366]">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mobile-calendar bg-[#222222] text-white"
              modifiersStyles={{
                today: { backgroundColor: "#F5A623", color: "#003366", fontWeight: "bold" }
              }}
            />
          </div>
        </div>
        
        {/* Study Schedule Generator button */}
        <div className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <CalendarIcon className="mr-2 h-5 w-5" />
            <div className="flex-1">
              <StudyScheduleForm />
            </div>
          </span>
        </div>
        
        <Link href="/settings" className="text-primary block px-3 py-2 rounded-md text-base font-medium hover:bg-neutral-100">
          <span className="flex items-center">
            <span className="material-icons mr-2 text-sm">settings</span>
            Settings
          </span>
        </Link>
        <div className="mt-4 flex items-center justify-between px-3">
          <Label htmlFor="dark-mode-mobile" className="text-neutral-500">Dark mode</Label>
          <Switch id="dark-mode-mobile" />
        </div>
      </div>
    </div>
  );
}
