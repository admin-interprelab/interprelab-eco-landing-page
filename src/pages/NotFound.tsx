/**
 * Optimized NotFound Page
 * Enhanced with better styling and user experience
 */

import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);

    // Track 404 errors for analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        event_category: 'Error',
        event_label: location.pathname,
      });
    }
  }, [location.pathname]);

  return (
    <Layout>
      <section className="py-20 bg-gradient-subtle min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6 text-center">
          <Card className="glass border-border/50 max-w-2xl mx-auto">
            <CardHeader>
              <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                Page Not Found
              </CardTitle>
              <p className="text-xl text-muted-foreground mb-8">
                Oops! The page you're looking for doesn't exist or has been moved.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/">
                  <Button size="lg" className="glass-button">
                    <Home className="w-5 h-5 mr-2" />
                    Return to Home
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={() => window.history.back()}>
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Go Back
                </Button>
              </div>

              <div className="mt-8 pt-8 border-t border-border/50">
                <p className="text-sm text-muted-foreground mb-4">
                  Looking for something specific? Try these popular pages:
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Link to="/interprebot">
                    <Button variant="ghost" size="sm">InterpreBot</Button>
                  </Link>
                  <Link to="/interprecoach">
                    <Button variant="ghost" size="sm">InterpreCoach</Button>
                  </Link>
                  <Link to="/interprestudy">
                    <Button variant="ghost" size="sm">InterpreStudy</Button>
                  </Link>
                  <Link to="/contact">
                    <Button variant="ghost" size="sm">Contact</Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;
