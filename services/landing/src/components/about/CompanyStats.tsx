import React from 'react';

export const CompanyStats = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up">
            <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">10,000+</div>
            <div className="text-muted-foreground">Interpreters Trained</div>
          </div>
          <div className="animate-fade-in-up stagger-1">
            <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">50+</div>
            <div className="text-muted-foreground">Language Pairs</div>
          </div>
          <div className="animate-fade-in-up stagger-2">
            <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">95%</div>
            <div className="text-muted-foreground">Accuracy Improvement</div>
          </div>
          <div className="animate-fade-in-up stagger-3">
            <div className="text-5xl font-bold text-nobel-gold mb-2 font-serif">24/7</div>
            <div className="text-muted-foreground">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};
