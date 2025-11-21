import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-interprelab.jpg';

export function Hero() {
  return (
    <section className="relative">
      <img
        src={heroImage}
        alt="Interprelab hero image"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative bg-background bg-opacity-75">
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-primary">
              Interprelab: The Future of Interpretation
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Empowering interpreters with the tools they need to succeed in a demanding and ever-changing industry.
            </p>
            <div className="mt-8">
              <Button asChild size="lg">
                <Link to="/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
