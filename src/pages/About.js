import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.h1>
        <motion.p 
          className="about-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tamil Nadu Market Gap Finder Project
        </motion.p>
        
        <div className="about-content">
          <motion.div 
            className="about-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ x: 5 }}
          >
            <h2>Problem Statement</h2>
            <p>
              Entrepreneurs and franchise companies often struggle to identify where demand exists 
              but competition is low. Most business decisions are based on assumptions rather than data.
            </p>
          </motion.div>

          <motion.div 
            className="about-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ x: 5 }}
          >
            <h2>Solution</h2>
            <p>
              Build a data analytics platform that analyzes business density, population, and demand 
              indicators across Tamil Nadu pincodes to identify underserved business opportunities.
            </p>
          </motion.div>

          <motion.div 
            className="about-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            <h2>Features</h2>
            <ul className="feature-list">
              <li>Pincode-wise opportunity analysis</li>
              <li>Category-wise competitor count</li>
              <li>Demand forecasting</li>
              <li>Market gap score calculation</li>
              <li>Interactive heat maps</li>
              <li>District and business category filters</li>
              <li>Exportable CSV reports</li>
            </ul>
          </motion.div>

          <motion.div 
            className="about-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ x: 5 }}
          >
            <h2>Covered Districts</h2>
            <div className="districts-grid">
              <motion.span 
                className="district-badge"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Chennai
              </motion.span>
              <motion.span 
                className="district-badge"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Coimbatore
              </motion.span>
              <motion.span 
                className="district-badge"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Madurai
              </motion.span>
              <motion.span 
                className="district-badge"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Tiruchirappalli
              </motion.span>
              <motion.span 
                className="district-badge"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Salem
              </motion.span>
              <motion.span 
                className="district-badge"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Erode
              </motion.span>
            </div>
          </motion.div>

          <motion.div 
            className="about-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/dashboard" className="cta-button">
              Explore Dashboard
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
