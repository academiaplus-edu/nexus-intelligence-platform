import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_PRICING } from '@shared/mock-data';
import { cn } from '@/lib/utils';
export function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-16 md:py-24 lg:py-28">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-display tracking-tight">Plans & Pricing</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Choose the tier that fits your institutional or individual research needs. Unlock the full potential of Nexus Intelligence today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-stretch">
          {MOCK_PRICING.map((tier) => (
            <Card
              key={tier.id}
              className={cn(
                "relative flex flex-col h-full transition-all duration-500 rounded-[2.5rem] overflow-visible border-slate-200 dark:border-slate-800",
                tier.isPopular 
                  ? "border-primary/50 shadow-2xl scale-105 z-10 bg-slate-50/50 dark:bg-slate-900/50 ring-1 ring-primary/20" 
                  : "hover:shadow-xl hover:translate-y-[-4px]"
              )}
            >
              {tier.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 shadow-lg">
                  <Badge className="bg-primary text-primary-foreground uppercase text-xs px-5 py-1.5 font-bold rounded-full border-4 border-white dark:border-slate-900">
                    Industry Standard
                  </Badge>
                </div>
              )}
              <CardHeader className="space-y-4 text-center pb-10 pt-10">
                <CardTitle className="text-3xl font-bold">{tier.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground font-medium">/mo</span>}
                </div>
                <p className="text-muted-foreground font-medium px-4">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-5 border-t border-slate-100 dark:border-slate-800 pt-10 px-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 bg-teal-100 dark:bg-teal-900/30 p-1 rounded-full">
                      <Check className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 shrink-0" />
                    </div>
                    <span className="text-base font-medium text-slate-700 dark:text-slate-300">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-10 pb-10 px-8">
                <Button
                  size="lg"
                  className={cn(
                    "w-full h-14 rounded-2xl text-lg font-bold shadow-lg transition-transform active:scale-95", 
                    tier.isPopular 
                      ? "bg-primary text-primary-foreground shadow-primary/20" 
                      : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                  )}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-32 pt-16 border-t border-slate-100 dark:border-slate-800 text-center">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 text-primary font-bold text-lg bg-primary/5 px-6 py-2 rounded-full border border-primary/10">
              <ShieldCheck className="w-6 h-6" /> Secured by Enterprise-grade Infrastructure
            </div>
            <p className="text-muted-foreground max-w-2xl leading-relaxed text-lg">
              All plans include SSL encryption, multi-factor authentication, and GDPR-compliant data handling. Academic pricing requires valid institutional .edu verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}