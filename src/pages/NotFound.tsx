/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 selection:bg-nobel-gold selection:text-white">
      <div className="glass rounded-2xl p-12 border border-border/50 max-w-2xl w-full text-center animate-fade-in-up">
        <div className="w-24 h-24 bg-nobel-gold/10 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-nobel-gold/20">
          <Search className="w-12 h-12 text-nobel-gold" />
        </div>
        
        <h1 className="font-serif text-8xl md:text-9xl font-bold mb-4 text-nobel-gold">404</h1>
        <h2 className="font-serif text-3xl md:text-4xl mb-6 text-foreground">Page Not Found</h2>
        
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-nobel-gold hover:bg-nobel-gold/90 text-white font-medium px-8">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.history.back()}
            className="border-nobel-gold/50 text-foreground hover:bg-nobel-gold/10 px-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </Button>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            Lost? <Link to="/contact" className="text-nobel-gold hover:underline">Contact us</Link> for help.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
