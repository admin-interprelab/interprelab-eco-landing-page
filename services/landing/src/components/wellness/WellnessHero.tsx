import React from 'react';
import { PainPointBadge } from '@/components/PainPointBadge';

export const WellnessHero: React.FC = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-black/60" />
      <div className="max-w-4xl mx-auto relative z-10">
        <PainPointBadge 
          painPoint="Addressing Pain Point #5: Psychological Toll & Lack of Support"
          className="mb-4 bg-primary/10 text-primary border-primary/20"
        />
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Interpre-Wellness
        </h1>
        <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
          We understand the weight you carry. The emotional toll of absorbing trauma, speaking in first person, feeling isolated after difficult calls—we've been there. Interpre-Wellness is your compassionate companion, a safe space to process, reflect, and heal.
        </p>
        <div className="glass p-6 rounded-lg mb-8">
          <p className="text-sm text-muted-foreground">
            💙 <strong>Built from lived experience:</strong> As working interpreters, we know the psychological demands of this work. You verbally embody patients' pain and fear. You deserve support that understands the unique nature of medical interpreting.
          </p>
        </div>
      </div>
    </section>
  );
};
