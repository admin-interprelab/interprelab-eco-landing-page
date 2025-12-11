import { Badge } from "@/lib/ui";
import { Button } from "@/lib/ui";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/lib/ui";
import { Check, Star, Crown, Award, Building2, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const CertificatesPremium = () => {
    return (
        <section className="py-24 px-6 relative bg-card/30 border-y border-border" id="certificates">
            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-block mb-3 text-xs font-bold tracking-widest text-muted-foreground uppercase animate-fade-in-up stagger-1">
                        Elevate Your Career
                    </div>
                    <h2 className="font-serif text-4xl md:text-5xl leading-tight text-foreground animate-fade-in-up stagger-2">
                        Plans & <span className="text-nobel-gold">Pricing</span>
                    </h2>
                    <div className="w-16 h-1 bg-nobel-gold mx-auto animate-fade-in-up stagger-3"></div>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-4">
                        Choose the plan that fits your career stage, from getting started to enterprise-grade management.
                    </p>
                </div>

                {/* Pricing Tiers */}
                <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-24">
                    {/* Free Tier */}
                    <Card className="glass border-border hover:border-nobel-gold/30 transition-all duration-300 shadow-sm hover:shadow-md animate-fade-in-up stagger-1 flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-serif text-2xl font-semibold text-foreground">
                                Free Starter
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">Essential tools for beginners</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                             <div className="mt-2 mb-6 pb-6 border-b border-border/50">
                                <span className="text-4xl font-bold text-foreground">$0</span>
                                <span className="text-sm text-muted-foreground ml-2">/ month</span>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "1 AI Assessment per month (Bot)",
                                    "Basic InterpreCoach (Limited)",
                                    "Community Access (Read-only)",
                                    "Basic Call Tracking (50 calls/mo)",
                                    "Standard Terminology Lookup"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 mr-3 text-muted-foreground/50 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link to="/signin" className="w-full">
                                <Button variant="outline" className="w-full border-border hover:bg-muted font-semibold transition-all duration-300">
                                    Get Started
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Premium Membership - Highlighted */}
                    <Card className="glass border-nobel-gold shadow-glow hover:shadow-[0_0_40px_rgba(197,160,89,0.2)] transition-all duration-300 transform scale-105 z-10 animate-fade-in-up stagger-2 flex flex-col relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-1 bg-nobel-gold text-white text-xs font-bold px-3 rounded-bl-lg">
                            POPULAR
                        </div>
                        <CardHeader>
                             <div className="flex items-center gap-2 mb-2">
                                <Crown className="w-5 h-5 text-nobel-gold fill-nobel-gold" />
                                <span className="text-sm font-bold text-nobel-gold tracking-wider uppercase">Professional</span>
                             </div>
                            <CardTitle className="font-serif text-3xl font-bold text-foreground">
                                InterpreLab Premium
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">All-access pass to AI mastery</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                            <div className="mt-2 mb-6 pb-6 border-b border-border/50">
                                <span className="text-5xl font-bold text-foreground">$29</span>
                                <span className="text-sm text-muted-foreground ml-2">/ month</span>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "Unlimited AI Assessments",
                                    "InterpreCoach Pro Extension",
                                    "Advanced Analytics Dashboard",
                                    "Priority Job Board Access",
                                    "Weekly Live Group Practice",
                                    "Full InterpreLink Access",
                                    "Unlimited Call Tracking"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start text-sm font-medium text-foreground/90">
                                        <Check className="w-4 h-4 mr-3 text-nobel-gold shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link to="/waitlist" className="w-full">
                                <Button className="w-full bg-gradient-to-r from-nobel-gold to-nobel-gold/80 hover:from-nobel-gold/90 hover:to-nobel-gold/70 text-background border-0 font-bold transition-all duration-300 py-6 text-lg">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Tier */}
                    <Card className="glass border-border hover:border-nobel-gold/30 transition-all duration-300 shadow-sm hover:shadow-md animate-fade-in-up stagger-3 flex flex-col">
                        <CardHeader>
                            <CardTitle className="font-serif text-2xl font-semibold text-foreground">
                                Enterprise
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">For LSCs & Healthcare Orgs</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 flex-grow">
                             <div className="mt-2 mb-6 pb-6 border-b border-border/50">
                                <span className="text-3xl font-bold text-foreground">Custom</span>
                                <span className="text-sm text-muted-foreground ml-2">pricing</span>
                            </div>
                            <ul className="space-y-3">
                                {[
                                    "All Premium Features",
                                    "Admin & Manager Dashboard",
                                    "Bulk License Management",
                                    "Custom Vocabulary Sets",
                                    "API Access for Integrations",
                                    "Dedicated Success Manager",
                                    "SLA & Priority Support"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start text-sm text-muted-foreground">
                                        <Building2 className="w-4 h-4 mr-3 text-muted-foreground/50 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Link to="/contact" className="w-full">
                                <Button variant="outline" className="w-full border-border hover:bg-muted font-semibold transition-all duration-300">
                                    Contact Sales
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>

                {/* Certificate Course Section (Moved Below) */}
                <div className="max-w-4xl mx-auto">
                     <div className="text-center mb-10">
                        <h3 className="font-serif text-3xl font-medium text-foreground mb-4">
                            Accredited Certification
                        </h3>
                        <p className="text-muted-foreground">
                            Separate from our subscription plans, enroll in our comprehensive course to jumpstart your career.
                        </p>
                    </div>
                    
                    {/* Certification Course Card */}
                    <Card className="glass border-border hover:border-nobel-gold/50 transition-all duration-300 shadow-lg hover:shadow-xl group animate-fade-in-up stagger-4 relative overflow-hidden">
                        {/* Coming Soon Overlay */}
                        <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[2px] flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-background/40">
                            <Badge className="px-8 py-3 text-lg bg-nobel-gold text-white border-none shadow-glow mb-4 animate-pulse">
                                Coming Soon
                            </Badge>
                            <p className="text-foreground font-serif font-medium text-lg tracking-wide bg-background/50 px-4 py-1 rounded-full backdrop-blur-md">
                                Enrollment Opens Fall 2025
                            </p>
                        </div>

                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award className="w-48 h-48 text-nobel-gold" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 p-2">
                             <div className="p-6">
                                <CardHeader className="p-0 mb-6">
                                    <CardTitle className="font-serif text-3xl font-semibold flex items-center text-foreground mb-2">
                                        <Award className="w-8 h-8 mr-3 text-nobel-gold" />
                                        40-60hr Medical Course
                                    </CardTitle>
                                    <CardDescription className="text-lg text-muted-foreground">NBCMI & CCHI Approved Prerequisite</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">
                                        A complete, self-paced training program designed to meet all national certification prerequisites. Includes role-plays, ethics, and terminology.
                                    </p>
                                     <div className="pt-4">
                                        <span className="text-4xl font-bold text-foreground">$499</span>
                                        <span className="text-sm text-muted-foreground ml-2">one-time payment</span>
                                    </div>
                                </CardContent>
                             </div>

                             <div className="p-6 bg-card/30 rounded-xl border border-border/50">
                                <h4 className="font-medium text-foreground mb-4">Course Curriculum Includes:</h4>
                                <ul className="space-y-3">
                                    {[
                                        "Comprehensive Medical Terminology (Body Systems)",
                                        "Standards of Practice & Code of Ethics",
                                        "Interactive Role-Play & Video Scenarios",
                                        "Final Proctored Exam & Digital Certificate",
                                        "Lifetime Access to Course Material",
                                        "Bonus: 3 Months of InterpreLab Premium"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center text-sm text-muted-foreground">
                                            <Check className="w-4 h-4 mr-3 text-nobel-gold shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-8">
                                     <Button disabled className="w-full bg-muted text-muted-foreground cursor-not-allowed border-0 font-semibold opacity-50">
                                        Enrollment Closed
                                    </Button>
                                </div>
                             </div>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
};
