import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🇮🇳 Tamil Nadu Market Gap Finder
        </motion.h1>
        <motion.p 
          className="home-subtitle"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Identify underserved business opportunities across Tamil Nadu pincodes
        </motion.p>
        <motion.div 
          className="home-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p>
            A data analytics platform that analyzes business density, population, and demand indicators 
            across Tamil Nadu pincodes to identify underserved business opportunities.
          </p>
        </motion.div>
        <motion.div 
          className="home-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>📊 Pincode Analysis</h3>
            <p>Analyze market gaps by specific pincodes across Tamil Nadu</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>📈 Demand Forecasting</h3>
            <p>Project future demand based on population growth and search trends</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>🗺️ Heat Maps</h3>
            <p>Interactive visualization of market opportunities</p>
          </motion.div>
          <motion.div 
            className="feature-card"
            whileHover={{ scale: 1.05, y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3>📋 Reports</h3>
            <p>Export comprehensive CSV reports with all analysis data</p>
          </motion.div>
        </motion.div>
        <motion.div 
          className="home-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link to="/dashboard" className="cta-button">
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
