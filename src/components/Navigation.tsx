import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, LogOut, Shield } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AccessibilityControls } from "@/components/accessibility";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { MobileNavigation } from "@/components/navigation/MobileNavigation";
import { BreadcrumbNavigation } from "@/components/navigation/BreadcrumbNavigation";
import { TherapeuticNavigation } from "@/components/navigation/TherapeuticNavigation";
import { megaMenuSections } from "@/data/navigationData";
import { JourneyStage, EmotionalState } from "@/types/navigation";

export const Navigation = () => {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  // Mock journey stage - in real app this would come from user context/API
  const currentJourneyStage: JourneyStage = {
    stage: 'validation',
    progress: 25,
    completedMilestones: ['Acknowledged challenges', 'Explored pain points'],
    nextRecommendedAction: 'Explore AI-powered solutions that address your specific challenges'
  };

  // Mock emotional state - in real app this would be determined by user behavior/input
  const emotionalState: EmotionalState = {
    stressLevel: 'moderate',
    primaryConcerns: [
      {
        type: 'financial',
        severity: 7,
        description: 'Inconsistent income from interpretation work',
        relatedSolutions: ['/premium', '/interpretrack']
      },
      {
        type: 'technological',
        severity: 5,
        description: 'Need better tools for skill assessment',
        relatedSolutions: ['/interprebot', '/interprecoach']
      }
    ],
    supportNeeds: ['professional', 'community'],
    preferredCommunicationStyle: 'encouraging'
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { label: t('resources'), href: '/resources' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">InterpreLab</h1>
                <p className="text-xs text-muted-foreground">Advanced Interpretation</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {/* Solutions Mega Menu */}
              <div
                className="relative"
                onMouseEnter={() => setMegaMenuOpen(true)}
                onMouseLeave={() => setMegaMenuOpen(false)}
              >
                <button className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors py-2">
                  {t('solutions')}
                </button>
                <MegaMenu
                  sections={megaMenuSections}
                  isOpen={megaMenuOpen}
                  onClose={() => setMegaMenuOpen(false)}
                />
              </div>

              {/* Regular Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <AccessibilityControls />
              <ThemeToggle />
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/settings">
                      Settings
                    </Link>
                  </Button>
                  <Button onClick={handleSignOut} variant="glass" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t('signOut')}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="glass" size="sm" className="flex items-center gap-2" asChild>
                    <Link to="/waitlist">
                      Join Waitlist
                    </Link>
                  </Button>
                  <Button variant="hero" size="sm" asChild>
                    <Link to="/signin">
                      <User className="w-4 h-4 mr-2" />
                      {t('signIn')}
                    </Link>
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Navigation */}
            <MobileNavigation
              sections={megaMenuSections}
              user={user}
              onSignOut={handleSignOut}
              t={t}
              stressAware={true}
              crisisSupportEnabled={true}
            />
          </div>
        </div>
      </nav>

      {/* Therapeutic Navigation */}
      <div className="pt-20">
        <TherapeuticNavigation
          user={user}
          currentJourneyStage={currentJourneyStage}
          emotionalState={emotionalState}
          supportResourcesEnabled={true}
        />
      </div>

      {/* Breadcrumb Navigation */}
      <div>
        <BreadcrumbNavigation />
      </div>
    </>
  );
};
