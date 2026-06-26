import React from 'react';
import './PincodeAnalysis.css';

function PincodeAnalysis({ rankingData, selectedCategory }) {
  const filteredData = selectedCategory === 'all' 
    ? rankingData 
    : rankingData.filter(item => item.businessCategory === selectedCategory);

  const top10 = filteredData.slice(0, 10);

  return (
    <div className="pincode-analysis">
      <div className="analysis-card">
        <h3>📊 Market Gap Ranking by Pincode</h3>
        <p className="analysis-subtitle">Top opportunities sorted by Market Gap Score</p>
        
        <div className="table-container">
          <table className="ranking-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Pincode</th>
                <th>Area</th>
                <th>Business Category</th>
                <th>Competitors</th>
                <th>Demand Score</th>
                <th>Market Gap Score</th>
              </tr>
            </thead>
            <tbody>
              {top10.map((item, index) => (
                <tr key={index} className={index < 3 ? 'top-rank' : ''}>
                  <td className="rank-cell">
                    <span className={`rank-badge ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                      #{item.rank}
                    </span>
                  </td>
                  <td className="pincode-cell">{item.pincode}</td>
                  <td className="area-cell">{item.area}</td>
                  <td className="category-cell">{item.businessCategory}</td>
                  <td className="competitors-cell">{item.competitors}</td>
                  <td className="demand-cell">
                    <div className="score-bar">
                      <div 
                        className="score-fill demand" 
                        style={{ width: `${item.demandScore}%` }}
                      ></div>
                    </div>
                    <span>{item.demandScore}</span>
                  </td>
                  <td className="gap-cell">
                    <div className="score-bar">
                      <div 
                        className={`score-fill gap ${item.marketGapScore >= 80 ? 'high' : item.marketGapScore >= 70 ? 'medium' : 'low'}`}
                        style={{ width: `${item.marketGapScore}%` }}
                      ></div>
                    </div>
                    <span className={`gap-score ${item.marketGapScore >= 80 ? 'high' : item.marketGapScore >= 70 ? 'medium' : 'low'}`}>
                      {item.marketGapScore}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="analysis-legend">
          <div className="legend-item">
            <span className="legend-dot gold"></span>
            <span>Top Opportunity (Gold)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot silver"></span>
            <span>High Potential (Silver)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot bronze"></span>
            <span>Good Opportunity (Bronze)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PincodeAnalysis;
