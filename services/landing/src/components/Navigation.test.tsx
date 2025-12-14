import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';

// Mock the auth context
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    signOut: vi.fn(),
  }),
}));

// Mock the language context
vi.mock('@/contexts/LanguageContext', () => ({
  useLanguage: () => ({
    t: (key: string) => key, // Simple mock that returns the key
  }),
}));

// Mock the context providers to avoid complex setup
const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

describe('Navigation Component', () => {
  beforeEach(() => {
    render(
      <MockProviders>
        <Navigation />
      </MockProviders>
    );
  });

  it('contains InterpreStudy link in Solutions dropdown', async () => {
    // Check if Solutions menu item exists
    const solutionsTrigger = screen.getByText(/solutions/i);
    expect(solutionsTrigger).toBeInTheDocument();

    // Open the Solutions dropdown
    fireEvent.click(solutionsTrigger);

    // Look for the "InterpreStudy" link
    const interpreStudyLink = await screen.findByText('InterpreStudy');
    expect(interpreStudyLink).toBeInTheDocument();

    // Verify the href attribute
    const linkElement = interpreStudyLink.closest('a');
    expect(linkElement).toHaveAttribute('href', '/interprestudy');
  });

  it('validates mobile menu includes InterpreStudy navigation item', () => {
    // Find the mobile menu trigger (hamburger icon)
    const menuButton = screen.getByRole('button', { name: /menu/i });
    expect(menuButton).toBeInTheDocument();

    // Click to open mobile menu
    fireEvent.click(menuButton);

    // Check for "InterpreStudy" in the mobile sheet
    const interpreStudyLink = screen.getByText('InterpreStudy');
    expect(interpreStudyLink).toBeInTheDocument();

    // Verify it points to /interprestudy
    const linkElement = interpreStudyLink.closest('a');
    expect(linkElement).toHaveAttribute('href', '/interprestudy');
  });

  it('renders all expected navigation items', () => {
    // Check for main navigation items
    expect(screen.getByText(/solutions/i)).toBeInTheDocument();
    expect(screen.getByText(/resources/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  it('renders CTA buttons correctly', () => {
    // Check for Join Waitlist button
    expect(screen.getByText(/join waitlist/i)).toBeInTheDocument();

    // Check for Sign In button
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});
