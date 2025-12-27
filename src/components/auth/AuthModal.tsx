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
import { ShieldCheck, Mail, Lock } from 'lucide-react';
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
    // Simulate API call
    setTimeout(() => {
      login(email || 'demo@nexus.com');
      setIsLoading(false);
      onOpenChange(false);
      toast.success('Successfully authenticated. Welcome to Nexus Intelligence.');
    }, 1000);
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] bg-background/95 backdrop-blur-xl border-slate-200 dark:border-slate-800">
        <DialogHeader className="flex flex-col items-center space-y-2 pb-4">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <DialogTitle className="text-2xl font-display font-bold">Nexus Access</DialogTitle>
          <DialogDescription>
            Enter your credentials to access the hub.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue={defaultTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <form onSubmit={handleSubmit}>
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    placeholder="name@company.com" 
                    className="pl-10" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type="password" className="pl-10" required />
                </div>
              </div>
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Authenticating..." : "Login to Dashboard"}
              </Button>
            </TabsContent>
            <TabsContent value="signup" className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="s-email">Work Email</Label>
                <Input id="s-email" placeholder="name@company.com" type="email" required />
              </div>
              <Button type="submit" className="w-full h-11" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Free Account"}
              </Button>
            </TabsContent>
          </form>
        </Tabs>
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}