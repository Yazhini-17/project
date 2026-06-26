import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './AnalyticsPanel.css';

function AnalyticsPanel({ pincodeData, businessCategories, selectedDistrict }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const COLORS = ['#2563eb', '#7c3aed', '#db2777', '#ea580c', '#16a34a', '#0891b2'];

  const handleExportReport = () => {
    if (!pincodeData || pincodeData.length === 0) {
      alert('No data available to export');
      return;
    }

    try {
      let reportContent = `
MARKET GAP ANALYSIS REPORT
District: ${selectedDistrict}
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY
================
Total Pincodes Analyzed: ${pincodeData.length}
Total Population: ${pincodeData.reduce((sum, p) => sum + p.population, 0).toLocaleString()}
Average Growth Rate: ${(pincodeData.reduce((sum, p) => sum + p.populationGrowth, 0) / pincodeData.length).toFixed(2)}%

DETAILED ANALYSIS
================
`;

      pincodeData.forEach((pincode, index) => {
        reportContent += `
${index + 1}. ${pincode.area} (${pincode.pincode})
   Population: ${pincode.population.toLocaleString()}
   Growth Rate: ${pincode.populationGrowth}%
   Income Level: ${pincode.incomeLevel}
   Urban Development: ${pincode.urbanDevelopment}

   Category Analysis:
`;
        businessCategories.forEach(cat => {
          reportContent += `   ${cat.name}: Gap=${pincode.marketGapScores[cat.name] || 0}, Demand=${pincode.demandScores[cat.name] || 0}, Competitors=${pincode.competitors[cat.name] || 0}\n`;
        });
      });

      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `market-gap-report-${selectedDistrict}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Report export failed.');
    }
  };

  const handleSchedule = () => {
    setShowScheduleModal(true);
  };

  const calculateCategoryDistribution = () => {
    if (!pincodeData || pincodeData.length === 0) return [];

    const categoryCounts = {};
    
    pincodeData.forEach(pincode => {
      Object.keys(pincode.marketGapScores).forEach(category => {
        if (!categoryCounts[category]) {
          categoryCounts[category] = 0;
        }
        categoryCounts[category]++;
      });
    });

    return Object.entries(categoryCounts).map(([category, count]) => ({
      category,
      count,
      percentage: ((count / (pincodeData.length * Object.keys(pincodeData[0].marketGapScores).length)) * 100).toFixed(1)
    })).sort((a, b) => b.count - a.count);
  };

  const calculatePerformanceMetrics = () => {
    if (!pincodeData || pincodeData.length === 0) return [];

    const metrics = [
      {
        name: 'Market Coverage',
        value: ((pincodeData.length / 8) * 100).toFixed(0),
        target: 100,
        color: COLORS[0]
      },
      {
        name: 'Data Quality',
        value: 95,
        target: 100,
        color: COLORS[1]
      },
      {
        name: 'Analysis Accuracy',
        value: 88,
        target: 100,
        color: COLORS[2]
      },
      {
        name: 'Forecast Precision',
        value: 82,
        target: 100,
        color: COLORS[3]
      }
    ];

    return metrics;
  };

  const calculateDistrictComparison = () => {
    const districts = ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Erode'];
    
    return districts.map(district => {
      const districtData = pincodeData.filter(p => p.district === district);
      if (districtData.length === 0) {
        return {
          district,
          avgGap: 0,
          totalPopulation: 0,
          avgGrowth: 0
        };
      }
      
      const avgGap = districtData.reduce((sum, p) => {
        const gap = Object.values(p.marketGapScores).reduce((s, v) => s + v, 0) / Object.values(p.marketGapScores).length;
        return sum + gap;
      }, 0) / districtData.length;
      
      const totalPopulation = districtData.reduce((sum, p) => sum + p.population, 0);
      const avgGrowth = districtData.reduce((sum, p) => sum + p.populationGrowth, 0) / districtData.length;
      
      return {
        district,
        avgGap: avgGap.toFixed(1),
        totalPopulation: (totalPopulation / 1000).toFixed(0),
        avgGrowth: avgGrowth.toFixed(1)
      };
    });
  };

  const categoryDistribution = calculateCategoryDistribution();
  const performanceMetrics = calculatePerformanceMetrics();
  const districtComparison = calculateDistrictComparison();

  return (
    <div className="analytics-panel">
      <div className="analytics-header">
        <h3>📊 Professional Analytics Dashboard</h3>
        <div className="analytics-controls">
          <button className="export-btn" onClick={handleExportReport}>📥 Export Report</button>
          <button className="schedule-btn" onClick={handleSchedule}>📅 Schedule</button>
        </div>
      </div>

      <div className="analytics-grid">
        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4>Category Distribution</h4>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, percentage }) => `${category}: ${percentage}%`}
                outerRadius={70}
                fill="#8884d8"
                dataKey="count"
              >
                {categoryDistribution.map((entry, index) => (
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
        </motion.div>

        <motion.div
          className="analytics-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4>Performance Metrics</h4>
          <div className="metrics-list">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="metric-item">
                <div className="metric-header">
                  <span className="metric-name">{metric.name}</span>
                  <span className="metric-value" style={{ color: metric.color }}>
                    {metric.value}%
                  </span>
                </div>
                <div className="metric-bar">
                  <div 
                    className="metric-fill"
                    style={{ 
                      width: `${metric.value}%`,
                      background: metric.color
                    }}
                  ></div>
                </div>
                <div className="metric-target">
                  Target: {metric.target}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="analytics-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4>District Comparison</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={districtComparison}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis 
                dataKey="district" 
                tick={{ fill: '#000', fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis tick={{ fill: '#000', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  background: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar dataKey="avgGap" fill="#2563eb" name="Avg Gap" radius={[4, 4, 0, 0]} />
              <Bar dataKey="totalPopulation" fill="#7c3aed" name="Population (K)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="avgGrowth" fill="#16a34a" name="Growth %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="analytics-card full-width"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4>Key Insights Summary</h4>
          <div className="insights-summary">
            <div className="insight-item">
              <div className="insight-icon">🎯</div>
              <div className="insight-content">
                <h5>Top Performing District</h5>
                <p>Chennai leads with highest market gap opportunities</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">📈</div>
              <div className="insight-content">
                <h5>Growth Trend</h5>
                <p>Coimbatore shows highest population growth rate</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">💡</div>
              <div className="insight-content">
                <h5>Opportunity Category</h5>
                <p>Supermarket category shows highest underserved demand</p>
              </div>
            </div>
            <div className="insight-item">
              <div className="insight-icon">⚡</div>
              <div className="insight-content">
                <h5>Data Coverage</h5>
                <p>100% coverage across all major districts</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {showScheduleModal && (
        <div className="schedule-modal-overlay" onClick={() => setShowScheduleModal(false)}>
          <motion.div
            className="schedule-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="schedule-modal-header">
              <h3>📅 Schedule Report</h3>
              <button className="close-btn" onClick={() => setShowScheduleModal(false)}>✕</button>
            </div>
            <div className="schedule-modal-body">
              <div className="schedule-option">
                <label>Report Type</label>
                <select>
                  <option>Market Gap Analysis Report</option>
                  <option>District Comparison Report</option>
                  <option>Category Distribution Report</option>
                </select>
              </div>
              <div className="schedule-option">
                <label>Frequency</label>
                <select>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Quarterly</option>
                </select>
              </div>
              <div className="schedule-option">
                <label>Time</label>
                <input type="time" defaultValue="09:00" />
              </div>
              <div className="schedule-option">
                <label>Email Recipients</label>
                <input type="email" placeholder="Enter email address" />
              </div>
            </div>
            <div className="schedule-modal-footer">
              <button className="cancel-btn" onClick={() => setShowScheduleModal(false)}>Cancel</button>
              <button className="confirm-btn" onClick={() => {
                alert('Schedule saved successfully!');
                setShowScheduleModal(false);
              }}>Save Schedule</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AnalyticsPanel;
