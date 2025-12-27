import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Lock, Bookmark, CheckCircle2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/use-auth-store';
import { useLibraryStore } from '@/store/use-library-store';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import type { Brief } from '@shared/types';
export function HubPage() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const userTier = useAuthStore(s => s.user?.tier);
  const toggleSave = useLibraryStore(s => s.toggleSave);
  const savedIds = useLibraryStore(s => s.savedIds);
  const isSaved = (id: string) => savedIds.includes(id);
  const { data, isLoading } = useQuery<{ items: Brief[] }>({
    queryKey: ['briefs', filter],
    queryFn: () => api<{ items: Brief[] }>(`/api/briefs${filter !== 'All' ? `?category=${filter}` : ''}`),
  });
  const filteredItems = data?.items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.summary.toLowerCase().includes(search.toLowerCase())
  ) || [];
  const categories = ["All", "Academic", "Industry", "Policy"];
  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const wasSaved = isSaved(id);
    toggleSave(id);
    toast.success(wasSaved ? 'Removed from saved reports' : 'Saved to library');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12 lg:py-16">
        <div className="flex flex-col space-y-4 mb-12">
          <div className="flex items-center gap-3">
             <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Intelligence Hub</h1>
             {isAuthenticated && userTier !== 'Free' && (
                <Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400 border-teal-200 py-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Full Access
                </Badge>
             )}
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Proprietary research and technical briefings bridging the gap between academia and industry.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-12 justify-between items-center">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search intelligence reports..." 
              className="pl-10 h-11 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus:ring-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <Button 
                key={cat} 
                variant={filter === cat ? "default" : "outline"} 
                size="sm" 
                onClick={() => setFilter(cat)} 
                className="rounded-full h-9 px-5 transition-all"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4 p-6 border rounded-3xl bg-slate-50/50">
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((post) => {
                const unlocked = !post.isPremium || (isAuthenticated && userTier !== 'Free');
                const saved = isSaved(post.id);
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="group relative flex flex-col h-full hover:border-primary/50 hover:shadow-xl transition-all duration-300 rounded-3xl overflow-hidden border-slate-200 dark:border-slate-800">
                      <CardHeader className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-6">
                          <Badge variant="secondary" className="font-medium">{post.category}</Badge>
                          <div className="flex items-center gap-2">
                            {post.isPremium && (
                              <Badge className={cn(
                                "h-6 px-2.5",
                                unlocked ? "bg-teal-100 text-teal-900" : "bg-amber-100 text-amber-900"
                              )}>
                                {unlocked ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Lock className="w-3 h-3 mr-1" />}
                                {unlocked ? "Unlocked" : "Premium"}
                              </Badge>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full hover:bg-primary/10" 
                              onClick={(e) => handleToggleSave(post.id, e)}
                            >
                              <Bookmark className={cn("h-4 w-4", saved && "fill-current text-primary")} />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-2xl mb-3 line-clamp-2 leading-tight">
                          <Link to={`/hub/${post.slug}`} className="hover:text-primary transition-colors">{post.title}</Link>
                        </CardTitle>
                        <CardDescription className="line-clamp-3 text-sm leading-relaxed mb-4">{post.summary}</CardDescription>
                      </CardHeader>
                      <CardFooter className="flex flex-col border-t bg-slate-50/50 dark:bg-slate-900/50 p-6 space-y-4">
                        <div className="flex items-center justify-between w-full text-xs font-medium text-muted-foreground">
                          <span className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-[10px]">
                              {post.author.split(' ').map(n => n[0]).join('')}
                            </div>
                            {post.author}
                          </span>
                          <span>{post.date}</span>
                        </div>
                        <Button variant={unlocked ? "default" : "secondary"} className="w-full h-11 rounded-xl font-bold" asChild>
                          <Link to={`/hub/${post.slug}`}>
                            {unlocked ? "Read Analysis" : "Unlock Premium Brief"}
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}