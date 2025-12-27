import React from 'react';
import { Check, Info, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_PRICING } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
export function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Plans & Pricing</h1>
          <p className="text-lg text-muted-foreground">
            Choose the tier that fits your research needs. Unlock the full potential of Nexus Intelligence today.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOCK_PRICING.map((tier) => (
            <Card 
              key={tier.id} 
              className={cn(
                "relative flex flex-col h-full transition-all duration-300 hover:shadow-xl",
                tier.isPopular ? "border-primary ring-2 ring-primary ring-opacity-20 scale-105 z-10 bg-slate-50/30 dark:bg-slate-900/30" : "border-border"
              )}
            >
              {tier.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground uppercase text-[10px] px-3 py-1 font-bold">Most Popular</Badge>
                </div>
              )}
              <CardHeader className="space-y-2 text-center pb-8">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </CardHeader>
              <CardContent className="flex-1 space-y-4 border-t pt-8">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pt-8">
                <Button 
                  className={cn("w-full py-6 text-lg", tier.isPopular ? "bg-primary" : "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700")}
                >
                  {tier.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Trust Footer */}
        <div className="mt-24 pt-12 border-t text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-primary font-semibold">
              <ShieldCheck className="w-6 h-6" /> Secured by Enterprise-grade Infrastructure
            </div>
            <p className="text-sm text-muted-foreground max-w-lg">
              All plans include SSL encryption, role-based access control, and GDPR-compliant data handling. Academic pricing requires valid university verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}