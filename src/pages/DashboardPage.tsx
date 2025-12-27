import React from 'react';
import { useAuthStore } from '@/store/use-auth-store';
import { useLibraryStore } from '@/store/use-library-store';
import { MOCK_POSTS } from '@/lib/mock-data';
import { Link, Navigate } from 'react-router-dom';
import { 
  User, 
  BookMarked, 
  Settings, 
  CreditCard, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const savedIds = useLibraryStore((s) => s.savedIds);
  const savedPosts = MOCK_POSTS.filter(p => savedIds.includes(p.id));
  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-10 lg:py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user.name.split(' ')[0]}</h1>
            <p className="text-muted-foreground">Manage your subscription and saved intelligence briefs.</p>
          </div>
          <div className="flex items-center gap-3 bg-slate-100 dark:bg-slate-900 px-4 py-2 rounded-xl border">
            <Badge variant="outline" className="bg-background">{user.tier} Tier</Badge>
            <div className="h-8 w-px bg-border" />
            <span className="text-sm font-medium">{user.email}</span>
          </div>
        </div>
        <Tabs defaultValue="library" className="space-y-8">
          <TabsList className="bg-transparent border-b rounded-none h-auto p-0 space-x-8">
            <TabsTrigger value="library" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4">
              <BookMarked className="w-4 h-4 mr-2" /> Saved Library
            </TabsTrigger>
            <TabsTrigger value="subscription" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4">
              <CreditCard className="w-4 h-4 mr-2" /> Subscription
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-0 pb-4">
              <Settings className="w-4 h-4 mr-2" /> Account Settings
            </TabsTrigger>
          </TabsList>
          <TabsContent value="library">
            {savedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedPosts.map((post) => (
                  <Card key={post.id} className="group overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{post.category}</Badge>
                        {post.isPremium && <Badge className="bg-amber-100 text-amber-900">Premium</Badge>}
                      </div>
                      <CardTitle className="text-lg line-clamp-2">
                        <Link to={`/hub/${post.slug}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                    </CardHeader>
                    <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t py-3 flex justify-between items-center">
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
                <BookMarked className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-bold">Your library is empty</h3>
                <p className="text-muted-foreground mb-6">Save reports from the hub to access them quickly later.</p>
                <Button asChild><Link to="/hub">Explore Intelligence Hub</Link></Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="subscription">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <Card className="lg:col-span-2 border-primary/20 bg-primary/5">
                <CardHeader>
                  <CardTitle>Current Plan: {user.tier}</CardTitle>
                  <CardDescription>Your plan is active and will renew on April 15, 2024.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-xl border">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Downloads Used</p>
                      <p className="text-2xl font-bold">12 / 50</p>
                    </div>
                    <div className="p-4 bg-background rounded-xl border">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Briefs Accessed</p>
                      <p className="text-2xl font-bold">158</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-3">
                  <Button asChild><Link to="/pricing">Upgrade Plan</Link></Button>
                  <Button variant="outline">Billing History</Button>
                </CardFooter>
              </Card>
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start text-xs h-9">
                      <ShieldCheck className="w-3.5 h-3.5 mr-2" /> Update Security
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-xs h-9">
                      <TrendingUp className="w-3.5 h-3.5 mr-2" /> Usage Statistics
                    </Button>
                  </CardContent>
                </Card>
                <div className="p-6 bg-slate-900 rounded-2xl text-white">
                  <p className="text-sm font-bold mb-2">Need Enterprise features?</p>
                  <p className="text-xs text-slate-400 mb-4">API access, white-labeling, and priority technical support.</p>
                  <Button size="sm" className="w-full bg-white text-slate-900 hover:bg-slate-100">Contact Sales</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Profile Details</CardTitle>
                <CardDescription>Manage your public-facing information and account security.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6 p-6 border rounded-2xl bg-slate-50 dark:bg-slate-900">
                  <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {user.name[0]}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <Badge variant="outline">Verified Contributor</Badge>
                  </div>
                  <Button variant="outline" className="ml-auto" size="sm">Edit Photo</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}