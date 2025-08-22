import Link from 'next/link';
import { Twitter, Instagram, Facebook, IceCream } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 mt-12">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <IceCream className="h-6 w-6 text-primary" />
            <p className="text-sm text-muted-foreground font-headline">
              Creamy Delights &copy; {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
