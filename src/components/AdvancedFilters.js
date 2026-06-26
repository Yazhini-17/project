import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './AdvancedFilters.css';

function AdvancedFilters({ pincodeData, onFilterChange }) {
  const [filters, setFilters] = useState({
    gapScoreRange: [0, 100],
    populationRange: [0, 200000],
    growthRateRange: [0, 10],
    incomeLevels: ['High', 'Medium', 'Low'],
    urbanDevelopmentRange: [0, 100]
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleReset = () => {
    const defaultFilters = {
      gapScoreRange: [0, 100],
      populationRange: [0, 200000],
      growthRateRange: [0, 10],
      incomeLevels: ['High', 'Medium', 'Low'],
      urbanDevelopmentRange: [0, 100]
    };
    setFilters(defaultFilters);
    if (onFilterChange) {
      onFilterChange(defaultFilters);
    }
  };

  const toggleIncomeLevel = (level) => {
    const newLevels = filters.incomeLevels.includes(level)
      ? filters.incomeLevels.filter(l => l !== level)
      : [...filters.incomeLevels, level];
    handleFilterChange('incomeLevels', newLevels);
  };

  const getFilteredCount = () => {
    if (!pincodeData) return 0;
    
    return pincodeData.filter(pincode => {
      const avgGap = Object.values(pincode.marketGapScores).reduce((sum, val) => sum + val, 0) / Object.values(pincode.marketGapScores).length;
      const matchesGap = avgGap >= filters.gapScoreRange[0] && avgGap <= filters.gapScoreRange[1];
      const matchesPopulation = pincode.population >= filters.populationRange[0] && pincode.population <= filters.populationRange[1];
      const matchesGrowth = pincode.populationGrowth >= filters.growthRateRange[0] && pincode.populationGrowth <= filters.growthRateRange[1];
      const matchesIncome = filters.incomeLevels.includes(pincode.incomeLevel);
      const matchesUrban = pincode.urbanDevelopment >= filters.urbanDevelopmentRange[0] && pincode.urbanDevelopment <= filters.urbanDevelopmentRange[1];
      
      return matchesGap && matchesPopulation && matchesGrowth && matchesIncome && matchesUrban;
    }).length;
  };

  return (
    <div className="advanced-filters">
      <div className="filters-header">
        <h3>🔍 Advanced Filters</h3>
        <div className="filters-actions">
          <span className="filtered-count">{getFilteredCount()} results</span>
          <button 
            className="expand-toggle"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
          <button className="reset-btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <motion.div 
        className="filters-content"
        initial={{ height: 'auto' }}
        animate={{ height: isExpanded ? 'auto' : '0px' }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="filter-section">
          <h4>Market Gap Score</h4>
          <div className="range-slider">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.gapScoreRange[0]}
              onChange={(e) => handleFilterChange('gapScoreRange', [parseInt(e.target.value), filters.gapScoreRange[1]])}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.gapScoreRange[1]}
              onChange={(e) => handleFilterChange('gapScoreRange', [filters.gapScoreRange[0], parseInt(e.target.value)])}
            />
          </div>
          <div className="range-values">
            <span>{filters.gapScoreRange[0]}</span>
            <span>{filters.gapScoreRange[1]}</span>
          </div>
        </div>

        <div className="filter-section">
          <h4>Population Range</h4>
          <div className="range-slider">
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={filters.populationRange[0]}
              onChange={(e) => handleFilterChange('populationRange', [parseInt(e.target.value), filters.populationRange[1]])}
            />
            <input
              type="range"
              min="0"
              max="200000"
              step="10000"
              value={filters.populationRange[1]}
              onChange={(e) => handleFilterChange('populationRange', [filters.populationRange[0], parseInt(e.target.value)])}
            />
          </div>
          <div className="range-values">
            <span>{(filters.populationRange[0] / 1000).toFixed(0)}K</span>
            <span>{(filters.populationRange[1] / 1000).toFixed(0)}K</span>
          </div>
        </div>

        <div className="filter-section">
          <h4>Growth Rate (%)</h4>
          <div className="range-slider">
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filters.growthRateRange[0]}
              onChange={(e) => handleFilterChange('growthRateRange', [parseFloat(e.target.value), filters.growthRateRange[1]])}
            />
            <input
              type="range"
              min="0"
              max="10"
              step="0.5"
              value={filters.growthRateRange[1]}
              onChange={(e) => handleFilterChange('growthRateRange', [filters.growthRateRange[0], parseFloat(e.target.value)])}
            />
          </div>
          <div className="range-values">
            <span>{filters.growthRateRange[0]}%</span>
            <span>{filters.growthRateRange[1]}%</span>
          </div>
        </div>

        <div className="filter-section">
          <h4>Income Level</h4>
          <div className="checkbox-group">
            {['High', 'Medium', 'Low'].map(level => (
              <label key={level} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={filters.incomeLevels.includes(level)}
                  onChange={() => toggleIncomeLevel(level)}
                />
                <span className="checkbox-text">{level}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <h4>Urban Development Score</h4>
          <div className="range-slider">
            <input
              type="range"
              min="0"
              max="100"
              value={filters.urbanDevelopmentRange[0]}
              onChange={(e) => handleFilterChange('urbanDevelopmentRange', [parseInt(e.target.value), filters.urbanDevelopmentRange[1]])}
            />
            <input
              type="range"
              min="0"
              max="100"
              value={filters.urbanDevelopmentRange[1]}
              onChange={(e) => handleFilterChange('urbanDevelopmentRange', [filters.urbanDevelopmentRange[0], parseInt(e.target.value)])}
            />
          </div>
          <div className="range-values">
            <span>{filters.urbanDevelopmentRange[0]}</span>
            <span>{filters.urbanDevelopmentRange[1]}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdvancedFilters;
