import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Ready to Take Your Career to the Next Level?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Sign up for Interprelab today and get started for free. No credit card required.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
