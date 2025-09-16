import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductShowcase } from "@/components/ProductShowcase";
import { Features } from "@/components/Features";
import { ExtensionUI } from "@/components/ExtensionUI";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Hero />
        <ProductShowcase />
        <Features />
      </main>
      <Footer />
      
      {/* Browser Extension Demo - Always visible for demonstration */}
      <ExtensionUI />
    </div>
  );
};

export default Index;
