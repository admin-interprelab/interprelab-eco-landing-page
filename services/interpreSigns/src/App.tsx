import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ASLTeacher from '../pages/ASLTeacher';
import '../index.css';

function App() {
  return (
    <BrowserRouter basename="/asl-teacher">
      <ASLTeacher />
    </BrowserRouter>
  );
}

export default App;