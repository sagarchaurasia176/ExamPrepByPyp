import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import AuthSuccess from './Components/AuthSuccess';
import ProtectedRoute from './Components/ProtectedRoutes';
import Papers from './Components/SamplePaper';
import Home from './Pages/Home';
import './App.css'
import UniversityPaper from './core/ViewPaper';

function App() {
  return (
    <>    
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route 
            path="/papers" 
            element={
              <ProtectedRoute>
               <UniversityPaper/>
              </ProtectedRoute>
            } 
          />      
        </Routes>
    </>

  );
}

export default App;