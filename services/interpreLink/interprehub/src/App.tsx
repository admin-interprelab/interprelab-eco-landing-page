import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InterpreHub from './pages/InterpreHub';
import './index.css';

function App() {
  return (
    <BrowserRouter basename="/interprehub">
      <Routes>
        <Route path="/" element={<InterpreHub />} />
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
