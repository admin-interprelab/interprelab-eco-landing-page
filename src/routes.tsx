import React from 'react';
import { Navigate } from 'react-router-dom';
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Import all page components
import Index from "./pages/Index";
import InterpreBot from "./pages/InterpreBot";
import InterpreCoach from "./pages/InterpreCoach";
import InterpreStudy from "./pages/InterpreStudy";
import InterpreLink from "./pages/InterpreLink";
import Dashboard from "./pages/Dashboard";
import InterpreTrack from "./pages/InterpreTrack";
import CallTracker from "./pages/CallTracker";
import Settings from "./pages/Settings";
import Resources from "./pages/Resources";
import About from "./pages/About";
import Contact from "./pages/Contact";
import GetInTouch from "./pages/GetInTouch";
import Careers from "./pages/Careers";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Waitlist from "./pages/Waitlist";
import NotFound from "./pages/NotFound";

interface AppRoute {
  path: string;
  element: React.ReactNode;
  protected?: boolean;
  redirect?: string;
}

export const appRoutes: AppRoute[] = [
  { path: "/", element: <Index /> },
  { path: "/home", element: <Home /> },
  { path: "/interprebot", element: <InterpreBot /> },
  { path: "/interprecoach", element: <InterpreCoach /> },
  { path: "/interprestudy", element: <InterpreStudy /> },
  { path: "/interprelink", element: <InterpreLink /> },
  { path: "/interpre-hub", element: <Navigate to="/interprelink" replace /> }, // Backward-compatible route
  { path: "/dashboard", element: <Dashboard />, protected: true },
  { path: "/interpretrack", element: <InterpreTrack /> },
  { path: "/call-tracker", element: <CallTracker />, protected: true },
  { path: "/settings", element: <Settings />, protected: true },
  { path: "/resources", element: <Resources /> },
  { path: "/careers", element: <Careers /> },
  { path: "/about", element: <About /> },
  { path: "/contact", element: <Contact /> },
  { path: "/get-in-touch", element: <GetInTouch /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/waitlist", element: <Waitlist /> },
  { path: "*", element: <NotFound /> }, // Catch-all route
];

export const renderRoutes = () => {
  return appRoutes.map((route, index) => (
    <React.Fragment key={index}>
      {route.protected ? (
        <Route
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ) : (
        <Route path={route.path} element={route.element} />
      )}
    </React.Fragment>
  ));
};
