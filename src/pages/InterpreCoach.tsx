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
                Addressing Pain Points #4 & #5: Real-Time Support & Psychological Relief
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
                InterpreCoach
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                We know the cognitive overload of live sessions—searching for terminology while maintaining accuracy, the isolation of working alone with no backup. InterpreCoach is your AI companion during calls, reducing stress and providing the support system that's been missing from our profession.
              </p>
              <div className="glass p-4 rounded-lg mb-6">
                <p className="text-sm text-muted-foreground">
                  💙 <strong>Built by interpreters, for interpreters.</strong> We've felt the strain of high-stakes calls with no safety net. This extension lightens your cognitive load so you can focus on what matters: delivering compassionate, accurate interpretation.
                </p>
              </div>
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

      {/* Getting Started Timeline */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Get Started in 3 Steps
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your path to real-time interpretation assistance
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Chrome className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Download className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Install Extension</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Add InterpreCoach to Chrome from the Web Store. One-click installation, no complex setup required.
                  </p>
                  <Button className="glass-button">
                    <Chrome className="w-4 h-4 mr-2" />
                    Add to Chrome
                  </Button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Configure Your Profile</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Set your language pairs, specialty areas, and preferences for personalized coaching suggestions.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 glass rounded-lg">
                      <p className="text-sm font-semibold mb-1">Language Pairs</p>
                      <p className="text-xs text-muted-foreground">EN ↔ ES, EN ↔ FR</p>
                    </div>
                    <div className="p-4 glass rounded-lg">
                      <p className="text-sm font-semibold mb-1">Specialty</p>
                      <p className="text-xs text-muted-foreground">Medical, Legal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-8 items-start">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-semibold">Start Your Session</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Join a video call and activate InterpreCoach. Get instant terminology support and cultural context suggestions.
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">Click the extension icon</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">Activate coaching mode</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-sm">Get real-time assistance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="glass-button">
              <Chrome className="w-5 h-5 mr-2" />
              Get InterpreCoach
            </Button>
          </div>
        </div>
      </section>

      {/* Mission & Collaboration CTA */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="glass border-primary/20 max-w-4xl mx-auto">
            <CardContent className="p-8 md:p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">We're In This Together</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                InterpreLab isn't a corporate solution—it's a lifeline built by working professionals who understand the psychological toll, the isolation, and the pressure of live interpretation. We're passionate about helping vulnerable populations and reducing the burden on interpreters. But we need your voice, your connections, and your collaboration to reach more interpreters who need support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/contact">
                  <Button size="lg" variant="hero">
                    Partner With Us
                  </Button>
                </Link>
                <Link to="/interprelink">
                  <Button size="lg" variant="glass">
                    Connect on InterpreLink
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-muted-foreground">
                Let's broaden our reach together. Get in touch to discuss partnerships, collaboration opportunities, or share feedback from the field.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default InterpreCoach;
