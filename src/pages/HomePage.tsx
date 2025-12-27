import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Globe, TrendingUp, CheckCircle2, Star, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_POSTS } from '@/shared/mock-data';
export function HomePage() {
  const featured = MOCK_POSTS.slice(0, 3);
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-teal-950 opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-8 animate-fade-in">
            <Badge variant="outline" className="text-teal-400 border-teal-500/30 px-3 py-1 bg-teal-500/10">
              Intelligence for Global Leaders
            </Badge>
            <h1 className="text-display text-white tracking-tight">
              Where Academic Rigor Meets <span className="text-teal-400">Industry Action.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
              Nexus Intelligence delivers deep-tech analysis and geopolitical reports that the mass market misses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-500 text-white border-none text-lg px-8">
                <Link to="/hub">Explore the Hub <ArrowRight className="ml-2 w-5 h-5" /></Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-white border-slate-700 hover:bg-white/10 text-lg">
                <Link to="/pricing">View Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 border-b bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-8">Trusted by contributors from</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all">
             <div className="flex items-center gap-2 font-bold text-xl"><Globe className="w-6 h-6" /> OXFORD</div>
             <div className="flex items-center gap-2 font-bold text-xl"><TrendingUp className="w-6 h-6" /> GOLDMAN</div>
             <div className="flex items-center gap-2 font-bold text-xl"><BookOpen className="w-6 h-6" /> MIT</div>
             <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="w-6 h-6" /> BROOKINGS</div>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold font-display">Latest Intelligence Briefs</h2>
            <p className="text-muted-foreground max-w-xl">Freshly published insights from our global network of experts.</p>
          </div>
          <Button variant="ghost" asChild className="group">
            <Link to="/hub">See full library <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((post) => (
            <Card key={post.id} className="group flex flex-col hover:shadow-lg transition-shadow border-slate-200 dark:border-slate-800">
              <CardHeader className="space-y-4 flex-1">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="bg-slate-100 text-slate-900">{post.category}</Badge>
                  {post.isPremium && <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50">Premium</Badge>}
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors">
                  <Link to={`/hub/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-3 leading-relaxed">
                  {post.summary}
                </CardDescription>
              </CardHeader>
              <CardFooter className="pt-0 border-t mt-4 py-4 flex justify-between items-center">
                <span className="text-xs text-muted-foreground">{post.date}</span>
                <Link to={`/hub/${post.slug}`} className="text-sm font-semibold flex items-center text-primary">Read <ArrowRight className="ml-1 w-3 h-3" /></Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Empower your strategy with data-driven clarity.</h2>
              <div className="space-y-4">
                {["Access proprietary models", "Early-bird regulatory alerts", "Direct line to consultants"].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-teal-400 shrink-0" />
                    <span className="text-lg text-slate-300">{item}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 mt-4 px-8 py-6 text-lg">
                Start Your Trial
              </Button>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 blur-3xl rounded-full -mr-16 -mt-16" />
               <div className="relative space-y-6">
                 <div className="flex gap-1">
                   {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
                 </div>
                 <p className="text-xl italic text-slate-300">"Nexus has fundamentally changed how we evaluate political risk."</p>
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center font-bold">JD</div>
                   <div>
                     <p className="font-bold">Julianne DeSilva</p>
                     <p className="text-sm text-slate-400">Head of Strategy</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}