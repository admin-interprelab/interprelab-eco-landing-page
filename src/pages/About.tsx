import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Target, Award, Heart, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We believe every word matters in interpretation, and our technology reflects this commitment to accuracy."
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Understanding the human element in communication drives everything we build and every decision we make."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Breaking down language barriers to make essential services accessible to everyone, everywhere."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Continuous improvement and innovation in interpretation technology and professional development."
    }
  ];

  const teamMembers = [
    {
      name: "Dr. Maria Rodriguez",
      role: "Founder & CEO",
      background: "Former court interpreter with 15+ years experience, PhD in Applied Linguistics",
      specialization: "AI in Language Processing"
    },
    {
      name: "David Chen",
      role: "CTO",
      background: "Former Google engineer, expert in machine learning and natural language processing",
      specialization: "AI Architecture"
    },
    {
      name: "Sarah Ahmed",
      role: "Head of Clinical Affairs",
      background: "Certified medical interpreter, healthcare administration background",
      specialization: "Healthcare Interpretation"
    },
    {
      name: "Carlos Mendoza",
      role: "Director of Training",
      background: "Conference interpreter, former training director at major interpretation agency",
      specialization: "Professional Development"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Our Story
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                About InterpreLab
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Founded by interpreters, for interpreters. We're on a mission to revolutionize 
                the interpretation industry through innovative AI technology and comprehensive 
                professional development.
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Houston, Texas</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>50+ Team Members</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-2xl p-8 border border-border/50">
                <img
                  src="/src/assets/hero-interprelab.jpg"
                  alt="InterpreLab Team"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card className="glass border-border/50 p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To empower interpreters worldwide with cutting-edge AI technology that enhances 
                  their skills, improves accuracy, and ensures equitable access to essential 
                  services across language barriers.
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-border/50 p-8">
              <CardHeader>
                <CardTitle className="text-2xl mb-4">Our Vision</CardTitle>
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

      {/* Values */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make and every product we build.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-all duration-300 text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Meet Our Leadership Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced interpreters and technology experts working together to 
              advance the interpretation profession.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-xl">{member.name}</CardTitle>
                      <Badge variant="outline">{member.role}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{member.background}</p>
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    {member.specialization}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Interpreters Trained</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Language Pairs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-muted-foreground">Accuracy Improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="glass rounded-2xl p-12 text-center border border-border/50">
            <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an interpreter looking to enhance your skills or an organization 
              seeking interpretation services, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="glass-button">
                  Get in Touch
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/waitlist">
                <Button variant="outline" size="lg">
                  Join the Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;