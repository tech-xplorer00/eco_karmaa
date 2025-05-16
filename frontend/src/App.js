import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import ErrorBoundary from './components/ErrorBoundary';
import ChallengeList from './components/Challenges/ChallengeList';
import BadgeCollection from './components/Badges/BadgeCollection';
import { ChallengeProvider } from './contexts/ChallengeContext';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ChallengeProvider>
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <HowItWorks />
                <Testimonials />
              </>
            } />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/challenges" element={<ChallengeList />} />
            <Route path="/badges" element={<BadgeCollection />} />
          </Routes>
          <Footer />
        </ChallengeProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
