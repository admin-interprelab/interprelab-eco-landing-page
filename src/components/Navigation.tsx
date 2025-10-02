import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Chrome, Shield, Phone, Mail, ArrowRight, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { label: "InterpreBot", href: "/interprebot" },
    { label: "InterpreCoach", href: "/interprecoach" },
    { label: "Interpre-Hub", href: "/interpre-hub" },
    { label: "Resources", href: "/resources" },
    { label: "About Us", href: "/about" },
    { label: "Get in Touch", href: "/contact" }
  ];

  return (
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
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Button onClick={handleSignOut} variant="glass" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            ) : (
              <>
                <Link to="/waitlist">
                  <Button variant="glass" size="sm" className="flex items-center gap-2">
                    Join Waitlist
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button variant="hero" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass">
              <div className="space-y-6 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className="pt-6 space-y-3">
                  {user ? (
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        setIsOpen(false);
                      }}
                      variant="glass"
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  ) : (
                    <>
                      <Link to="/waitlist">
                        <Button variant="glass" className="w-full flex items-center gap-2" onClick={() => setIsOpen(false)}>
                          Join Waitlist
                        </Button>
                      </Link>
                      <Link to="/signin">
                        <Button variant="hero" className="w-full" onClick={() => setIsOpen(false)}>
                          <User className="w-4 h-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                    </>
                  )}
                </div>

                <div className="pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">Contact</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>hello@interprelab.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};