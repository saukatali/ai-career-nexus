import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SkillMatcher from './pages/SkillMatcher';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import AICoach from './pages/AICoach';
import SkillGap from './pages/SkillGap';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <LandingPage />
          </motion.div>
        } />
        <Route path="/login" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Login />
          </motion.div>
        } />
        <Route path="/dashboard" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Dashboard />
          </motion.div>
        } />
        <Route path="/profile" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Profile />
          </motion.div>
        } />
        <Route path="/settings" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Settings />
          </motion.div>
        } />
        <Route path="/skill-matcher" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SkillMatcher />
          </motion.div>
        } />
        <Route path="/resume-analyzer" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ResumeAnalyzer />
          </motion.div>
        } />
        <Route path="/ai-coach" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <AICoach />
          </motion.div>
        } />
        <Route path="/skill-gap" element={
          <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <SkillGap />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}

export default App;
