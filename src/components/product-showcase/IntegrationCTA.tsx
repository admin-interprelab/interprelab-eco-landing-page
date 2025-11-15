import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { INTEGRATION_CTA_DATA } from './constants';

export const IntegrationCTA: React.FC = () => {
  return (
    <div className="text-center mt-16 space-y-6 animate-slide-up">
      <h3 className="text-2xl md:text-3xl font-bold text-white">
        {INTEGRATION_CTA_DATA.title}
      </h3>
      <p className="text-gray-300 max-w-2xl mx-auto">
        {INTEGRATION_CTA_DATA.description}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild size="lg" className="bg-gradient-primary border-0 text-white hover:opacity-90">
          <Link to={INTEGRATION_CTA_DATA.primaryButton.href}>
            <ArrowRight className="w-5 h-5 mr-2" />
            {INTEGRATION_CTA_DATA.primaryButton.text}
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
          <Link to={INTEGRATION_CTA_DATA.secondaryButton.href}>
            {INTEGRATION_CTA_DATA.secondaryButton.text}
          </Link>
        </Button>
      </div>
    </div>
  );
};
