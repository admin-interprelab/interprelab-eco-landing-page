import { useEffect, useState } from "react";
import { Card, CardContent } from "@interprelab/ui";
import { Badge } from "@interprelab/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@interprelab/ui";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    <section className="py-32 px-6 relative bg-card/50">      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase animate-fade-in-up stagger-1">
            Testimonials
          </div>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground animate-fade-in-up stagger-2">
            Loved by
            <br />
            <span className="text-muted-foreground italic font-normal text-3xl md:text-4xl block mt-4">
              Interpreters
            </span>
          </h2>
          <div className="w-16 h-1 bg-nobel-gold mx-auto animate-fade-in-up stagger-3"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-4">
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
                  <Card className="glass border-border hover:border-nobel-gold/30 transition-all duration-300 hover:shadow-md">
                    <CardContent className="p-8 md:p-12">
                      <div className="space-y-6">
                        {/* Quote */}
                        <div className="relative">
                          <Quote className="w-10 h-10 text-nobel-gold/20 absolute -top-4 -left-4" />
                          <blockquote className="text-lg md:text-xl text-foreground leading-relaxed pl-8 font-light">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-nobel-gold text-xl">★</span>
                          ))}
                        </div>

                        {/* Author */}
                        <div className="flex items-center gap-4 pt-4 border-t border-border/50">
                          <Avatar className="w-14 h-14 ring-2 ring-nobel-gold/20">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-lg font-semibold text-foreground">{testimonial.name}</h4>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                          </div>
                          <Badge className="glass border-nobel-gold/30 text-nobel-gold">
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
                  index === currentIndex ? 'w-8 bg-nobel-gold' : 'w-2 bg-nobel-gold/30'
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
