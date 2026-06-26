import React from 'react';
import './TopAreas.css';

function TopAreas({ pincodeData, businessCategories }) {
  const sortedPincodes = [...pincodeData].sort((a, b) => {
    const avgGapA = Object.values(a.marketGapScores).reduce((x, y) => x + y, 0) / Object.keys(a.marketGapScores).length;
    const avgGapB = Object.values(b.marketGapScores).reduce((x, y) => x + y, 0) / Object.keys(b.marketGapScores).length;
    return avgGapB - avgGapA;
  });

  return (
    <div className="top-areas-section">
      <div className="top-areas-card">
        <h3>🏆 Top Pincodes by Market Opportunity</h3>
        <div className="areas-list">
          {sortedPincodes.map((pincode, index) => {
            const avgGapScore = Object.values(pincode.marketGapScores).reduce((a, b) => a + b, 0) / Object.keys(pincode.marketGapScores).length;
            const topCategory = Object.entries(pincode.marketGapScores).sort(([, a], [, b]) => b - a)[0];
            
            return (
              <div key={index} className="area-item">
                <div className="area-info">
                  <span className="area-rank">#{index + 1}</span>
                  <div>
                    <span className="area-name">{pincode.area}</span>
                    <span className="area-pincode">{pincode.pincode}</span>
                    <span className="area-district">{pincode.district}</span>
                  </div>
                </div>
                <div className="area-details">
                  <div className="metrics-info">
                    <span className="population-badge">👥 {pincode.population.toLocaleString()}</span>
                    <span className="growth-badge">📈 {pincode.populationGrowth}%</span>
                  </div>
                  <div className="top-category">
                    <span className="category-label">Best: {topCategory[0]}</span>
                    <span className="category-score">{topCategory[1]}</span>
                  </div>
                  <div className="gap-bar">
                    <div 
                      className="gap-fill" 
                      style={{ width: `${avgGapScore}%`, backgroundColor: avgGapScore >= 80 ? '#e74c3c' : avgGapScore >= 70 ? '#f39c12' : '#27ae60' }}
                    ></div>
                  </div>
                  <span className="gap-value">{avgGapScore.toFixed(1)}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="business-summary">
          <h4>📊 Business Category Summary</h4>
          <div className="category-list">
            {businessCategories.slice(0, 4).map((cat, index) => (
              <div key={index} className="category-item">
                <span className="category-name">{cat.name}</span>
                <span className={`category-gap ${cat.gap >= 30 ? 'high' : cat.gap >= 20 ? 'medium' : 'low'}`}>
                  {cat.gap}% gap
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopAreas;
