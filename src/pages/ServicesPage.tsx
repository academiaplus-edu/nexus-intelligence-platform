import React from 'react';
import { CheckCircle2, Users, Lightbulb, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MOCK_SERVICES } from '@/lib/mock-data';
export function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Services & Consulting</h1>
          <p className="text-lg text-muted-foreground">
            Nexus Intelligence offers high-impact advisory and professional development services to help your organization lead in complex markets.
          </p>
        </div>
        <div className="space-y-24">
          {MOCK_SERVICES.map((service, index) => (
            <div key={service.id} className={`flex flex-col lg:items-center gap-12 lg:gap-20 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <div className="flex-1 space-y-8">
                <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
                  {service.type === "Consulting" ? <Lightbulb className="w-8 h-8" /> : <Users className="w-8 h-8" />}
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">{service.title}</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <Button size="lg" className="px-8">Request Proposal</Button>
                  <Button size="lg" variant="ghost">Learn More <ArrowRight className="ml-2 w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-video lg:aspect-square bg-slate-100 dark:bg-slate-800 rounded-3xl overflow-hidden relative group border">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-teal-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="center h-full">
                    {service.type === "Consulting" ? (
                      <Zap className="w-24 h-24 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <Users className="w-24 h-24 text-primary/20 group-hover:scale-110 transition-transform duration-500" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Support Banner */}
        <section className="mt-32 p-12 rounded-[2.5rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/20 blur-[100px] -mb-32 -mr-32" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold">Need something more custom?</h2>
              <p className="text-slate-400 max-w-md">Our senior analysts are available for private engagements and bespoke research projects.</p>
            </div>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200">
              <MessageSquare className="mr-2 w-5 h-5" /> Schedule a Call
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}