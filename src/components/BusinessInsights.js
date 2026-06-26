import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './BusinessInsights.css';

function getScoreClass(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}

function BusinessInsights({ pincodeData }) {
  const [selectedView, setSelectedView] = useState('opportunity');

  const COLORS = ['#4a6fa5', '#6b5b95', '#a85d6b', '#b8703a', '#4a8b5a', '#4a7a8a'];

  const generateOpportunityData = () => {
    if (!pincodeData || pincodeData.length === 0) return [];

    const categoryOpportunities = {};
    
    pincodeData.forEach(pincode => {
      Object.entries(pincode.marketGapScores).forEach(([category, score]) => {
        if (!categoryOpportunities[category]) {
          categoryOpportunities[category] = {
            totalGap: 0,
            count: 0,
            avgDemand: 0,
            totalCompetitors: 0
          };
        }
        categoryOpportunities[category].totalGap += score;
        categoryOpportunities[category].count += 1;
        categoryOpportunities[category].avgDemand += pincode.demandScores[category] || 0;
        categoryOpportunities[category].totalCompetitors += pincode.competitors[category] || 0;
      });
    });

    return Object.entries(categoryOpportunities).map(([category, data]) => ({
      category,
      avgGap: (data.totalGap / data.count).toFixed(1),
      avgDemand: (data.avgDemand / data.count).toFixed(1),
      avgCompetitors: (data.totalCompetitors / data.count).toFixed(1),
      opportunityScore: ((data.totalGap / data.count) * 0.6 + (data.avgDemand / data.count) * 0.4).toFixed(1)
    })).sort((a, b) => b.opportunityScore - a.opportunityScore);
  };

  const generateCompetitionData = () => {
    if (!pincodeData || pincodeData.length === 0) return [];

    const areaCompetition = pincodeData.map(pincode => {
      const totalCompetitors = Object.values(pincode.competitors).reduce((sum, val) => sum + val, 0);
      const avgGap = Object.values(pincode.marketGapScores).reduce((sum, val) => sum + val, 0) / Object.values(pincode.marketGapScores).length;
      
      return {
        area: pincode.area,
        competitors: totalCompetitors,
        marketGap: avgGap.toFixed(1),
        population: pincode.population
      };
    }).sort((a, b) => b.competitors - a.competitors);

    return areaCompetition.slice(0, 8);
  };

  const generateDemandDistribution = () => {
    if (!pincodeData || pincodeData.length === 0) return [];

    const demandLevels = {
      'High Demand (80-100)': 0,
      'Medium Demand (60-79)': 0,
      'Low Demand (0-59)': 0
    };

    pincodeData.forEach(pincode => {
      Object.values(pincode.demandScores).forEach(score => {
        if (score >= 80) {
          demandLevels['High Demand (80-100)']++;
        } else if (score >= 60) {
          demandLevels['Medium Demand (60-79)']++;
        } else {
          demandLevels['Low Demand (0-59)']++;
        }
      });
    });

    return Object.entries(demandLevels).map(([level, count]) => ({
      level,
      count,
      percentage: ((count / (pincodeData.length * Object.keys(pincodeData[0].demandScores).length)) * 100).toFixed(1)
    }));
  };

  const opportunityData = generateOpportunityData();
  const competitionData = generateCompetitionData();
  const demandDistribution = generateDemandDistribution();

  return (
    <div className="business-insights">
      <div className="insights-header">
        <h3>📊 Business Insights & Opportunity Visualization</h3>
        <div className="view-selector">
          <button
            className={`view-btn ${selectedView === 'opportunity' ? 'active' : ''}`}
            onClick={() => setSelectedView('opportunity')}
          >
            Opportunity Analysis
          </button>
          <button
            className={`view-btn ${selectedView === 'competition' ? 'active' : ''}`}
            onClick={() => setSelectedView('competition')}
          >
            Competition Analysis
          </button>
          <button
            className={`view-btn ${selectedView === 'demand' ? 'active' : ''}`}
            onClick={() => setSelectedView('demand')}
          >
            Demand Distribution
          </button>
        </div>
      </div>

      <div className="insights-content">
        {selectedView === 'opportunity' && (
          <motion.div
            className="insights-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="insights-chart">
              <h4>Category Opportunity Scores</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={opportunityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="category" 
                    tick={{ fill: '#000', fontSize: 13, fontWeight: 500 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#000', fontSize: 13, fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="opportunityScore" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="insights-table">
              <h4>Opportunity Details</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Avg Gap</th>
                    <th>Avg Demand</th>
                    <th>Avg Competitors</th>
                    <th>Opportunity Score</th>
                  </tr>
                </thead>
                <tbody>
                  {opportunityData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.category}</td>
                      <td>{item.avgGap}</td>
                      <td>{item.avgDemand}</td>
                      <td>{item.avgCompetitors}</td>
                      <td>
                        <span className={`score-badge ${getScoreClass(item.opportunityScore)}`}>
                          {item.opportunityScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {selectedView === 'competition' && (
          <motion.div
            className="insights-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="insights-chart">
              <h4>Area Competition Levels</h4>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={competitionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="area" 
                    tick={{ fill: '#000', fontSize: 13, fontWeight: 500 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis tick={{ fill: '#000', fontSize: 13, fontWeight: 500 }} />
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="competitors" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="insights-cards">
              <h4>Competition Insights</h4>
              <div className="insight-cards-grid">
                {competitionData.slice(0, 4).map((area, index) => (
                  <div key={index} className="insight-card">
                    <h5>{area.area}</h5>
                    <div className="insight-metrics">
                      <div className="metric">
                        <span className="metric-label">Competitors</span>
                        <span className="metric-value">{area.competitors}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Market Gap</span>
                        <span className="metric-value">{area.marketGap}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Population</span>
                        <span className="metric-value">{area.population.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {selectedView === 'demand' && (
          <motion.div
            className="insights-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="insights-chart">
              <h4>Demand Distribution</h4>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={demandDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ level, percentage }) => `${level}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {demandDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: '#ffffff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="insights-summary">
              <h4>Demand Summary</h4>
              <div className="summary-cards">
                {demandDistribution.map((item, index) => (
                  <div key={index} className="summary-card" style={{ borderColor: COLORS[index % COLORS.length] }}>
                    <div className="summary-icon" style={{ background: COLORS[index % COLORS.length] }}>
                      {index === 0 ? '🔥' : index === 1 ? '⚡' : '💧'}
                    </div>
                    <h5>{item.level}</h5>
                    <p>{item.percentage}% of total demand</p>
                    <span className="count-badge">{item.count} data points</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BusinessInsights;
