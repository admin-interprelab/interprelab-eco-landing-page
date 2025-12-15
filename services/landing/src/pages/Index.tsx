import { Navigation, Footer } from '@/lib/ui';
import { Hero } from '@/components/landing/Hero';
import { StoryDrivenVideoHero } from '@/components/landing/StoryDrivenVideoHero';
import { ProductShowcase } from '@/components/landing/ProductShowcase';
import { CertificatesPremium } from '@/components/landing/CertificatesPremium';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/FAQ';
import {
  ArrowRight,
  Heart,
  TrendingUp,
  Shield,
  Clock,
  AlertTriangle,
  DollarSign,
  FileX,
} from 'lucide-react';
import { painPointStories } from '@/data/painPoints';

const Index = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        {/* 1. Hero Section - First */}
        <Hero />

        {/* 2. Pain Point Stories - After Hero */}
        <div className="scroll-snap-container">
          {painPointStories.map((story, index) => (
            <StoryDrivenVideoHero key={story.id} {...story} index={index} />
          ))}
        </div>

        {/* 3. Product Showcase - After Pain Points (Solutions) */}
        <ProductShowcase />

        {/* 4. Certificates & Premium - After Product Showcase */}
        <CertificatesPremium />

        {/* 5. Testimonials - After Certificates (Social Proof) */}
        <Testimonials />

        {/* 6. FAQ Section - Near End Before Footer */}
        <FAQ />

      </main>

      <Footer />
    </div>
  );
};

export default Index;
