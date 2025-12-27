import React from 'react';
import { CheckCircle2, Users, Lightbulb, Zap, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MOCK_SERVICES } from '@shared/mock-data';
export function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20 lg:py-24">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-display tracking-tight">Services & Consulting</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Nexus Intelligence offers high-impact advisory and professional development services to help your organization lead in complex global markets.
          </p>
        </div>
        <div className="space-y-32">
          {MOCK_SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col lg:items-center gap-12 lg:gap-24 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
            >
              <div className="flex-1 space-y-8 animate-fade-in">
                <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary mb-2 shadow-sm">
                  {service.type === "Consulting" ? <Lightbulb className="w-10 h-10" /> : <Users className="w-10 h-10" />}
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight">{service.title}</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <CheckCircle2 className="w-6 h-6 text-teal-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-lg text-slate-700 dark:text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button size="lg" className="px-10 h-14 text-lg rounded-2xl shadow-xl shadow-primary/10">Request Proposal</Button>
                  <Button size="lg" variant="ghost" className="px-8 h-14 text-lg rounded-2xl group">
                    Learn More <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
              <div className="flex-1">
                <div className="aspect-video lg:aspect-square bg-slate-100 dark:bg-slate-800/50 rounded-[3rem] overflow-hidden relative group border-4 border-white dark:border-slate-800 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-teal-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="flex items-center justify-center h-full">
                    {service.type === "Consulting" ? (
                      <Zap className="w-32 h-32 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
                    ) : (
                      <Users className="w-32 h-32 text-primary/10 group-hover:scale-110 transition-transform duration-700" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <section className="mt-32 p-12 md:p-16 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] -mb-48 -mr-48 rounded-full" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="space-y-6 text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Need bespoke intelligence?</h2>
              <p className="text-slate-400 text-xl max-w-xl leading-relaxed">
                Our senior analysts are available for private institutional engagements and strategic research projects tailored to your requirements.
              </p>
            </div>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 h-16 px-10 text-xl font-bold rounded-2xl shrink-0 shadow-2xl">
              <MessageSquare className="mr-3 w-6 h-6" /> Schedule a Call
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}