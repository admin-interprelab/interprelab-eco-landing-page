import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, Award, TrendingUp } from 'lucide-react';

interface SolutionHeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryAction: {
    text: string;
    href: string;
  };
  secondaryAction?: {
    text: string;
    href: string;
  };
  videoUrl?: string;
  stats?: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
  backgroundImage?: string;
  variant?: 'default' | 'gradient' | 'video';
}

const SolutionHero: React.FC<SolutionHeroProps> = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  videoUrl,
  stats,
  backgroundImage,
  variant = 'default'
}) => {
  const getBackgroundClasses = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800';
      case 'video':
        return 'relative overflow-hidden';
      default:
        return backgroundImage
          ? `bg-cover bg-center bg-no-repeat`
          : 'bg-gradient-to-br from-gray-900 to-gray-800';
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center ${getBackgroundClasses()}`}>
      {/* Background Image */}
      {backgroundImage && variant !== 'video' && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      {/* Video Background */}
      {variant === 'video' && videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Subtitle */}
          <div className="inline-flex items-center px-4 py-2 bg-white bg-opacity-10 backdrop-blur-sm rounded-full border border-white border-opacity-20 mb-6">
            <Star className="h-4 w-4 mr-2 text-yellow-400" />
            <span className="text-sm font-medium">{subtitle}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {title}
          </h1>

          {/* Description */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href={primaryAction.href} className="flex items-center">
                {primaryAction.text}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>

            {secondaryAction && (
              <Button
                size="lg"
                variant="outline"
                className="border-white border-2 text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href={secondaryAction.href} className="flex items-center">
                  <Play className="mr-2 h-5 w-5" />
                  {secondaryAction.text}
                </a>
              </Button>
            )}
          </div>

          {/* Stats */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20"
                >
                  <div className="flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white border-opacity-50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white bg-opacity-50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-400 bg-opacity-20 rounded-full blur-2xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-400 bg-opacity-20 rounded-full blur-xl animate-pulse delay-500" />
    </section>
  );
};

// Example usage components
export const InterpreLabHero = () => (
  <SolutionHero
    title="Transform Your Interpretation Career"
    subtitle="Professional Training Platform"
    description="Master the art of interpretation with our comprehensive training ecosystem. From ethics to advanced terminology, we've got you covered."
    primaryAction={{
      text: "Start Learning",
      href: "/interprestudy"
    }}
    secondaryAction={{
      text: "Watch Demo",
      href: "#video"
    }}
    stats={[
      {
        label: "Active Interpreters",
        value: "10,000+",
        icon: <Users className="h-8 w-8 text-blue-400" />
      },
      {
        label: "Training Modules",
        value: "500+",
        icon: <Award className="h-8 w-8 text-green-400" />
      },
      {
        label: "Success Rate",
        value: "95%",
        icon: <TrendingUp className="h-8 w-8 text-yellow-400" />
      }
    ]}
    variant="gradient"
  />
);

export const InterpreTrackHero = () => (
  <SolutionHero
    title="Track Every Call, Maximize Every Opportunity"
    subtitle="Professional Call Management"
    description="Take control of your interpretation business with advanced call tracking, earnings management, and performance analytics."
    primaryAction={{
      text: "Start Tracking",
      href: "/interpretrack"
    }}
    secondaryAction={{
      text: "View Features",
      href: "#features"
    }}
    backgroundImage="/images/track-hero-bg.jpg"
    variant="default"
  />
);

export default SolutionHero;
