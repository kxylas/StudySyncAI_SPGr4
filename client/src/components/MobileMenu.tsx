import { Link } from 'wouter';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MobileMenuProps {
  isOpen: boolean;
}

export default function MobileMenu({ isOpen }: MobileMenuProps) {
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
