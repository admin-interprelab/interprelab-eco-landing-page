import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/lib/ui";
import { teamMembers } from "@/data/about";

export const TeamGrid = () => {
  return (
    <section className="py-24 bg-card/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase">Leadership</div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-foreground">
            Meet Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experienced interpreters and technology experts working together to 
            advance the interpretation profession.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <Card 
              key={index} 
              className="glass border-border/50 hover:border-nobel-gold/50 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: member.delay }}
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center border-2 border-nobel-gold/20">
                    <span className="text-white font-bold text-lg font-serif">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <CardTitle className="font-serif text-xl text-foreground">{member.name}</CardTitle>
                    <Badge className="mt-1 bg-nobel-gold/10 text-nobel-gold border-nobel-gold/20">{member.role}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-3 leading-relaxed">{member.background}</p>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {member.specialization}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
