import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Resources } from "@/components/Resources";
import { Testimonials } from "@/components/Testimonials";
import { InterpreBotUI } from "@/components/ExtensionUI";
import { InterpreCoachButton } from "@/components/InterpreCoachButton";
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
      
      {/* InterpreBot - AI Assessment (First Contact) */}
      <InterpreBotUI />
      
      {/* InterpreCoach Extension Button */}
      <InterpreCoachButton />
    </div>
  );
};

export default Index;
