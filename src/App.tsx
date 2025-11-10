import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PremiumProvider } from "@/contexts/PremiumContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { WorkflowOptimizer } from "@/components/performance/WorkflowOptimizer";
import { AccessibilityWrapper } from "@/components/accessibility";
import ErrorBoundary from "@/components/error/ErrorBoundary";

// Initialize performance test runner in development
if (process.env.NODE_ENV === 'development') {
  import('@/utils/testRunner');
}

// Register service worker for offline support
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
import Index from "./pages/Index";
import InterpreBot from "./pages/InterpreBot";
import InterpreCoach from "./pages/InterpreCoach";
import InterpreStudy from "./pages/InterpreStudy";
import InterpreLink from "./pages/InterpreLink";
import Dashboard from "./pages/Dashboard";
import InterpreTrack from "./pages/InterpreTrack";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignIn from "./pages/SignIn";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";
import Careers from "./pages/Careers";
import ContentDiscoveryDemo from "./pages/ContentDiscoveryDemo";
import { PremiumUpgradeModal } from "@/components/premium";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Preload critical resources for interpreter support
    const preloadCriticalResources = async () => {
      try {
        // Preload crisis support data
        if ('caches' in window) {
          const cache = await caches.open('interprelab-critical-v1');

          // Preload critical API endpoints
          const criticalEndpoints = [
            '/api/crisis-support',
            '/api/community/quick-access',
            '/api/support/offline'
          ];

          for (const endpoint of criticalEndpoints) {
            try {
              const response = await fetch(endpoint);
              if (response.ok) {
                await cache.put(endpoint, response.clone());
              }
            } catch (error) {
              console.warn(`Failed to preload ${endpoint}:`, error);
            }
          }
        }
      } catch (error) {
        console.warn('Failed to preload critical resources:', error);
      }
    };

    preloadCriticalResources();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AccessibilityWrapper>
            <AuthProvider>
              <PremiumProvider>
                <TooltipProvider>
                  <WorkflowOptimizer enableOptimizations={true} showInsights={false}>
                    <Toaster />
                    <Sonner />
                    <PremiumUpgradeModal />
                    <BrowserRouter>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/interprebot" element={<InterpreBot />} />
                        <Route path="/interprecoach" element={<InterpreCoach />} />
                        <Route path="/interprestudy" element={<InterpreStudy />} />
                        <Route
                          path="/interprelink"
                          element={
                            <ProtectedRoute>
                              <InterpreLink />
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/dashboard"
                          element={
                            <ProtectedRoute>
                              <Dashboard />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/interpretrack" element={<InterpreTrack />} />
                        <Route
                          path="/settings"
                          element={
                            <ProtectedRoute>
                              <Settings />
                            </ProtectedRoute>
                          }
                        />
                        <Route path="/resources" element={<Resources />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/get-in-touch" element={<Contact />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/waitlist" element={<Waitlist />} />
                        <Route path="/content-discovery-demo" element={<ContentDiscoveryDemo />} />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </BrowserRouter>
                  </WorkflowOptimizer>
                </TooltipProvider>
              </PremiumProvider>
            </AuthProvider>
        </AccessibilityWrapper>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
