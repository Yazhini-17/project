import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './RealTimeDashboard.css';

function RealTimeDashboard({ data, onUpdate }) {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    let intervalId;

    if (isAutoRefresh) {
      intervalId = setInterval(() => {
        handleRefresh();
      }, refreshInterval * 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoRefresh, refreshInterval]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh - in production, this would call an API
    await new Promise(resolve => setTimeout(resolve, 500));
    setLastUpdated(new Date());
    setIsRefreshing(false);
    
    if (onUpdate) {
      onUpdate();
    }
  };

  const handleToggleRefresh = () => {
    setIsAutoRefresh(!isAutoRefresh);
  };

  const handleIntervalChange = (e) => {
    setRefreshInterval(parseInt(e.target.value));
  };

  const getTimeSinceUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdated) / 1000);
    
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <motion.div 
      className="realtime-dashboard"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="realtime-header">
        <div className="realtime-status">
          <div className={`status-indicator ${isAutoRefresh ? 'active' : 'inactive'}`}>
            <span className="status-dot"></span>
            <span className="status-text">
              {isAutoRefresh ? 'Live Updates' : 'Paused'}
            </span>
          </div>
          <span className="last-updated">Last updated: {getTimeSinceUpdate()}</span>
        </div>
        
        <div className="realtime-controls">
          <select 
            className="interval-select"
            value={refreshInterval}
            onChange={handleIntervalChange}
          >
            <option value={15}>15s</option>
            <option value={30}>30s</option>
            <option value={60}>1m</option>
            <option value={120}>2m</option>
            <option value={300}>5m</option>
          </select>
          
          <button 
            className={`refresh-toggle ${isAutoRefresh ? 'active' : ''}`}
            onClick={handleToggleRefresh}
            aria-label={isAutoRefresh ? 'Pause auto-refresh' : 'Enable auto-refresh'}
          >
            {isAutoRefresh ? '⏸' : '▶'}
          </button>
          
          <button 
            className="manual-refresh"
            onClick={handleRefresh}
            disabled={isRefreshing}
            aria-label="Refresh now"
          >
            {isRefreshing ? '⟳' : '🔄'}
          </button>
        </div>
      </div>

      <div className="realtime-metrics">
        <div className="metric-card">
          <span className="metric-label">Data Points</span>
          <span className="metric-value">{data?.length || 0}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Update Rate</span>
          <span className="metric-value">{isAutoRefresh ? `${refreshInterval}s` : 'Manual'}</span>
        </div>
        <div className="metric-card">
          <span className="metric-label">Status</span>
          <span className={`metric-value ${isAutoRefresh ? 'online' : 'offline'}`}>
            {isAutoRefresh ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default RealTimeDashboard;
