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

// Lazy load: Product pages
const InterpreBot = lazy(() => import('./pages/InterpreBot'));
const InterpreCoach = lazy(() => import('./pages/InterpreCoach'));
const InterpreLink = lazy(() => import('./pages/InterpreLink'));
const InterpreStudy = lazy(() => import('./pages/InterpreStudy'));
const InterpreTrack = lazy(() => import('./pages/InterpreTrack'));
const InterpreWellness = lazy(() => import('./pages/InterpreWellness'));
// const Dilemma = lazy(() => import('./pages/Dilemma')); // TODO: Create Dilemma page

// Lazy load: Feature pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CallTracker = lazy(() => import('./pages/CallTracker'));
const Settings = lazy(() => import('./pages/Settings'));
const Careers = lazy(() => import('./pages/Careers'));
const GetInTouch = lazy(() => import('./pages/GetInTouch'));
const Article = lazy(() => import('./pages/Article'));
const IndustryInsights = lazy(() => import('./pages/IndustryInsights'));
const ASLTeacher = lazy(() => import('./pages/ASLTeacher'));
const NotFound = lazy(() => import('./pages/NotFound'));

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
                
                {/* Product Pages */}
                <Route path="/interprebot" element={<InterpreBot />} />
                <Route path="/interprecoach" element={<InterpreCoach />} />
                <Route path="/interprelink" element={<InterpreLink />} />
                <Route path="/interprestudy" element={<InterpreStudy />} />
                <Route path="/interpretrack" element={<InterpreTrack />} />
                <Route path="/interprewellness" element={<InterpreWellness />} />
                {/* <Route path="/dilemma" element={<Dilemma />} /> */} {/* TODO: Create Dilemma page */}
                
                {/* Feature Pages */}
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
