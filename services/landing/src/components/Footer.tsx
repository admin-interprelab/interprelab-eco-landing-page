import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Shield,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Linkedin,
  Github,
  Chrome,
  Stethoscope,
  Scale,
  Globe
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border/50 bg-card/50 backdrop-blur-sm snap-start">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-primary rounded-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">InterpreLab</h3>
                <p className="text-xs text-muted-foreground">Advanced Interpretation</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Revolutionizing medical and legal interpretation through advanced AI technology
              while preserving the essential human element in critical communication.
            </p>

            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs">
                <Stethoscope className="w-3 h-3 mr-1" />
                Medical
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Scale className="w-3 h-3 mr-1" />
                Legal
              </Badge>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/interprebot" className="hover:text-foreground transition-colors flex items-center gap-2">
                  InterpreBot
                </Link>
              </li>
              <li>
                <Link to="/interprecoach" className="hover:text-foreground transition-colors flex items-center gap-2">
                  InterpreCoach
                </Link>
              </li>
              <li>
                <Link to="/interprestudy" className="hover:text-foreground transition-colors">
                  InterpreStudy
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="https://www.certifiedmedicalinterpreters.org/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  NBCMI
                </a>
              </li>
              <li>
                <a href="https://cchicertification.org/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                  CCHI
                </a>
              </li>
              <li>
                <Link to="/careers" className="hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Contact</h4>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>admin.ceo@interprelab.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Houston, Texas</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Linkedin className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Github className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-xs text-muted-foreground">
              <span>© 2024 InterpreLab. All rights reserved.</span>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
              <Link to="/security" className="hover:text-foreground transition-colors">Security</Link>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-xs">
                <Shield className="w-3 h-3 mr-1" />
                HIPAA Compliant
              </Badge>
              <Badge variant="outline" className="text-xs">
                SOC 2 Type II
              </Badge>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Globe className="w-3 h-3" />
                <span>50+ Countries</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
