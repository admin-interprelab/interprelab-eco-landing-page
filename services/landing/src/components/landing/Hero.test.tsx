import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Hero } from './Hero';

const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Hero Component', () => {
  it('renders the hero section with main headline', () => {
    render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    // Check for main headline text
    expect(screen.getByText(/Master Medical/i)).toBeInTheDocument();
    expect(screen.getByText(/Interpretation/i)).toBeInTheDocument();
  });

  it('renders CTA buttons with correct navigation', () => {
    render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    // Check for "Start Free Trial" button
    const trialButton = screen.getByRole('button', { name: /Start your free trial/i });
    expect(trialButton).toBeInTheDocument();
    expect(trialButton.closest('a')).toHaveAttribute('href', '/waitlist');

    // Check for "Sign In" button
    const signInButton = screen.getByRole('button', { name: /Sign in to your InterpreLab account/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton.closest('a')).toHaveAttribute('href', '/signin');
  });

  it('renders trust indicators with statistics', () => {
    render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    // Check for statistics
    expect(screen.getByLabelText(/50 plus countries/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/10,000 plus interpreters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/98 percent satisfaction rate/i)).toBeInTheDocument();
  });

  it('renders trust badges for compliance', () => {
    render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    // Check for compliance badges
    expect(screen.getByText(/HIPAA Compliant/i)).toBeInTheDocument();
    expect(screen.getByText(/SOC 2 Certified/i)).toBeInTheDocument();
    expect(screen.getByText(/ISO 27001/i)).toBeInTheDocument();
  });

  it('renders AI-Powered Platform badge', () => {
    render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    expect(screen.getByText(/AI-Powered Platform/i)).toBeInTheDocument();
  });

  it('applies glass effects and Nobel gold styling classes', () => {
    const { container } = render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    // Check for glass effect classes
    const glassElements = container.querySelectorAll('.glass');
    expect(glassElements.length).toBeGreaterThan(0);

    // Check for Nobel gold color references
    const nobelGoldElements = container.querySelectorAll('[class*="nobel-gold"]');
    expect(nobelGoldElements.length).toBeGreaterThan(0);
  });

  it('applies staggered fade-in animations', () => {
    const { container } = render(
      <MockProviders>
        <Hero />
      </MockProviders>
    );

    // Check for animation classes
    expect(container.querySelector('.animate-fade-in-up')).toBeInTheDocument();
    expect(container.querySelector('.stagger-1')).toBeInTheDocument();
    expect(container.querySelector('.stagger-2')).toBeInTheDocument();
    expect(container.querySelector('.stagger-3')).toBeInTheDocument();
  });
});

