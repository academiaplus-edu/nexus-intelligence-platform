import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export function SiteFooter() {
  return (
    <footer className="bg-slate-50 border-t dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-8 h-8 text-primary" />
              <span className="font-display font-bold text-xl">NEXUS</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Bridging the gap between rigorous academic research and actionable industry strategy for high-stakes decision makers.
            </p>
            <div className="flex space-x-4">
              <Twitter className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Linkedin className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              <Github className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Intelligence</h3>
            <ul className="space-y-2">
              <li><Link to="/hub" className="text-muted-foreground hover:text-primary text-sm">Latest Reports</Link></li>
              <li><Link to="/hub" className="text-muted-foreground hover:text-primary text-sm">Policy Briefs</Link></li>
              <li><Link to="/hub" className="text-muted-foreground hover:text-primary text-sm">Case Studies</Link></li>
              <li><Link to="/hub" className="text-muted-foreground hover:text-primary text-sm">Archived Analysis</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-muted-foreground hover:text-primary text-sm">Consulting</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-primary text-sm">Our Network</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-primary text-sm">Pricing Plans</Link></li>
              <li><Link to="#" className="text-muted-foreground hover:text-primary text-sm">Contact Us</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4">Nexus Newsletter</h3>
            <p className="text-sm text-muted-foreground">Subscribe for weekly high-impact summaries.</p>
            <div className="flex space-x-2">
              <Input placeholder="Enter email" className="bg-background" />
              <Button size="icon" className="shrink-0"><Mail className="w-4 h-4" /></Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Nexus Intelligence Platform. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="#" className="hover:text-primary">Privacy Policy</Link>
            <Link to="#" className="hover:text-primary">Terms of Service</Link>
            <Link to="#" className="hover:text-primary">Security</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}