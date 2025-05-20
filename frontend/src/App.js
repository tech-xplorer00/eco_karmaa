import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import RewardCollection from './components/Rewards/RewardCollection';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './components/Auth/PrivateRoute';

// Context providers
import { AuthProvider } from './contexts/AuthContext';
import { ChallengeProvider } from './contexts/ChallengeContext';
import { BadgeProvider } from './contexts/BadgeContext';
import { RewardProvider } from './contexts/RewardContext';
import { UserProvider } from './contexts/UserContext';

// Navigation service
import { setNavigate } from './services/navigationService';

function App() {
  // Get navigate function from react-router
  const navigate = useNavigate();

  // Set navigate function in the navigation service
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return (
    <div className="App">
      <ErrorBoundary>
        <AuthProvider>
          <UserProvider>
            <ChallengeProvider>
              <BadgeProvider>
                <RewardProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={
                      <>
                        <Hero />
                        <HowItWorks />
                        <Testimonials />
                      </>
                    } />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/challenges"
                      element={
                        <PrivateRoute>
                          <ChallengeList />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/badges"
                      element={
                        <PrivateRoute>
                          <BadgeCollection />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/rewards"
                      element={
                        <PrivateRoute>
                          <RewardCollection />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                  <Footer />
                </RewardProvider>
              </BadgeProvider>
            </ChallengeProvider>
          </UserProvider>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;