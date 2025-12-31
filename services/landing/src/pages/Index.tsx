import { Navigation, Footer } from '@/lib/ui';
import { Hero } from '@/components/landing/Hero';
import { StoryDrivenVideoHero } from '@/components/landing/StoryDrivenVideoHero';
import { ProductShowcase } from '@/components/landing/ProductShowcase';
import { CertificatesPremium } from '@/components/landing/CertificatesPremium';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/FAQ';
import { Helmet } from 'react-helmet-async';
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
      <Helmet>
        <title>Medical Interpreter Training & AI Tools | InterpreLab</title>
        <meta 
          name="description" 
          content="Master medical interpretation with AI-powered skills assessment, real-time terminology coaching, and automated call tracking. Build confidence, reduce stress, and protect your earnings." 
        />
        <meta name="keywords" content="medical interpreter training, AI interpreter tools, medical interpretation certification, interpreter skills assessment, real-time interpreter assistance, healthcare interpreter, legal interpreter" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://interprelab.com/" />
        <meta property="og:title" content="InterpreLab - AI-Powered Medical Interpreter Training" />
        <meta property="og:description" content="Build confidence, reduce stress, and protect your earnings with AI tools designed by interpreters, for interpreters." />
        <meta property="og:image" content="https://interprelab.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://interprelab.com/" />
        <meta property="twitter:title" content="InterpreLab - AI-Powered Medical Interpreter Training" />
        <meta property="twitter:description" content="Build confidence, reduce stress, and protect your earnings with AI tools designed by interpreters, for interpreters." />
        <meta property="twitter:image" content="https://interprelab.com/og-image.jpg" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://interprelab.com/" />
      </Helmet>

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
    </div>
  );
};

export default Index;
