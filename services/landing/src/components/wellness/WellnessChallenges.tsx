import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/lib/ui/components/ui/card';
import { Heart, MessageCircle, Users } from 'lucide-react';

const wellbeingTopics = [
  {
    icon: Heart,
    title: "Compassion Fatigue",
    description: "The emotional and physical exhaustion from deep empathy for suffering patients."
  },
  {
    icon: MessageCircle,
    title: "Vicarious Trauma",
    description: "A cognitive shift from empathic engagement with trauma survivors, intensified by first-person narration."
  },
  {
    icon: Users,
    title: "Burnout Prevention",
    description: "Managing the exhaustion from high-stakes interactions and cognitive load of simultaneous interpretation."
  }
];

export const WellnessChallenges: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">We Understand What You Face</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {wellbeingTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <topic.icon className="h-10 w-10 text-primary mb-3" />
                <CardTitle>{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{topic.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
