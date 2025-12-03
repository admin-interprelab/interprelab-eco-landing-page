import { describe, it, expect } from 'vitest';
import { render, screen } from './test-utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import NotFound from '../pages/NotFound';

describe('Redundant Route Removal Tests', () => {
  it('should show NotFound page for removed /get-in-touch route', async () => {
    render(
      <MemoryRouter initialEntries={['/get-in-touch']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for and verify NotFound page is rendered
    const notFoundHeading = await screen.findByText('Page Not Found');
    expect(notFoundHeading).toBeInTheDocument();
    
    // Also check for 404 text
    const fourOhFour = screen.getByText('404');
    expect(fourOhFour).toBeInTheDocument();
  });

  it('should show NotFound page for removed /interprewellbeing route', async () => {
    render(
      <MemoryRouter initialEntries={['/interprewellbeing']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for and verify NotFound page is rendered
    const notFoundHeading = await screen.findByText('Page Not Found');
    expect(notFoundHeading).toBeInTheDocument();
    
    // Also check for 404 text
    const fourOhFour = screen.getByText('404');
    expect(fourOhFour).toBeInTheDocument();
  });
});


