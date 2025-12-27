import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Clock, ArrowLeft, Lock, ChevronRight, Share2, Printer, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MOCK_POSTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
export function ArticlePage() {
  const { slug } = useParams();
  const post = MOCK_POSTS.find((p) => p.slug === slug);
  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Report not found</h2>
        <Button asChild><Link to="/hub">Return to Hub</Link></Button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Breadcrumbs & Actions */}
          <div className="flex justify-between items-center">
            <Link to="/hub" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Intelligence Hub
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Share2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Printer className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="h-8 w-8"><Bookmark className="h-4 w-4" /></Button>
            </div>
          </div>
          {/* Header */}
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
          {/* Content Area */}
          <article className="relative">
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <p className="text-xl font-medium leading-relaxed mb-8">
                {post.summary}
              </p>
              <div className={cn(
                "space-y-6 transition-all duration-700",
                post.isPremium && "blur-[8px] select-none pointer-events-none opacity-40"
              )}>
                {post.fullContent.split('. ').map((para, i) => (
                  <p key={i} className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {para}. {para.length > 50 && "This extended analysis explores the underlying socio-economic drivers affecting the current landscape. We examine both quantitative data sets from institutional sources and qualitative insights gathered from field experts."}
                  </p>
                ))}
              </div>
            </div>
            {/* Lock Overlay */}
            {post.isPremium && (
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
                      Already a member? <Link to="#" className="font-bold underline">Login</Link>
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
          {/* Related Footer */}
          {!post.isPremium && (
            <div className="border-t pt-12 mt-12">
              <h3 className="text-lg font-bold mb-6">Key Takeaways</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Primary stakeholders are shifting toward regionalized clusters.
                </li>
                <li className="flex gap-3 text-sm text-slate-600 dark:text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  Regulatory friction is expected to peak in early Q4.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}