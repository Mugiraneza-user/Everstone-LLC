import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/websites/LandingPage'
import Service from './pages/websites/Services'
import Testimony from './pages/websites/Testimonial';
import ScrollToTop from './pages/websites/scrollToTop';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App: React.FC = () => {
  return (
    
    <Router>
       <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/service" element={<Service />} />
        <Route path="/testimony" element={<Testimony />} />
      </Routes>
    </Router>
  )
}

export default App
   