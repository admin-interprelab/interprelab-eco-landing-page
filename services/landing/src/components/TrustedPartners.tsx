import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

export const TrustedPartners = () => {
  const partners = [
    {
      name: "Google Cloud",
      logo: "https://placehold.co/200x80/e8eaed/1f1f1f?text=Google+Cloud&font=roboto",
    },
    {
      name: "AWS",
      logo: "https://placehold.co/200x80/e8eaed/1f1f1f?text=AWS&font=roboto",
    },
    {
      name: "Microsoft Azure",
      logo: "https://placehold.co/200x80/e8eaed/1f1f1f?text=Microsoft&font=roboto",
    },
    {
      name: "OpenAI",
      logo: "https://placehold.co/200x80/e8eaed/1f1f1f?text=OpenAI&font=roboto",
    },
  ];

  return (
    <section className="py-12 px-6 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-display font-semibold text-muted-foreground mb-2">
            Backed by Industry Leaders
          </h3>
          <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto">
            Powered by cutting-edge technology from trusted platforms
          </p>
        </div>

        {/* Partner Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="glass p-4 rounded-lg flex items-center justify-center hover:bg-background/50 transition-all duration-300"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-full max-w-[140px] h-auto opacity-50 hover:opacity-70 transition-opacity"
              />
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Badge variant="outline" className="px-3 py-1.5 text-xs">
            <Shield className="w-3 h-3 mr-1.5" />
            HIPAA Compliant
          </Badge>
          <Badge variant="outline" className="px-3 py-1.5 text-xs">
            <Shield className="w-3 h-3 mr-1.5" />
            SOC 2 Certified
          </Badge>
          <Badge variant="outline" className="px-3 py-1.5 text-xs">
            <Shield className="w-3 h-3 mr-1.5" />
            ISO 27001
          </Badge>
          <Badge variant="outline" className="px-3 py-1.5 text-xs">
            <Shield className="w-3 h-3 mr-1.5" />
            GDPR Ready
          </Badge>
        </div>
      </div>
    </section>
  );
};
