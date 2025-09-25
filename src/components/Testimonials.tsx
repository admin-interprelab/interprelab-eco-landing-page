import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <section className="py-20 px-6 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/assets/tech-background.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95" />
      
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="bg-gradient-primary border-0 text-white px-4 py-2 mb-4">
            Client Success Stories
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Trusted by Professional Interpreters Worldwide
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Hear from interpreters who have transformed their practice with InterpreLab's AI-powered ecosystem.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardContent className="p-8">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-foreground">{testimonial.name}</h4>
                            <p className="text-muted-foreground">{testimonial.role}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                          <Badge className={`${getSpecialtyColor(testimonial.specialty)} border-0 text-white`}>
                            {testimonial.specialty}
                          </Badge>
                        </div>

                        <div className="relative">
                          <Quote className="w-8 h-8 text-primary/30 absolute -top-2 -left-2" />
                          <blockquote className="text-lg text-muted-foreground leading-relaxed pl-6">
                            {testimonial.quote}
                          </blockquote>
                        </div>

                        <div className="flex items-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-lg">★</span>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary' : 'bg-primary/30'
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