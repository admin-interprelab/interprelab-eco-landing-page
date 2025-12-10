import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Chrome, Zap, Shield, Globe, Download, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { PainPointBadge } from "@/components/PainPointBadge";
import { GetStartedSteps } from "@/components/GetStartedSteps";
import { MissionCollaborationCTA } from "@/components/MissionCollaborationCTA";
import { FeatureGrid } from "@/components/FeatureGrid";
import SignDetection from "@/components/SignDetection";

const InterpreCoach = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <PainPointBadge painPoint="Addressing Pain Points #4 & #5: Real-Time Support & Psychological Relief" />
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
                  src="/interpre-hub-mockup.png"
                  alt="InterpreCoach Extension Preview"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <FeatureGrid
        title="Key Features"
        subtitle="Seamless browser integration for real-time assistance during video calls."
        features={[
          {
            icon: Zap,
            title: "Real-time Assistance",
            description: "Get instant terminology suggestions, context clues, and cultural references while you interpret.",
          },
          {
            icon: Globe,
            title: "Multi-language Support",
            description: "Support for 50+ language pairs with specialized terminology databases for medical, legal, and technical fields.",
          },
          {
            icon: Shield,
            title: "Privacy Secured",
            description: "HIPAA-compliant with end-to-end encryption. Your sessions remain completely confidential and secure.",
          },
          {
            icon: Star,
            title: "Performance Analytics",
            description: "Track your improvement with detailed session analytics and personalized feedback reports.",
          },
          {
            icon: Download,
            title: "Offline Capability",
            description: "Access core features even without internet connection for uninterrupted interpretation sessions.",
          },
          {
            icon: Chrome,
            title: "Easy Integration",
            description: "Works with popular video conferencing platforms and interpretation management systems.",
          },
        ]}
      />

      {/* Pose Estimation Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Real-Time Pose Estimation</h2>
          <p className="text-muted-foreground mb-8">
            Experience the power of our AI-driven pose estimation.
            <br />
            Enable your camera to see real-time pose estimation in action.
          </p>
          <div className="flex justify-center">
            <Card className="w-full max-w-2xl glass">
              <CardContent className="p-6">
                <SignDetection onSignDetected={(sign) => console.log('Detected sign:', sign)} />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Timeline */}
      <GetStartedSteps
        title="Get Started in 3 Steps"
        subtitle="Your path to real-time interpretation assistance"
        steps={[
          {
            showIcon: true,
            icon: Chrome,
            title: "Install Extension",
            description: "Add InterpreCoach to Chrome from the Web Store. One-click installation, no complex setup required.",
            buttonText: "Add to Chrome",
            buttonAction: () => console.log("Add to Chrome"),
            content: (
              <Button className="glass-button">
                <Chrome className="w-4 h-4 mr-2" />
                Add to Chrome
              </Button>
            ),
          },
          {
            icon: Star,
            title: "Configure Your Profile",
            description: "Set your language pairs, specialty areas, and preferences for personalized coaching suggestions.",
            content: (
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
            ),
          },
          {
            showIcon: true,
            icon: Zap,
            title: "Start Your Session",
            description: "Join a video call and activate InterpreCoach. Get instant terminology support and cultural context suggestions.",
            content: (
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
            ),
          },
        ]}
        finalCTAText="Get InterpreCoach"
        finalCTAIcon={Chrome}
        finalCTAAction={() => console.log("Get InterpreCoach")}
      />

      {/* Mission & Collaboration CTA */}
      <MissionCollaborationCTA
        title="We're In This Together"
        description="InterpreLab isn't a corporate solution—it's a lifeline built by working professionals who understand the psychological toll, the isolation, and the pressure of live interpretation. We're passionate about helping vulnerable populations and reducing the burden on interpreters. But we need your voice, your connections, and your collaboration to reach more interpreters who need support."
        primaryButtonText="Partner With Us"
        secondaryButtonText="Connect on InterpreLink"
        footerText="Let's broaden our reach together. Get in touch to discuss partnerships, collaboration opportunities, or share feedback from the field."
      />
    </Layout>
  );
};

export default InterpreCoach;
