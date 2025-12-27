import React from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { useLibraryStore } from '@/store/use-library-store';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate } from 'react-router-dom';
import { BookMarked, Settings, CreditCard, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';
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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName?.split(' ')[0]}</h1>
            <p className="text-muted-foreground">Manage your subscription and saved briefs.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl border">
            <Badge variant="outline">{userTier} Tier</Badge>
            <div className="h-8 w-px bg-border" />
            <span className="text-sm font-medium">{userEmail}</span>
          </div>
        </div>
        <Tabs defaultValue="library" className="space-y-8">
          <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
            <TabsTrigger value="library" className="px-0 pb-4 data-[state=active]:bg-transparent">
              <BookMarked className="w-4 h-4 mr-2" /> Saved Library
            </TabsTrigger>
            <TabsTrigger value="subscription" className="px-0 pb-4 data-[state=active]:bg-transparent">
              <CreditCard className="w-4 h-4 mr-2" /> Subscription
            </TabsTrigger>
          </TabsList>
          <TabsContent value="library">
            {savedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden">
                    <CardHeader>
                      <Badge className="w-fit">{post.category}</Badge>
                      <CardTitle className="text-lg">{post.title}</CardTitle>
                    </CardHeader>
                    <CardFooter className="bg-slate-50 border-t py-3 flex justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/hub/${post.slug}`}>Read Brief <ArrowRight className="ml-1 w-3 h-3" /></Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border-2 border-dashed rounded-3xl">
                <h3 className="text-lg font-bold">Your library is empty</h3>
                <Button asChild className="mt-4"><Link to="/hub">Explore Hub</Link></Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="subscription">
            <Card className="max-w-2xl border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle>Current Plan: {userTier}</CardTitle>
                <CardDescription>Your plan is active.</CardDescription>
              </CardHeader>
              <CardFooter className="gap-3">
                <Button asChild><Link to="/pricing">Upgrade Plan</Link></Button>
                <Button variant="outline">Billing</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}