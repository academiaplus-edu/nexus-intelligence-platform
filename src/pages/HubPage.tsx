import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Lock, ArrowRight, BookMarked, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { MOCK_POSTS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
export function HubPage() {
  const [filter, setFilter] = useState<string>("All");
  const categories = ["All", "Academic", "Industry", "Policy"];
  const filteredPosts = filter === "All" 
    ? MOCK_POSTS 
    : MOCK_POSTS.filter(p => p.category === filter);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8 md:py-12 lg:py-16">
        <div className="flex flex-col space-y-4 mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Intelligence Hub</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Our comprehensive library of research reports, executive briefings, and policy analyses. 
            Filtered by category and access level.
          </p>
        </div>
        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center">
          <div className="flex items-center w-full md:max-w-md relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search reports by keyword, author, or topic..." 
              className="pl-10 h-11 bg-slate-50 dark:bg-slate-900 border-none ring-1 ring-slate-200 dark:ring-slate-800"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground mr-2 shrink-0" />
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="group relative flex flex-col h-full hover:border-primary/50 transition-all duration-300">
              <CardHeader className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="rounded-sm font-medium">{post.category}</Badge>
                  {post.isPremium && (
                    <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100 border-amber-200 gap-1 flex items-center">
                      <Lock className="w-3 h-3" /> Premium
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  <Link to={`/hub/${post.slug}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-4 text-sm leading-relaxed">
                  {post.summary}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col border-t bg-slate-50/50 dark:bg-slate-900/50 p-6 space-y-4">
                <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <span>{post.author}</span>
                  </div>
                  <span>{post.date}</span>
                </div>
                <div className="flex gap-2 w-full">
                  <Button variant="default" size="sm" className="flex-1 group/btn" asChild>
                    <Link to={`/hub/${post.slug}`}>
                      View Report <ArrowRight className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <BookMarked className="w-4 h-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold">No reports found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or search term.</p>
            <Button variant="link" onClick={() => setFilter("All")}>Clear all filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}