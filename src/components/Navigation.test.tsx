import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './Navigation';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';

// Mock the context providers to avoid complex setup
const MockProviders = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      <LanguageProvider>
        {children}
      </LanguageProvider>
    </AuthProvider>
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

  it('Property 1: Navigation Link Consistency - contains "The Interpreter Dilemma" under Resources', async () => {
    // Check if Resources menu item exists
    const resourcesTrigger = screen.getByText(/resources/i);
    expect(resourcesTrigger).toBeInTheDocument();

    // Open the Resources dropdown (simulating hover/click depending on implementation, 
    // Radix UI usually requires a user event or finding it by role)
    // For Radix Navigation Menu, the content might be hidden. 
    // We can try to trigger it or check if the link exists in the DOM (even if hidden initially)
    
    // Note: In some testing environments, Radix UI dropdowns might need specific interactions.
    // We will attempt to click the trigger.
    fireEvent.click(resourcesTrigger);

    // Look for the "The Interpreter Dilemma" link
    // It might be in the document but not visible, or added to the DOM on click.
    const dilemmaLink = await screen.findByText('The Interpreter Dilemma');
    expect(dilemmaLink).toBeInTheDocument();
    
    // Verify the href attribute
    // We need to find the closest 'a' tag.
    const linkElement = dilemmaLink.closest('a');
    expect(linkElement).toHaveAttribute('href', '/dilemma');
  });

  it('validates mobile menu includes new navigation items', () => {
    // Find the mobile menu trigger (hamburger icon) - usually aria-label="Open navigation menu"
    const menuButton = screen.getByLabelText('Open navigation menu');
    expect(menuButton).toBeInTheDocument();
    
    // Click to open mobile menu
    fireEvent.click(menuButton);

    // Check for "The Interpreter Dilemma" in the mobile sheet
    // It should be visible now
    const dilemmaLink = screen.getAllByText('The Interpreter Dilemma');
    // There might be two if the desktop one is still technically in the DOM, 
    // but typically we look for the one in the mobile view. 
    // Since we clicked the mobile menu, let's ensure at least one is visible/present.
    expect(dilemmaLink.length).toBeGreaterThan(0);
    
    // Verify at least one of them points to /dilemma
    const hasCorrectLink = dilemmaLink.some(el => el.closest('a')?.getAttribute('href') === '/dilemma');
    expect(hasCorrectLink).toBe(true);
  });
});
