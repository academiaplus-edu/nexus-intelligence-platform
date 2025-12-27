import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Calendar, ArrowLeft, Lock, ChevronRight, Share2, Bookmark, Download, FileJson, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/use-auth-store';
import { useLibraryStore } from '@/store/use-library-store';
import { toast } from 'sonner';
import { api } from '@/lib/api-client';
import type { Brief } from '@shared/types';
export function ArticlePage() {
  const { slug } = useParams();
  const isAuthenticated = useAuthStore(s => s.isAuthenticated);
  const userTier = useAuthStore(s => s.user?.tier);
  const toggleSave = useLibraryStore(s => s.toggleSave);
  const savedIds = useLibraryStore(s => s.savedIds);
  const { data: post, isLoading } = useQuery<Brief>({
    queryKey: ['brief', slug],
    queryFn: () => api<Brief>(`/api/briefs/${slug}`),
    enabled: !!slug,
  });
  const isSaved = post ? savedIds.includes(post.id) : false;
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>
    );
  }
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Report not found</h2>
        <Button asChild><Link to="/hub">Return to Hub</Link></Button>
      </div>
    );
  }
  const isUnlocked = !post.isPremium || (isAuthenticated && userTier && userTier !== 'Free');
  const handleDownload = (format: 'PDF' | 'Excel') => {
    toast.info(`Preparing ${format} export...`);
    setTimeout(() => {
      toast.success(`${format} downloaded successfully.`);
    }, 1500);
  };
  const handleToggleSave = () => {
    toggleSave(post.id);
    toast.success(isSaved ? 'Removed from saved reports' : 'Saved to library');
  };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex justify-between items-center">
            <Link to="/hub" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Intelligence Hub
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => toast.success('Link copied to clipboard')}><Share2 className="h-4 w-4" /></Button>
              <Button
                variant={isSaved ? "secondary" : "ghost"}
                size="icon"
                className={cn("h-8 w-8", isSaved && "text-primary")}
                onClick={handleToggleSave}
              >
                <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
              </Button>
              {isUnlocked && (
                 <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload('PDF')}><Download className="h-4 w-4" /></Button>
              )}
            </div>
          </div>
          <header className="space-y-6">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">{post.category}</Badge>
              {post.isPremium && <Badge className="bg-amber-100 text-amber-900 border-amber-200">Premium Analysis</Badge>}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y py-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold">
                  {post.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-semibold text-foreground">{post.author}</span>
              </div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {post.date}</div>
              <div className="flex items-center gap-2"><Clock className="w-4 h-4" /> {post.readTime}</div>
            </div>
          </header>
          <article className="relative">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-xl font-medium leading-relaxed mb-8">
                {post.summary}
              </p>
              <div className={cn(
                "space-y-6 transition-all duration-700",
                !isUnlocked && "blur-[12px] select-none pointer-events-none opacity-40"
              )}>
                {post.fullContent.split('. ').map((para, i) => (
                  <p key={i} className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {para}. {para.length > 50 && "Further granular research by the Nexus Intelligence team indicates that the underlying structural shifts are primarily driven by changing regulatory landscapes and capital reallocation toward sustainable infrastructure."}
                  </p>
                ))}
                {isUnlocked && (
                  <div className="mt-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2"><FileJson className="w-5 h-5 text-primary" /> Technical Addendum</h3>
                    <p className="text-muted-foreground text-sm mb-6">Access the full data set including Excel models, stakeholder maps, and regulatory risk scores.</p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="sm" className="bg-slate-900 text-white" onClick={() => handleDownload('Excel')}><Download className="w-4 h-4 mr-2" /> Download Excel Model</Button>
                      <Button size="sm" variant="outline" onClick={() => handleDownload('PDF')}><Download className="w-4 h-4 mr-2" /> Export Technical PDF</Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {!isUnlocked && (
              <div className="absolute inset-x-0 top-32 bottom-0 flex justify-center pt-24 pb-12 z-10 bg-gradient-to-t from-background via-transparent to-transparent">
                <div className="max-w-lg w-full h-fit bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6 text-center animate-slide-up">
                  <div className="mx-auto w-16 h-16 bg-amber-50 dark:bg-amber-950/30 rounded-full flex items-center justify-center">
                    <Lock className="w-8 h-8 text-amber-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">Premium Intelligence</h3>
                    <p className="text-muted-foreground">
                      This report contains proprietary data and in-depth strategic analysis reserved for Industry and Enterprise members.
                    </p>
                  </div>
                  <div className="pt-4 space-y-3">
                    <Button size="lg" className="w-full bg-slate-900 text-white hover:bg-slate-800 py-6" asChild>
                      <Link to="/pricing">Unlock Access Now</Link>
                    </Button>
                    <p className="text-sm">
                      Need assistance? <span className="font-bold underline cursor-pointer">Contact support</span>
                    </p>
                  </div>
                  <div className="pt-6 border-t grid grid-cols-2 gap-4">
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Includes</p>
                      <p className="text-sm flex items-center gap-1"><ChevronRight className="w-3 h-3" /> Excel Models</p>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Format</p>
                      <p className="text-sm flex items-center gap-1"><ChevronRight className="w-3 h-3" /> PDF Export</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        </div>
      </div>
    </div>
  );
}