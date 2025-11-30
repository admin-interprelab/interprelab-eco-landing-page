import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Link, Bot, BarChart, UserCheck } from 'lucide-react';

const features = [
  {
    icon: <BookOpen className="h-12 w-12 text-primary" />,
    title: 'InterpreStudy',
    description: 'Master new terminology with our spaced repetition learning tool.',
  },
  {
    icon: <Link className="h-12 w-12 text-primary" />,
    title: 'InterpreLinks',
    description: 'Connect with your peers to share experiences and build your professional network.',
  },
  {
    icon: <Bot className="h-12 w-12 text-primary" />,
    title: 'InterpreBot',
    description: 'Practice your skills in a low-pressure environment with our AI-powered chatbot.',
  },
  {
    icon: <BarChart className="h-12 w-12 text-primary" />,
    title: 'Language Assessment',
    description: 'Assess your language skills and identify areas for improvement.',
  },
  {
    icon: <UserCheck className="h-12 w-12 text-primary" />,
    title: 'InterpreCoach',
    description: 'Get personalized feedback on your performance with our AI-powered coaching tool. InterpreCoach uses AI to analyze recordings of interpreting sessions and provides feedback on a variety of factors, such as accuracy, fluency, and terminology. This is a huge step forward from the current industry standard of once-every-six-months human overview, which does not in any way resemble an interpreter\'s true overall score.',
  },
];

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center">
          Everything You Need to Succeed
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center">
          Interprelab is a comprehensive suite of tools that helps interpreters to be more accurate, efficient, and confident.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 mx-auto">
                  {feature.icon}
                </div>
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle>{feature.title}</CardTitle>
                <p className="mt-2 text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
