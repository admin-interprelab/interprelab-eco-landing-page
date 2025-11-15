import { Badge } from "@/components/ui/badge";
import { ProductCard, BusinessModelSection, IntegrationCTA } from "./product-showcase";
import { PRODUCT_DATA } from "./product-showcase/constants";

export const ProductShowcase = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="container mx-auto relative z-10">
        {/* Header - Simplified */}
        <div className="text-center mb-20 space-y-4 animate-fade-in">
          <Badge className="glass px-6 py-3 border-primary/20">
            Complete Ecosystem
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="text-foreground">Three Tools.</span>
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">One Platform.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {PRODUCT_DATA.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Business Model Section */}
        <BusinessModelSection />

        {/* Integration Call to Action */}
        <IntegrationCTA />
      </div>
    </section>
  );
};