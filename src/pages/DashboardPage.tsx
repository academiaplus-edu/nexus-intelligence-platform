import React from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { useLibraryStore } from '@/store/use-library-store';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookMarked, CreditCard, ArrowRight, ShieldCheck, Mail, LogOut, LayoutDashboard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { api } from '@/lib/api-client';
import type { Brief } from '@shared/types';
export function DashboardPage() {
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const userName = useAuthStore(s => s.user?.name);
  const userTier = useAuthStore(s => s.user?.tier);
  const userEmail = useAuthStore(s => s.user?.email);
  const logout = useAuthStore(s => s.logout);
  const savedIds = useLibraryStore(s => s.savedIds);
  const { data: allBriefs } = useQuery<{ items: Brief[] }>({
    queryKey: ['briefs'],
    queryFn: () => api<{ items: Brief[] }>('/api/briefs'),
    enabled: isAuthenticated
  });
  const savedPosts = allBriefs?.items.filter(p => savedIds.includes(p.id)) || [];
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Nexus Dashboard</h1>
            <p className="text-muted-foreground text-lg">Managing intelligence for {userName}</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900 px-6 py-3 rounded-2xl border shadow-sm">
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase text-muted-foreground">Account Tier</span>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">{userTier}</Badge>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase text-muted-foreground">Work Email</span>
              <span className="text-sm font-medium">{userEmail}</span>
            </div>
          </div>
        </div>
        <Tabs defaultValue="library" className="space-y-10">
          <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
            <TabsTrigger 
              value="library" 
              className="px-0 pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold"
            >
              <BookMarked className="w-4 h-4 mr-2" /> Saved Library
            </TabsTrigger>
            <TabsTrigger 
              value="subscription" 
              className="px-0 pb-4 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none font-semibold"
            >
              <CreditCard className="w-4 h-4 mr-2" /> Subscription
            </TabsTrigger>
          </TabsList>
          <AnimatePresence mode="wait">
            <TabsContent value="library">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {savedPosts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedPosts.map((post) => (
                      <Card key={post.id} className="group overflow-hidden hover:border-primary/50 transition-all">
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="outline">{post.category}</Badge>
                            {post.isPremium && <Badge className="bg-amber-100 text-amber-900 text-[10px]">Premium</Badge>}
                          </div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="bg-slate-50/50 dark:bg-slate-900/50 border-t py-4 flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{post.date}</span>
                          <Button variant="ghost" size="sm" asChild className="group/btn">
                            <Link to={`/hub/${post.slug}`}>
                              Read Brief <ArrowRight className="ml-1 w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 border-2 border-dashed rounded-[2.5rem] bg-slate-50/50 dark:bg-slate-900/50 space-y-6">
                    <div className="mx-auto w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                      <BookMarked className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold">Your intelligence library is empty</h3>
                      <p className="text-muted-foreground max-w-sm mx-auto">Start exploring the Hub to save high-impact reports and strategic analysis.</p>
                    </div>
                    <Button asChild size="lg" className="rounded-full px-8"><Link to="/hub">Explore Hub</Link></Button>
                  </div>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="subscription">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl"
              >
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-teal-500/5 overflow-hidden">
                  <CardHeader className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                        <ShieldCheck className="w-8 h-8" />
                      </div>
                      <Badge className="bg-primary text-primary-foreground">Active</Badge>
                    </div>
                    <CardTitle className="text-3xl">Current Plan: {userTier}</CardTitle>
                    <CardDescription className="text-lg">
                      {userTier === 'Free' ? 'Unlock premium intelligence with a tiered membership.' : 'You have full access to our global intelligence library.'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="px-8 pb-8 space-y-6">
                    <div className="grid grid-cols-2 gap-8 py-6 border-y border-primary/10">
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Billing Period</p>
                        <p className="font-medium">Monthly</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Next Payment</p>
                        <p className="font-medium">March 1, 2024</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-slate-50/50 dark:bg-slate-900/50 p-8 flex gap-4">
                    <Button asChild size="lg" className="px-8"><Link to="/pricing">Change Plan</Link></Button>
                    <Button variant="outline" size="lg" className="px-8">View Billing History</Button>
                  </CardFooter>
                </Card>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  );
}