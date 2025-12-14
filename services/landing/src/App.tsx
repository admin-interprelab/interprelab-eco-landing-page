import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Eager load: Index page (main landing)
import Index from './pages/Index';

// Lazy load: Secondary pages (only loaded when user navigates to them)
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const Waitlist = lazy(() => import('./pages/Waitlist'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));

// Lazy load: Feature pages (kept in landing)
const Dilemma = lazy(() => import('./pages/Dilemma'));
const InterpreWellness = lazy(() => import('./pages/InterpreWellness'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CallTracker = lazy(() => import('./pages/CallTracker'));
const Settings = lazy(() => import('./pages/Settings'));
const Careers = lazy(() => import('./pages/Careers'));
const GetInTouch = lazy(() => import('./pages/GetInTouch'));
const Article = lazy(() => import('./pages/Article'));
const IndustryInsights = lazy(() => import('./pages/IndustryInsights'));
const ASLTeacher = lazy(() => import('./pages/ASLTeacher'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Microservice redirect component
const MicroserviceRedirect = ({ servicePath }: { servicePath: string }) => {
  // In development, redirect to local service
  // In production, this would redirect to the deployed service URL
  const isDev = import.meta.env.DEV;
  
  if (isDev) {
    const portMap: Record<string, number> = {
      'interprebot': 3001,
      'interprestudy': 3002,
      'interprecoach': 3004,
      'interpretrack': 3005,
      'interprehub': 3007,
      'interprelink': 3007, // Alias for hub
    };

    const targetPort = portMap[servicePath.toLowerCase()];
    
    if (targetPort) {
       // Redirect to the local microservice
       window.location.href = `http://localhost:${targetPort}/${servicePath}`;
       return (
        <div className="min-h-screen flex items-center justify-center flex-col gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nobel-gold"></div>
          <p className="text-muted-foreground">Redirecting to local service...</p>
        </div>
       );
    }
    
    // Fallback if port not found
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-8">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold text-foreground">Service Not Configured</h1>
           {/* ... existing fallback ... */}
        </div>
      </div>
    );
  }
  
  // Production - redirect to deployed service
  window.location.href = `/${servicePath}`;
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nobel-gold"></div>
    </div>
  );
};

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nobel-gold"></div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LanguageProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/waitlist" element={<Waitlist />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                
                {/* Microservices - Redirect to independent services */}
                <Route path="/interprebot/*" element={<MicroserviceRedirect servicePath="interprebot" />} />
                <Route path="/interprecoach/*" element={<MicroserviceRedirect servicePath="interprecoach" />} />
                <Route path="/interprehub/*" element={<MicroserviceRedirect servicePath="interprehub" />} />
                <Route path="/interprelink/*" element={<MicroserviceRedirect servicePath="interprehub" />} />
                <Route path="/interprestudy/*" element={<MicroserviceRedirect servicePath="interprestudy" />} />
                <Route path="/interpretrack/*" element={<MicroserviceRedirect servicePath="interpretrack" />} />
                
                {/* Pages kept in landing service */}
                <Route path="/interpre-wellness" element={<InterpreWellness />} />
                <Route path="/dilemma" element={<Dilemma />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/calltracker" element={<CallTracker />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/get-in-touch" element={<GetInTouch />} />
                <Route path="/article" element={<Article />} />
                <Route path="/industry-insights" element={<IndustryInsights />} />
                <Route path="/asl-teacher" element={<ASLTeacher />} />
                
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
          </div>
        </LanguageProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

