import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui";
import { coreValues } from "@/data/about";

export const CoreValues = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Core Values</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
            What Drives Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These principles guide every decision we make and every product we build.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <Card 
              key={index} 
              className="glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 text-center animate-fade-in-up"
              style={{ animationDelay: value.delay }}
            >
              <CardHeader>
                <div className="w-16 h-16 bg-nobel-gold/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-nobel-gold/20">
                  <value.icon className="w-8 h-8 text-nobel-gold" />
                </div>
                <CardTitle className="font-serif text-xl text-foreground">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
