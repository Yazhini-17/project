import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './OpportunityHeatMap.css';

function OpportunityHeatMap({ pincodeData, selectedDistrict }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredPincode, setHoveredPincode] = useState(null);

  const getCategories = () => {
    if (!pincodeData || pincodeData.length === 0) return [];
    const categories = new Set();
    pincodeData.forEach(pincode => {
      Object.keys(pincode.marketGapScores).forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
  };

  const getHeatmapColor = (score) => {
    if (score >= 80) return 'rgba(34, 197, 94, 0.8)';
    if (score >= 60) return 'rgba(234, 179, 8, 0.8)';
    if (score >= 40) return 'rgba(249, 115, 22, 0.8)';
    return 'rgba(239, 68, 68, 0.8)';
  };

  const getHeatmapIntensity = (score) => {
    return Math.min(100, Math.max(20, score));
  };

  const generateHeatmapData = () => {
    if (!pincodeData || pincodeData.length === 0) return [];

    return pincodeData.map(pincode => {
      const categories = Object.entries(pincode.marketGapScores);
      const avgGap = categories.reduce((sum, [_, score]) => sum + score, 0) / categories.length;
      
      let categoryScores = {};
      if (selectedCategory === 'all') {
        categoryScores = Object.fromEntries(categories);
      } else {
        categoryScores[selectedCategory] = pincode.marketGapScores[selectedCategory] || 0;
      }

      return {
        pincode: pincode.pincode,
        area: pincode.area,
        avgGap,
        categoryScores,
        population: pincode.population,
        growth: pincode.populationGrowth,
        competitors: Object.values(pincode.competitors).reduce((sum, val) => sum + val, 0)
      };
    });
  };

  const heatmapData = generateHeatmapData();
  const categories = getCategories();

  const handlePincodeHover = (pincode) => {
    setHoveredPincode(pincode);
  };

  const handlePincodeLeave = () => {
    setHoveredPincode(null);
  };

  return (
    <div className="opportunity-heatmap">
      <div className="heatmap-header">
        <h3>🗺️ Opportunity Heat Map</h3>
        <div className="heatmap-controls">
          <select 
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button className="legend-toggle">📊 Legend</button>
        </div>
      </div>

      <div className="heatmap-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(34, 197, 94, 0.8)' }}></div>
          <span>High Opportunity (80-100)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(234, 179, 8, 0.8)' }}></div>
          <span>Medium Opportunity (60-79)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(249, 115, 22, 0.8)' }}></div>
          <span>Low Opportunity (40-59)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ background: 'rgba(239, 68, 68, 0.8)' }}></div>
          <span>Critical (0-39)</span>
        </div>
      </div>

      <div className="heatmap-grid">
        {heatmapData.map((data, index) => (
          <motion.div
            key={data.pincode}
            className="heatmap-cell"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            onMouseEnter={() => handlePincodeHover(data)}
            onMouseLeave={handlePincodeLeave}
            style={{
              background: getHeatmapColor(data.avgGap),
              opacity: getHeatmapIntensity(data.avgGap) / 100
            }}
          >
            <div className="cell-content">
              <span className="pincode-label">{data.pincode}</span>
              <span className="area-label">{data.area}</span>
              <span className="gap-score">{data.avgGap.toFixed(0)}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {hoveredPincode && (
        <motion.div
          className="heatmap-tooltip"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h4>{hoveredPincode.area} ({hoveredPincode.pincode})</h4>
          <div className="tooltip-metrics">
            <div className="tooltip-metric">
              <span className="metric-label">Avg Market Gap</span>
              <span className="metric-value">{hoveredPincode.avgGap.toFixed(1)}</span>
            </div>
            <div className="tooltip-metric">
              <span className="metric-label">Population</span>
              <span className="metric-value">{hoveredPincode.population.toLocaleString()}</span>
            </div>
            <div className="tooltip-metric">
              <span className="metric-label">Growth Rate</span>
              <span className="metric-value">{hoveredPincode.growth}%</span>
            </div>
            <div className="tooltip-metric">
              <span className="metric-label">Total Competitors</span>
              <span className="metric-value">{hoveredPincode.competitors}</span>
            </div>
          </div>
          
          {selectedCategory !== 'all' && (
            <div className="category-breakdown">
              <h5>Category Breakdown</h5>
              {Object.entries(hoveredPincode.categoryScores).map(([cat, score]) => (
                <div key={cat} className="category-item">
                  <span className="category-name">{cat}</span>
                  <div className="category-bar">
                    <div 
                      className="category-fill"
                      style={{ 
                        width: `${score}%`,
                        background: getHeatmapColor(score)
                      }}
                    ></div>
                  </div>
                  <span className="category-score">{score.toFixed(0)}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      <div className="heatmap-summary">
        <div className="summary-stat">
          <span className="stat-label">Total Areas</span>
          <span className="stat-value">{heatmapData.length}</span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">High Opportunity</span>
          <span className="stat-value">
            {heatmapData.filter(d => d.avgGap >= 80).length}
          </span>
        </div>
        <div className="summary-stat">
          <span className="stat-label">Avg Gap Score</span>
          <span className="stat-value">
            {(heatmapData.reduce((sum, d) => sum + d.avgGap, 0) / heatmapData.length).toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OpportunityHeatMap;
