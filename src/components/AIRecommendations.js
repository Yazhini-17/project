import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './AIRecommendations.css';

function AIRecommendations({ pincodeData, businessCategories, selectedDistrict }) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateRecommendations();
  }, [pincodeData, businessCategories, selectedDistrict]);

  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate AI-powered recommendations based on existing data
    // In production, this would call an AI/ML API
    setTimeout(() => {
      const recs = [];
      
      if (pincodeData && pincodeData.length > 0) {
        // Find top opportunities
        const sortedByGap = [...pincodeData].sort((a, b) => {
          const avgGapA = Object.values(a.marketGapScores).reduce((sum, val) => sum + val, 0) / Object.values(a.marketGapScores).length;
          const avgGapB = Object.values(b.marketGapScores).reduce((sum, val) => sum + val, 0) / Object.values(b.marketGapScores).length;
          return avgGapB - avgGapA;
        });

        const topArea = sortedByGap[0];
        if (topArea) {
          const bestCategory = Object.entries(topArea.marketGapScores)
            .sort((a, b) => b[1] - a[1])[0];
          
          if (bestCategory) {
            recs.push({
              type: 'opportunity',
              priority: 'high',
              title: `High Opportunity: ${bestCategory[0]} in ${topArea.area}`,
              description: `Market gap score of ${bestCategory[1]} indicates strong demand with low competition. Consider establishing a ${bestCategory[0]} business in this area.`,
              metrics: {
                gapScore: bestCategory[1],
                demandScore: topArea.demandScores[bestCategory[0]],
                competitors: topArea.competitors[bestCategory[0]],
                population: topArea.population
              },
              confidence: 0.92
            });
          }
        }

        // Growth potential recommendation
        const highGrowthArea = [...pincodeData].sort((a, b) => b.populationGrowth - a.populationGrowth)[0];
        if (highGrowthArea && highGrowthArea.populationGrowth > 3) {
          recs.push({
            type: 'growth',
            priority: 'medium',
            title: `Growth Potential: ${highGrowthArea.area}`,
            description: `Population growth of ${highGrowthArea.populationGrowth}% indicates expanding market. Early entry now could capture future demand.`,
            metrics: {
              growthRate: highGrowthArea.populationGrowth,
              population: highGrowthArea.population,
              urbanDevelopment: highGrowthArea.urbanDevelopment
            },
            confidence: 0.85
          });
        }

        // Underserved category recommendation
        const categoryGaps = {};
        pincodeData.forEach(pincode => {
          Object.entries(pincode.marketGapScores).forEach(([category, score]) => {
            if (!categoryGaps[category]) {
              categoryGaps[category] = { total: 0, count: 0 };
            }
            categoryGaps[category].total += score;
            categoryGaps[category].count += 1;
          });
        });

        const avgCategoryGaps = Object.entries(categoryGaps)
          .map(([category, data]) => ({
            category,
            avgGap: data.total / data.count
          }))
          .sort((a, b) => b.avgGap - a.avgGap);

        if (avgCategoryGaps.length > 0) {
          const topCategory = avgCategoryGaps[0];
          recs.push({
            type: 'category',
            priority: 'high',
            title: `Underserved Category: ${topCategory.category}`,
            description: `Average market gap score of ${topCategory.avgGap.toFixed(1)} across ${selectedDistrict} indicates this business category is underserved.`,
            metrics: {
              avgGap: topCategory.avgGap,
              totalPincodes: categoryGaps[topCategory.category].count
            },
            confidence: 0.88
          });
        }

        // Risk warning
        const saturatedArea = [...pincodeData].sort((a, b) => {
          const totalCompetitorsA = Object.values(a.competitors).reduce((sum, val) => sum + val, 0);
          const totalCompetitorsB = Object.values(b.competitors).reduce((sum, val) => sum + val, 0);
          return totalCompetitorsB - totalCompetitorsA;
        })[0];

        if (saturatedArea) {
          const totalCompetitors = Object.values(saturatedArea.competitors).reduce((sum, val) => sum + val, 0);
          if (totalCompetitors > 50) {
            recs.push({
              type: 'warning',
              priority: 'low',
              title: `Market Saturation Alert: ${saturatedArea.area}`,
              description: `High competitor count (${totalCompetitors}) indicates saturated market. Consider different business categories or nearby areas.`,
              metrics: {
                totalCompetitors,
                population: saturatedArea.population
              },
              confidence: 0.95
            });
          }
        }
      }

      setRecommendations(recs);
      setLoading(false);
    }, 800);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🟢';
      default: return '⚪';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'opportunity': return '💡';
      case 'growth': return '📈';
      case 'category': return '🎯';
      case 'warning': return '⚠️';
      default: return 'ℹ️';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'var(--success)';
    if (confidence >= 0.8) return 'var(--warning)';
    return 'var(--danger)';
  };

  if (loading) {
    return (
      <div className="ai-recommendations">
        <div className="ai-header">
          <h3>🤖 AI-Powered Recommendations</h3>
        </div>
        <div className="ai-loading">
          <div className="loading-spinner"></div>
          <p>Analyzing market data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="ai-recommendations"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="ai-header">
        <h3>🤖 AI-Powered Recommendations</h3>
        <button 
          className="refresh-btn"
          onClick={generateRecommendations}
          disabled={loading}
        >
          🔄 Refresh
        </button>
      </div>

      <div className="recommendations-list">
        {recommendations.length === 0 ? (
          <div className="no-recommendations">
            <p>No recommendations available. Add more data to generate insights.</p>
          </div>
        ) : (
          recommendations.map((rec, index) => (
            <motion.div
              key={index}
              className={`recommendation-card priority-${rec.priority}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <div className="recommendation-header">
                <div className="recommendation-icons">
                  <span className="type-icon">{getTypeIcon(rec.type)}</span>
                  <span className="priority-icon">{getPriorityIcon(rec.priority)}</span>
                </div>
                <div className="confidence-badge" style={{ color: getConfidenceColor(rec.confidence) }}>
                  {(rec.confidence * 100).toFixed(0)}% confidence
                </div>
              </div>

              <h4 className="recommendation-title">{rec.title}</h4>
              <p className="recommendation-description">{rec.description}</p>

              <div className="recommendation-metrics">
                {Object.entries(rec.metrics).map(([key, value]) => (
                  <div key={key} className="metric-item">
                    <span className="metric-key">{formatMetricKey(key)}</span>
                    <span className="metric-value">{formatMetricValue(key, value)}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function formatMetricKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

function formatMetricValue(key, value) {
  if (key === 'population') {
    return value.toLocaleString();
  }
  if (typeof value === 'number') {
    return value.toFixed(1);
  }
  return value;
}

export default AIRecommendations;
