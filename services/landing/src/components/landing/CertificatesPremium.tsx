import { Badge } from "@/lib/ui";
import { Button } from "@/lib/ui";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/lib/ui";
import { Check, Crown, Award, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { pricingTiers, certificationCourse } from "@/data/pricing";

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
                    {pricingTiers.map((tier, index) => {
                        const staggerClass = ['stagger-1', 'stagger-2', 'stagger-3'][index] || 'stagger-1';
                        const isPopular = tier.variant === 'popular';
                        const isEnterprise = tier.variant === 'enterprise';

                        return (
                            <Card 
                                key={tier.id}
                                className={`glass transition-all duration-300 animate-fade-in-up ${staggerClass} flex flex-col relative overflow-hidden
                                    ${isPopular 
                                        ? 'border-2 border-nobel-gold shadow-glow hover:shadow-[0_0_40px_rgba(197,160,89,0.4)] transform scale-105 z-10' 
                                        : 'border-border hover:border-nobel-gold/30 shadow-sm hover:shadow-md'
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute top-0 right-0 p-1 bg-nobel-gold text-white text-xs font-bold px-3 rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}
                                <CardHeader>
                                    {isPopular && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <Crown className="w-5 h-5 text-nobel-gold fill-nobel-gold" />
                                            <span className="text-sm font-bold text-nobel-gold tracking-wider uppercase">Professional</span>
                                        </div>
                                    )}
                                    <CardTitle className={`font-serif text-2xl font-semibold text-foreground ${isPopular ? 'text-3xl font-bold' : ''}`}>
                                        {tier.name}
                                    </CardTitle>
                                    <CardDescription className="text-base text-muted-foreground">{tier.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4 flex-grow">
                                     <div className="mt-2 mb-6 pb-6 border-b border-border/50">
                                        <span className={`font-bold text-foreground ${isPopular ? 'text-5xl' : 'text-4xl'}`}>{tier.price}</span>
                                        <span className="text-sm text-muted-foreground ml-2">{tier.period}</span>
                                    </div>
                                    <ul className="space-y-3">
                                        {tier.features.map((item, i) => (
                                            <li key={i} className={`flex items-start text-sm ${isPopular ? 'font-medium text-foreground/90' : 'text-muted-foreground'}`}>
                                                {isEnterprise ? (
                                                     <Building2 className="w-4 h-4 mr-3 text-muted-foreground/50 shrink-0 mt-0.5" />
                                                ) : (
                                                    <Check className={`w-4 h-4 mr-3 shrink-0 mt-0.5 ${isPopular ? 'text-nobel-gold' : 'text-muted-foreground/50'}`} />
                                                )}
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Link to={tier.ctaLink} className="w-full">
                                        <Button 
                                            variant={isPopular ? "default" : "outline"}
                                            className={`w-full transition-all duration-300 ${
                                                isPopular 
                                                ? 'bg-gradient-to-r from-nobel-gold to-nobel-gold/80 hover:from-nobel-gold/90 hover:to-nobel-gold/70 text-background border-0 font-bold py-6 text-lg' 
                                                : 'border-border hover:bg-muted font-semibold'
                                            }`}
                                        >
                                            {tier.cta}
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
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
                        <div className="absolute inset-0 z-20 bg-background/60 backdrop-blur-[4px] flex flex-col items-center justify-center transition-all duration-300 group-hover:bg-background/40">
                            <div className="relative mb-6">
                                <div className="absolute inset-0 bg-nobel-gold blur-2xl opacity-20 animate-pulse-glow"></div>
                                <Award className="w-24 h-24 text-nobel-gold drop-shadow-[0_0_15px_rgba(197,160,89,0.5)] fill-nobel-gold/10" />
                                <div className="absolute -bottom-2 -right-2 bg-nobel-gold text-nobel-dark text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20 shadow-sm">
                                    OFFICIAL
                                </div>
                            </div>
                            <Badge className="px-8 py-2 text-lg bg-gradient-to-r from-nobel-gold via-[#D4AF37] to-nobel-gold text-white border-2 border-white/10 shadow-[0_0_20px_rgba(197,160,89,0.3)] mb-4 animate-pulse uppercase tracking-widest font-serif">
                                Coming Late 2025
                            </Badge>
                            <p className="text-foreground font-serif font-medium text-lg tracking-wide bg-background/80 px-6 py-2 rounded-full border border-nobel-gold/30 backdrop-blur-md shadow-sm">
                                Join the Waitlist
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
                                        {certificationCourse.title}
                                    </CardTitle>
                                    <CardDescription className="text-lg text-muted-foreground">{certificationCourse.subtitle}</CardDescription>
                                </CardHeader>
                                <CardContent className="p-0 space-y-4">
                                    <p className="text-muted-foreground leading-relaxed">
                                        {certificationCourse.description}
                                    </p>
                                     <div className="pt-4">
                                        <span className="text-4xl font-bold text-foreground">{certificationCourse.price}</span>
                                        <span className="text-sm text-muted-foreground ml-2">{certificationCourse.paymentType}</span>
                                    </div>
                                </CardContent>
                             </div>

                             <div className="p-6 bg-card/30 rounded-xl border border-border/50">
                                <h4 className="font-medium text-foreground mb-4">Course Curriculum Includes:</h4>
                                <ul className="space-y-3">
                                    {certificationCourse.curriculum.map((item, i) => (
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
