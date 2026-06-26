import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts';
import './ChartsSection.css';

const COLORS = ['#667eea', '#764ba2', '#f39c12', '#27ae60', '#e74c3c', '#3498db', '#9b59b6', '#1abc9c'];

function ChartsSection({ businessCategories, selectedCategory, pincodeData }) {
  const filteredCategories = selectedCategory === 'all' 
    ? businessCategories 
    : businessCategories.filter(cat => cat.name === selectedCategory);

  // Prepare demand forecasting data
  const forecastData = pincodeData.map(pincode => ({
    name: pincode.pincode,
    currentDemand: Object.values(pincode.demandScores).reduce((a, b) => a + b, 0) / Object.keys(pincode.demandScores).length,
    projectedDemand: Object.values(pincode.demandScores).reduce((a, b) => a + b, 0) / Object.keys(pincode.demandScores).length + (pincode.populationGrowth * 2),
    populationGrowth: pincode.populationGrowth,
    searchTrends: pincode.searchTrends
  }));

  // Prepare market gap score distribution
  const gapDistribution = pincodeData.flatMap(pincode => 
    Object.entries(pincode.marketGapScores).map(([category, score]) => ({
      category,
      score,
      pincode: pincode.pincode
    }))
  ).reduce((acc, { category, score }) => {
    if (!acc[category]) acc[category] = 0;
    acc[category] += score;
    return acc;
  }, {});

  const gapChartData = Object.entries(gapDistribution).map(([category, score]) => ({
    name: category,
    score: Math.round(score / pincodeData.length)
  }));

  return (
    <div className="charts-section">
      <div className="chart-card">
        <h3>Demand vs Supply Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredCategories}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="demand" fill="#667eea" name="Demand" />
            <Bar dataKey="supply" fill="#764ba2" name="Supply" />
            <Bar dataKey="gap" fill="#e74c3c" name="Gap" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Demand Forecasting</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="currentDemand" stroke="#667eea" name="Current Demand" strokeWidth={2} />
            <Line type="monotone" dataKey="projectedDemand" stroke="#27ae60" name="Projected Demand" strokeWidth={2} strokeDasharray="5 5" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Market Gap Score Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={gapChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="score" fill="#e74c3c" name="Avg Market Gap Score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Business Category Gap Share</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={gapChartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, score }) => `${name}: ${score}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="score"
            >
              {gapChartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ChartsSection;
