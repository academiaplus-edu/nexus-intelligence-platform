import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Lock, ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/use-auth-store';
import { useLibraryStore } from '@/store/use-library-store';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import type { Brief } from '@shared/types';
export function HubPage() {
  const [filter, setFilter] = useState<string>("All");
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const userTier = useAuthStore(s => s.user?.tier);
  const toggleSave = useLibraryStore(s => s.toggleSave);
  const savedIds = useLibraryStore(s => s.savedIds);
  const isSaved = (id: string) => savedIds.includes(id);
  const { data, isLoading } = useQuery<{ items: Brief[] }>({
    queryKey: ['briefs', filter],
    queryFn: () => api<{ items: Brief[] }>(`/api/briefs${filter !== 'All' ? `?category=${filter}` : ''}`),
  });
  const categories = ["All", "Academic", "Industry", "Policy"];
  const handleToggleSave = (id: string) => {
    const wasSaved = isSaved(id);
    toggleSave(id);
    toast.success(wasSaved ? 'Removed from saved reports' : 'Saved to library');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12 lg:py-16">
        <div className="flex flex-col space-y-4 mb-12">
          <div className="flex items-center gap-3">
             <h1 className="text-4xl font-bold tracking-tight">Intelligence Hub</h1>
             {isAuthenticated && userTier !== 'Free' && (
                <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Unlocked Access
                </Badge>
             )}
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">Our comprehensive library of research reports and executive briefings.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center">
          <Input placeholder="Search reports..." className="max-w-md" />
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
            {categories.map((cat) => (
              <Button key={cat} variant={filter === cat ? "default" : "outline"} size="sm" onClick={() => setFilter(cat)} className="rounded-full">
                {cat}
              </Button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 rounded-xl bg-slate-100 animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data?.items.map((post) => {
              const unlocked = !post.isPremium || (isAuthenticated && userTier !== 'Free');
              const saved = isSaved(post.id);
              return (
                <Card key={post.id} className="group relative flex flex-col h-full hover:border-primary/50 transition-all duration-300">
                  <CardHeader className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center gap-2">
                        {post.isPremium && (
                          <Badge className={cn(unlocked ? "bg-teal-100 text-teal-900" : "bg-amber-100 text-amber-900")}>
                            {unlocked ? <CheckCircle2 className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                            {unlocked ? "Unlocked" : "Premium"}
                          </Badge>
                        )}
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleToggleSave(post.id)}>
                          <Bookmark className={cn("h-4 w-4", saved && "fill-current text-primary")} />
                        </Button>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 line-clamp-2">
                      <Link to={`/hub/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                    </CardTitle>
                    <CardDescription className="line-clamp-3 text-sm">{post.summary}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex flex-col border-t bg-slate-50/50 p-6 space-y-4">
                    <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <Button variant="default" size="sm" className="w-full" asChild>
                      <Link to={`/hub/${post.slug}`}>{unlocked ? "View Report" : "Unlock Analysis"}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}