import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/lib/ui";

export const MissionVision = () => {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <Card className="glass border-border/50 p-8 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="font-serif text-3xl mb-4 text-foreground">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower interpreters worldwide with cutting-edge AI technology that enhances 
                their skills, improves accuracy, and ensures equitable access to essential 
                services across language barriers.
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-border/50 p-8 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up stagger-1">
            <CardHeader>
              <CardTitle className="font-serif text-3xl mb-4 text-foreground">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A world where language is never a barrier to accessing healthcare, justice, 
                education, or any essential service, powered by the perfect collaboration 
                between human expertise and artificial intelligence.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
