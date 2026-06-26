import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Reports.css';

function Reports() {
  return (
    <div className="reports-page">
      <div className="reports-container">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          📋 Reports
        </motion.h1>
        <motion.p 
          className="reports-subtitle"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Export and download comprehensive market gap analysis reports
        </motion.p>
        
        <div className="reports-content">
          <motion.div 
            className="report-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ x: 5 }}
          >
            <h2>Export Features</h2>
            <div className="report-features">
              <motion.div 
                className="report-feature"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">📊</div>
                <h3>Pincode Analysis</h3>
                <p>Detailed pincode-wise market gap data with competitor counts and demand scores</p>
              </motion.div>
              <motion.div 
                className="report-feature"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">📈</div>
                <h3>Demand Forecasting</h3>
                <p>Current and projected demand data based on population growth trends</p>
              </motion.div>
              <motion.div 
                className="report-feature"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">🗺️</div>
                <h3>Geographic Data</h3>
                <p>Location coordinates and geographic distribution of market opportunities</p>
              </motion.div>
              <motion.div 
                className="report-feature"
                whileHover={{ scale: 1.05, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="feature-icon">👥</div>
                <h3>Demographics</h3>
                <p>Population data, growth rates, and income level classifications</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="report-section"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ x: 5 }}
          >
            <h2>Report Contents</h2>
            <div className="report-columns">
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Pincode</span>
                <span className="column-desc">Postal code identifier</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Area</span>
                <span className="column-desc">Location name</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">District</span>
                <span className="column-desc">Administrative district</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Business Category</span>
                <span className="column-desc">Type of business</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Competitors</span>
                <span className="column-desc">Number of existing businesses</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Demand Score</span>
                <span className="column-desc">Market demand index (0-100)</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Market Gap Score</span>
                <span className="column-desc">Opportunity score (0-100)</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Population</span>
                <span className="column-desc">Total population count</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Population Growth</span>
                <span className="column-desc">Annual growth percentage</span>
              </motion.div>
              <motion.div 
                className="column-item"
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="column-name">Income Level</span>
                <span className="column-desc">Economic classification</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="reports-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link to="/dashboard" className="cta-button">
              Go to Dashboard to Export
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
