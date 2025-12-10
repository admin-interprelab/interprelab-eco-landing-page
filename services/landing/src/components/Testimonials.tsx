import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  const testimonials = [
    {
      name: "Dr. Maria Rodriguez",
      role: "Medical Interpreter",
      location: "Los Angeles, CA",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612e2c5?w=150&h=150&fit=crop&crop=face",
      quote: "InterpreLab transformed my practice. The real-time feedback from InterpreCoach during live sessions has improved my accuracy by 40%. It's like having a mentor always with me.",
      rating: 5,
      specialty: "Medical"
    },
    {
      name: "Carlos Mendez",
      role: "Court Interpreter",
      location: "Miami, FL", 
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The ethics training and cultural context features are game-changers. InterpreBot's analysis helped me identify blind spots I never knew I had.",
      rating: 5,
      specialty: "Legal"
    },
    {
      name: "Sarah Chen",
      role: "Healthcare Interpreter Manager",
      location: "Seattle, WA",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "We've trained over 200 interpreters using InterpreLab. The personalized learning paths and comprehensive analytics have revolutionized our training program.",
      rating: 5,
      specialty: "Training"
    },
    {
      name: "Ahmed Hassan", 
      role: "Freelance Medical Interpreter",
      location: "Houston, TX",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "The multilingual dictionaries and terminology detection saved my career. I can now confidently handle complex medical procedures in three languages.",
      rating: 5,
      specialty: "Medical"
    },
    {
      name: "Lisa Thompson",
      role: "Legal Interpretation Coordinator",
      location: "New York, NY",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face",
      quote: "InterpreLab's compliance features ensure our interpreters meet all legal standards. The HIPAA training module alone is worth the subscription.",
      rating: 5,
      specialty: "Legal"
    },
    {
      name: "Roberto Silva",
      role: "Community Health Interpreter",
      location: "Phoenix, AZ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: "The InterpreterHub community has been incredible. I've connected with interpreters worldwide and landed three new contracts through the platform.",
      rating: 5,
      specialty: "Community"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case 'Medical': return 'bg-gradient-primary';
      case 'Legal': return 'bg-gradient-success';
      case 'Training': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'Community': return 'bg-gradient-to-r from-orange-500 to-red-500';
      default: return 'bg-gradient-primary';
    }
  };

  return (
    <section className="py-32 px-6 relative" ref={ref} aria-labelledby="testimonials-heading">      
      <div className="container mx-auto relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Badge className="glass px-6 py-3 mb-6 border-primary/20">
            Testimonials
          </Badge>
          <h2 id="testimonials-heading" className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Loved by <span className="bg-gradient-primary bg-clip-text text-transparent">Interpreters</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their practice.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="glass border-border/30 hover-lift">
                    <CardContent className="p-8 md:p-12">
                      <div className="space-y-6">
                        {/* Quote */}
                        <div className="relative">
                          <Quote className="w-10 h-10 text-primary/20 absolute -top-4 -left-4" />
                          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed pl-8">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-warning text-xl">★</span>
                          ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                          <Avatar className="w-14 h-14">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-lg font-bold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                          <Badge className="bg-gradient-to-r from-primary/20 to-primary/10 border-primary/30 text-primary">
                            {testimonial.specialty}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex ? 'w-8 bg-primary' : 'w-2 bg-primary/30'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};