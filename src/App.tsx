import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import InterpreBot from "./pages/InterpreBot";
import InterpreCoach from "./pages/InterpreCoach";
import InterpreStudy from "./pages/InterpreStudy";
import InterpreLink from "./pages/InterpreLink";
import Dashboard from "./pages/Dashboard";
import CallTracker from "./pages/CallTracker";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import About from "./pages/About";
import InterpreWellness from "./pages/InterpreWellness";
import Contact from "./pages/Contact";
import GetInTouch from "./pages/GetInTouch";
import Careers from "./pages/Careers";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/home" element={<Home />} />
                <Route path="/interprebot" element={<InterpreBot />} />
                <Route path="/interprecoach" element={<InterpreCoach />} />
                <Route path="/interprestudy" element={<InterpreStudy />} />
                <Route path="/interprelink" element={<InterpreLink />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/interpretrack" element={
                  <ProtectedRoute>
                    <CallTracker />
                  </ProtectedRoute>
                } />
                <Route path="/call-tracker" element={
                  <ProtectedRoute>
                    <CallTracker />
                  </ProtectedRoute>
                } />
                <Route path="/settings" element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } />
                <Route path="/resources" element={<Resources />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/get-in-touch" element={<GetInTouch />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/waitlist" element={<Waitlist />} />
                <Route path="/interpre-wellness" element={<InterpreWellness />} />
                <Route path="/interprewellbeing" element={<InterpreWellness />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
