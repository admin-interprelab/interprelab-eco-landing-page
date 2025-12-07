import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, Star, Crown, Award } from "lucide-react";
import { Link } from "react-router-dom";

export const CertificatesPremium = () => {
    return (
        <section className="py-24 px-6 relative" id="certificates">
            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4 animate-fade-in">
                    <Badge variant="outline" className="px-4 py-2 border-primary/50 text-primary">
                        Elevate Your Career
                    </Badge>
                    <h2 className="text-4xl md:text-5xl font-bold">
                        <span className="text-foreground">Certification &</span> <span className="text-primary">Premium Access</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Get accredited training and unlock advanced AI tools to accelerate your professional growth.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* Certification Course */}
                    <Card className="glass relative overflow-hidden border-border/30 hover:border-primary/50 transition-all shadow-lg hover:shadow-xl group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Award className="w-32 h-32 text-primary" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center text-foreground">
                                <Award className="w-6 h-6 mr-3 text-primary" />
                                40-60hr Medical Course
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">NBCMI & CCHI Approved Prerequisite</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                {[
                                    "Comprehensive Medical Terminology",
                                    "Standards of Practice & Ethics",
                                    "Role-Play & Video Scenarios",
                                    "Final Exam & Certificate",
                                    "Lifetime Access to Material"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-foreground/80">
                                        <Check className="w-4 h-4 mr-3 text-success shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-border/50">
                                <span className="text-3xl font-bold text-foreground">$499</span>
                                <span className="text-sm text-muted-foreground ml-2">one-time payment</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                                Enroll Now
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Premium Membership */}
                    <Card className="glass relative overflow-hidden border-warning/30 hover:border-warning/50 transition-all shadow-lg hover:shadow-xl">
                        <div className="absolute top-4 right-4 animate-pulse">
                            <Crown className="w-8 h-8 text-warning" />
                        </div>
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold flex items-center text-foreground">
                                <Star className="w-6 h-6 mr-3 text-warning fill-warning" />
                                InterpreLab Premium
                            </CardTitle>
                            <CardDescription className="text-base text-muted-foreground">All-Access Pass to AI Tools</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                {[
                                    "Unlimited AI Assessments (Bot)",
                                    "InterpreCoach Pro Extension",
                                    "Advanced Analytics Dashboard",
                                    "Priority Job Board Access",
                                    "Weekly Live Group Practice"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center text-sm text-foreground/80">
                                        <Check className="w-4 h-4 mr-3 text-warning shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6 pt-6 border-t border-border/50">
                                <span className="text-3xl font-bold text-foreground">$29</span>
                                <span className="text-sm text-muted-foreground ml-2">/ month</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Link to="/waitlist" className="w-full">
                                <Button className="w-full bg-gradient-to-r from-warning to-orange-500 hover:opacity-90 text-black border-0 font-bold">
                                    Start Free Trial
                                </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    );
};
