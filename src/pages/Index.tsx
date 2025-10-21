import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Resources } from "@/components/Resources";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ProductShowcase />
        <Resources />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
