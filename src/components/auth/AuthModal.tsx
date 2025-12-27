import React, { useState } from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShieldCheck, Mail, Lock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
interface AuthModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  defaultTab?: 'login' | 'signup';
}
export function AuthModal({ isOpen, onOpenChange, defaultTab = 'login' }: AuthModalProps) {
  const login = useAuthStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate secure API authentication
    setTimeout(() => {
      login(email || 'demo@nexus.com');
      setIsLoading(false);
      onOpenChange(false);
      toast.success('Access Granted. Welcome to the Nexus Intelligence Platform.', {
        description: 'You now have access to your personalized dashboard.',
      });
    }, 1500);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-background/98 backdrop-blur-2xl border-slate-200 dark:border-slate-800 shadow-2xl p-8 rounded-[2rem]">
        <DialogHeader className="flex flex-col items-center space-y-3 pb-6">
          <div className="p-4 bg-primary/10 rounded-[1.5rem] text-primary shadow-inner">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <DialogTitle className="text-3xl font-display font-bold tracking-tight">Nexus Access</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Professional intelligence for academic and industry decision makers.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100 dark:bg-slate-900 rounded-xl p-1">
            <TabsTrigger value="login" className="rounded-lg py-2">Login</TabsTrigger>
            <TabsTrigger value="signup" className="rounded-lg py-2">Sign Up</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit}>
            <TabsContent value="login" className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold">Work Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="email"
                    placeholder="name@company.com"
                    className="pl-10 h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="password" title="Password" className="text-sm font-semibold">Password</Label>
                  <span className="text-xs text-primary font-medium cursor-pointer hover:underline">Forgot?</span>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input 
                    id="password" 
                    type="password" 
                    className="pl-10 h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl" 
                    required 
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Verifying...</>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">Full Name</Label>
                <Input id="name" placeholder="John Doe" className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-email" className="text-sm font-semibold">Work Email</Label>
                <Input id="s-email" placeholder="name@company.com" type="email" className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl" required />
              </div>
              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20" disabled={isLoading}>
                {isLoading ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Creating Account...</>
                ) : (
                  "Create Free Account"
                )}
              </Button>
            </TabsContent>
          </form>
        </Tabs>
        <div className="text-center pt-8 border-t border-slate-100 dark:border-slate-800 mt-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            By continuing, you agree to our <span className="text-primary font-medium underline cursor-pointer">Terms of Service</span> and <span className="text-primary font-medium underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}