import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Menu, Chrome, Shield, Phone, Mail, ArrowRight, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    {
      label: t('solutions'),
      submenu: [
        { label: 'InterpreBot', href: '/interprebot' },
        { label: 'InterpreCoach', href: '/interprecoach' },
        { label: 'InterpreTrack', href: '/interpretrack' },
        { label: 'InterpreStudy', href: '/interprestudy' },
        { label: 'Interpre-Wellness', href: '/interpre-wellness' },
        { label: 'InterpreLink', href: '/interprelink' },
      ]
    },
    { label: t('resources'), href: '/resources' },
    { label: t('about'), href: '/about' },
    { label: t('contact'), href: '/contact' },
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
              item.submenu ? (
                <NavigationMenu key={item.label}>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="text-sm font-medium text-foreground/80 hover:text-foreground bg-transparent">
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-48 gap-2 p-2">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.href}>
                              <Link to={subitem.href}>
                                <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                  <div className="text-sm font-medium leading-none">{subitem.label}</div>
                                </NavigationMenuLink>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <Link to="/settings">
                  <Button variant="ghost" size="sm">
                    Settings
                  </Button>
                </Link>
                <Button onClick={handleSignOut} variant="glass" size="sm">
                  <LogOut className="w-4 h-4 mr-2" />
                  {t('signOut')}
                </Button>
              </>
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
                    {t('signIn')}
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
                  item.submenu ? (
                    <div key={item.label} className="space-y-2">
                      <p className="text-sm font-semibold text-muted-foreground">{item.label}</p>
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          to={subitem.href}
                          className="block text-base font-medium text-foreground hover:text-primary transition-colors pl-4"
                          onClick={() => setIsOpen(false)}
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className="block text-lg font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
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
                      {t('signOut')}
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
                          {t('signIn')}
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
