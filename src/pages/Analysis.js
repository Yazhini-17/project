import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Analysis.css';

function Analysis() {
  return (
    <div className="analysis-page">
      <div className="analysis-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📊 Market Gap Analysis
        </motion.h1>
        <motion.p 
          className="analysis-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Detailed analysis methodologies and calculations
        </motion.p>
        
        <div className="analysis-content">
          <motion.div 
            className="analysis-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ x: 5 }}
          >
            <h2>Market Gap Score Formula</h2>
            <div className="formula-box">
              <code>Market Gap Score = Demand Score - Competition Score</code>
            </div>
            <p>Higher score indicates better business opportunity.</p>
          </motion.div>

          <motion.div 
            className="analysis-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ x: 5 }}
          >
            <h2>Data Collection Sources</h2>
            <ul className="analysis-list">
              <li>Census population data</li>
              <li>Google Maps business listings</li>
              <li>Business directories</li>
              <li>Demographic and income data</li>
              <li>Infrastructure information</li>
            </ul>
          </motion.div>

          <motion.div 
            className="analysis-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ x: 5 }}
          >
            <h2>Business Density Calculation</h2>
            <div className="formula-box">
              <code>Business Density = Number of Businesses / Population</code>
            </div>
            <p><strong>Example:</strong> Pincode 600100 with 1,20,000 population and 18 restaurants has a restaurant density of 0.00015 restaurants per person.</p>
          </motion.div>

          <motion.div 
            className="analysis-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            whileHover={{ x: 5 }}
          >
            <h2>Demand Signal Factors</h2>
            <ul className="analysis-list">
              <li>Population size</li>
              <li>Population growth rate</li>
              <li>Nearby residential projects</li>
              <li>Search trends</li>
              <li>Competitor count</li>
              <li>Income levels</li>
              <li>Urban development indicators</li>
            </ul>
          </motion.div>

          <motion.div 
            className="analysis-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ x: 5 }}
          >
            <h2>Opportunity Levels</h2>
            <div className="opportunity-levels">
              <div className="level high">
                <span className="level-indicator"></span>
                <span className="level-label">High Opportunity (Market Gap Score ≥ 80)</span>
              </div>
              <div className="level medium">
                <span className="level-indicator"></span>
                <span className="level-label">Medium Opportunity (Market Gap Score 70-79)</span>
              </div>
              <div className="level low">
                <span className="level-indicator"></span>
                <span className="level-label">Low Opportunity (Market Gap Score &lt; 70)</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="analysis-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link to="/dashboard" className="cta-button">
              View Dashboard Analysis
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
