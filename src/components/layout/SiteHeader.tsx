import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, ShieldCheck, ChevronRight, LogOut, LayoutDashboard, Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuthStore } from '@/store/use-auth-store';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Intelligence Hub', path: '/hub' },
  { name: 'Services', path: '/services' },
  { name: 'Pricing', path: '/pricing' },
];
export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const userName = useAuthStore(s => s.user?.name);
  const userEmail = useAuthStore(s => s.user?.email);
  const logout = useAuthStore(s => s.logout);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-primary p-1.5 rounded-lg transition-transform group-hover:scale-105">
                <ShieldCheck className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight uppercase">NEXUS<span className="text-muted-foreground/60">.</span>INTEL</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-foreground" : "text-muted-foreground"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                      <Avatar className="h-9 w-9 border">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs">{userName?.[0]}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setIsAuthModalOpen(true)}>Login</Button>
                  <Button size="sm" onClick={() => setIsAuthModalOpen(true)}>Join Hub</Button>
                </>
              )}
            </div>
            <ThemeToggle className="relative" />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <nav className="flex flex-col space-y-4 pt-8">
                  {NAV_LINKS.map((link) => (
                    <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-lg font-semibold">{link.name}</Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </header>
  );
}