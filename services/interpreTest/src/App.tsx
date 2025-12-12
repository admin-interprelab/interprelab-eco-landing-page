import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';

function App() {
  return (
    <BrowserRouter basename="/interprebot">
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
