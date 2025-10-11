import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Chrome, Zap, Shield, Globe, Download, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const InterpreCoach = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Chrome Extension
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                InterpreCoach
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Chrome extension providing real-time terminology support and coaching during live interpretation sessions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="glass-button">
                  <Chrome className="w-5 h-5 mr-2" />
                  Meet InterpreCoach
                </Button>
                <Link to="/interprebot">
                  <Button variant="outline" size="lg">
                    Take the Assessment
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="glass rounded-2xl p-8 border border-border/50">
                <img
                  src="/src/assets/extension-preview.jpg"
                  alt="InterpreCoach Extension Preview"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Key Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Seamless browser integration for real-time assistance during video calls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Zap className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Real-time Assistance</CardTitle>
                <CardDescription>
                  Get instant terminology suggestions, context clues, and cultural references 
                  while you interpret.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Globe className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Multi-language Support</CardTitle>
                <CardDescription>
                  Support for 50+ language pairs with specialized terminology 
                  databases for medical, legal, and technical fields.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Privacy Secured</CardTitle>
                <CardDescription>
                  HIPAA-compliant with end-to-end encryption. Your sessions 
                  remain completely confidential and secure.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Star className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>
                  Track your improvement with detailed session analytics and 
                  personalized feedback reports.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Download className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Offline Capability</CardTitle>
                <CardDescription>
                  Access core features even without internet connection for 
                  uninterrupted interpretation sessions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glass border-border/50 hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Chrome className="w-12 h-12 text-primary mb-4" />
                <CardTitle>Easy Integration</CardTitle>
                <CardDescription>
                  Works with popular video conferencing platforms and 
                  interpretation management systems.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Process */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Installing InterpreCoach is quick and easy. Start enhancing your 
              interpretation skills today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Chrome className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Install Extension</h3>
              <p className="text-muted-foreground">
                Download InterpreCoach from the Chrome Web Store with one click.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Account</h3>
              <p className="text-muted-foreground">
                Sign up for your InterpreLab account and complete your professional profile.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Start Coaching</h3>
              <p className="text-muted-foreground">
                Begin your first interpretation session with AI-powered assistance.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="glass-button">
              <Chrome className="w-5 h-5 mr-2" />
              Meet InterpreCoach
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default InterpreCoach;