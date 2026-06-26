import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import './AdvancedKPICards.css';

function AdvancedKPICards({ data, selectedDistrict }) {
  const calculateTrend = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return '↑';
    if (trend < 0) return '↓';
    return '→';
  };

  const getTrendColor = (trend) => {
    if (trend > 0) return 'var(--success)';
    if (trend < 0) return 'var(--danger)';
    return 'var(--text-light)';
  };

  const generateSparklineData = (baseValue, points = 7) => {
    const sparkData = [];
    for (let i = 0; i < points; i++) {
      const variation = (Math.random() - 0.5) * baseValue * 0.2;
      sparkData.push({
        value: Math.max(0, baseValue + variation)
      });
    }
    return sparkData;
  };

  const kpiData = [
    {
      title: 'Total Market Gap',
      value: data?.reduce((sum, pincode) => {
        const avgGap = Object.values(pincode.marketGapScores).reduce((s, v) => s + v, 0) / Object.values(pincode.marketGapScores).length;
        return sum + avgGap;
      }, 0) || 0,
      previousValue: 450,
      format: 'number',
      sparkline: true,
      trend: calculateTrend(
        data?.reduce((sum, pincode) => {
          const avgGap = Object.values(pincode.marketGapScores).reduce((s, v) => s + v, 0) / Object.values(pincode.marketGapScores).length;
          return sum + avgGap;
        }, 0) || 0,
        450
      )
    },
    {
      title: 'High Opportunity Areas',
      value: data?.filter(pincode => {
        const avgGap = Object.values(pincode.marketGapScores).reduce((s, v) => s + v, 0) / Object.values(pincode.marketGapScores).length;
        return avgGap >= 80;
      }).length || 0,
      previousValue: 3,
      format: 'number',
      sparkline: true,
      trend: calculateTrend(
        data?.filter(pincode => {
          const avgGap = Object.values(pincode.marketGapScores).reduce((s, v) => s + v, 0) / Object.values(pincode.marketGapScores).length;
          return avgGap >= 80;
        }).length || 0,
        3
      )
    },
    {
      title: 'Avg Demand Score',
      value: data?.reduce((sum, pincode) => {
        const avgDemand = Object.values(pincode.demandScores).reduce((s, v) => s + v, 0) / Object.values(pincode.demandScores).length;
        return sum + avgDemand;
      }, 0) / (data?.length || 1) || 0,
      previousValue: 75,
      format: 'percentage',
      sparkline: true,
      trend: calculateTrend(
        data?.reduce((sum, pincode) => {
          const avgDemand = Object.values(pincode.demandScores).reduce((s, v) => s + v, 0) / Object.values(pincode.demandScores).length;
          return sum + avgDemand;
        }, 0) / (data?.length || 1) || 0,
        75
      )
    },
    {
      title: 'Total Population',
      value: data?.reduce((sum, pincode) => sum + pincode.population, 0) || 0,
      previousValue: 850000,
      format: 'population',
      sparkline: true,
      trend: calculateTrend(
        data?.reduce((sum, pincode) => sum + pincode.population, 0) || 0,
        850000
      )
    },
    {
      title: 'Avg Growth Rate',
      value: data?.reduce((sum, pincode) => sum + pincode.populationGrowth, 0) / (data?.length || 1) || 0,
      previousValue: 3.2,
      format: 'percentage',
      sparkline: true,
      trend: calculateTrend(
        data?.reduce((sum, pincode) => sum + pincode.populationGrowth, 0) / (data?.length || 1) || 0,
        3.2
      )
    },
    {
      title: 'Urban Development',
      value: data?.reduce((sum, pincode) => sum + pincode.urbanDevelopment, 0) / (data?.length || 1) || 0,
      previousValue: 72,
      format: 'number',
      sparkline: true,
      trend: calculateTrend(
        data?.reduce((sum, pincode) => sum + pincode.urbanDevelopment, 0) / (data?.length || 1) || 0,
        72
      )
    }
  ];

  const formatValue = (value, format) => {
    switch (format) {
      case 'percentage':
        return `${value.toFixed(1)}%`;
      case 'population':
        return value.toLocaleString();
      case 'number':
      default:
        return value.toFixed(0);
    }
  };

  return (
    <div className="advanced-kpi-cards">
      {kpiData.map((kpi, index) => (
        <motion.div
          key={index}
          className="kpi-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, scale: 1.02 }}
        >
          <div className="kpi-header">
            <h4 className="kpi-title">{kpi.title}</h4>
            <div className="kpi-trend" style={{ color: getTrendColor(kpi.trend) }}>
              <span className="trend-icon">{getTrendIcon(kpi.trend)}</span>
              <span className="trend-value">{Math.abs(kpi.trend).toFixed(1)}%</span>
            </div>
          </div>

          <div className="kpi-value">
            {formatValue(kpi.value, kpi.format)}
          </div>

          {kpi.sparkline && (
            <div className="kpi-sparkline">
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={generateSparklineData(kpi.value)}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={getTrendColor(kpi.trend)}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'var(--card-light)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          <div className="kpi-footer">
            <span className="kpi-label">vs previous period</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default AdvancedKPICards;
