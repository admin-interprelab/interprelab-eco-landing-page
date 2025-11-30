import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Maria Rodriguez',
    title: 'Certified Medical Interpreter',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    testimonial: 'Interprelab has been a game-changer for my career. The tools are intuitive and easy to use, and they\'ve helped me to be more confident and accurate in my work.',
  },
  {
    name: 'David Chen',
    title: 'Court Interpreter',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704e',
    testimonial: 'I\'ve been using Interprelab for a few months now, and I\'m already seeing a huge improvement in my skills. I highly recommend it to any interpreter who wants to take their career to the next level.',
  },
  {
    name: 'Sarah Johnson',
    title: 'Conference Interpreter',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704f',
    testimonial: 'Interprelab is an essential tool for any serious interpreter. It\'s helped me to stay on top of my game and provide the best possible service to my clients.',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center">
          What Our Users Are Saying
        </h2>
        <p className="mt-4 text-lg text-muted-foreground text-center">
          We're proud to have helped interpreters from all over the world to improve their skills and advance their careers.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">"{testimonial.testimonial}"</p>
                <div className="mt-4 flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-primary" fill="currentColor" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
