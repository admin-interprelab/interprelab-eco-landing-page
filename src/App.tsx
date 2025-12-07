import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Suspense, lazy } from "react";

// --- 1. STATIC IMPORT (Fastest for Landing Page) ---
// We import this normally because we want it to show up immediately.
import Index from "./pages/Index";

// --- 2. LAZY IMPORTS (Heavy Features) ---
// These are NOT downloaded until the user navigates to the route.
const InterpreBot = lazy(() => import("./pages/InterpreBot"));
const InterpreCoach = lazy(() => import("./pages/InterpreCoach"));
const InterpreStudy = lazy(() => import("./pages/InterpreStudy")); // The huge file (1108 lines)
const InterpreLink = lazy(() => import("./pages/InterpreLink"));
const InterpreTrack = lazy(() => import("./pages/InterpreTrack"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Settings = lazy(() => import("./pages/Settings"));
const Resources = lazy(() => import("./pages/Resources"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const SignIn = lazy(() => import("./pages/SignIn"));
const Waitlist = lazy(() => import("./pages/Waitlist"));
const Dilemma = lazy(() => import("./pages/Dilemma"));
const NotFound = lazy(() => import("./pages/NotFound"));

// A simple loading component while the heavy chunks download
const PageLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-background">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Wrap lazy routes in Suspense */}
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Public Landing Page - Loads Instantly */}
                <Route path="/" element={<Index />} />

                {/* Heavy Feature Routes - Loaded on Demand */}
                <Route path="/interprebot" element={<InterpreBot />} />
                <Route path="/interprecoach" element={<InterpreCoach />} />
                <Route path="/interpre-study" element={<InterpreStudy />} />

                {/* Protected Routes */}
                <Route path="/interpre-hub" element={
                  <ProtectedRoute>
                    <InterpreLink />
                  </ProtectedRoute>
                } />
                <Route path="/interpretrack" element={<InterpreTrack />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />

                {/* Utility Pages */}
                <Route path="/resources" element={<Resources />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/waitlist" element={<Waitlist />} />
                <Route path="/dilemma" element={<Dilemma />} />

                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
