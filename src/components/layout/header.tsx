'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IceCream, Menu, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Products' },
  { href: '/order', label: 'Order' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Us' },
];

export function Header() {
  const pathname = usePathname();

  const NavLinks = ({ className }: { className?: string }) => (
    <nav className={cn('flex items-center gap-4 lg:gap-6', className)}>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            'transition-colors hover:text-primary-foreground font-medium',
            pathname === link.href ? 'text-primary-foreground' : 'text-muted-foreground'
          )}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <IceCream className="h-6 w-6 text-primary" />
          <span className="font-headline">Creamy Delights</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <NavLinks />
           <Button variant="default" size="sm" asChild>
             <Link href="/login">
                <User className="h-4 w-4 mr-2" />
                Login / Sign Up
             </Link>
           </Button>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                  <IceCream className="h-6 w-6 text-primary" />
                  <span className="font-headline">Creamy Delights</span>
                </Link>
                <NavLinks className="flex-col items-start gap-4 text-lg" />
                 <Button variant="default" size="sm" asChild>
                   <Link href="/login">
                      <User className="h-4 w-4 mr-2" />
                      Login / Sign Up
                   </Link>
                 </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
