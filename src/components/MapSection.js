import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet';
import './MapSection.css';

function MapSection({ pincodeData, selectedDistrict }) {
  const center = {
    'Chennai': [13.0827, 80.2707],
    'Coimbatore': [11.0168, 76.9558],
    'Madurai': [9.9252, 78.1197],
    'Tiruchirappalli': [10.7905, 78.7047],
    'Salem': [11.6643, 78.1460],
    'Erode': [11.3410, 77.7172]
  };

  const getGapColor = (avgGapScore) => {
    if (avgGapScore >= 80) return { fill: '#e74c3c', stroke: '#c0392b', label: 'High Opportunity' };
    if (avgGapScore >= 70) return { fill: '#f39c12', stroke: '#e67e22', label: 'Medium Opportunity' };
    return { fill: '#27ae60', stroke: '#229954', label: 'Low Opportunity' };
  };

  const getRadiusByPopulation = (population) => {
    return Math.max(15, Math.min(40, population / 3000));
  };

  return (
    <div className="map-section">
      <div className="map-card">
        <h3>🗺️ Market Gap Heat Map - {selectedDistrict}</h3>
        <p className="map-subtitle">Circle size represents population, color represents market opportunity</p>
        
        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-circle high"></span>
            <span>High Opportunity (≥80)</span>
          </div>
          <div className="legend-item">
            <span className="legend-circle medium"></span>
            <span>Medium Opportunity (70-79)</span>
          </div>
          <div className="legend-item">
            <span className="legend-circle low"></span>
            <span>Low Opportunity (&lt;70)</span>
          </div>
        </div>

        <MapContainer center={center[selectedDistrict] || [11.0168, 76.9558]} zoom={11} style={{ height: '450px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {pincodeData.map((pincode, index) => {
            const avgGapScore = Object.values(pincode.marketGapScores).reduce((a, b) => a + b, 0) / Object.keys(pincode.marketGapScores).length;
            const colors = getGapColor(avgGapScore);
            const radius = getRadiusByPopulation(pincode.population);
            
            return (
              <CircleMarker 
                key={index} 
                center={[pincode.lat, pincode.lng]}
                radius={radius}
                pathOptions={{
                  color: colors.stroke,
                  fillColor: colors.fill,
                  fillOpacity: 0.6,
                  weight: 2
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <h4>{pincode.area} ({pincode.pincode})</h4>
                    <p><strong>District:</strong> {pincode.district}</p>
                    <p><strong>Population:</strong> {pincode.population.toLocaleString()}</p>
                    <p><strong>Population Growth:</strong> {pincode.populationGrowth}%</p>
                    <p><strong>Income Level:</strong> {pincode.incomeLevel}</p>
                    <p><strong>Urban Development:</strong> {pincode.urbanDevelopment}/100</p>
                    <p><strong>Search Trends:</strong> {pincode.searchTrends}/100</p>
                    <hr />
                    <p><strong>Avg Market Gap Score:</strong> <span style={{ color: colors.fill, fontWeight: 'bold', fontSize: '1.1rem' }}>{avgGapScore.toFixed(1)}</span></p>
                    <div className="popup-categories">
                      <strong>Top Categories:</strong>
                      {Object.entries(pincode.marketGapScores)
                        .sort(([, a], [, b]) => b - a)
                        .slice(0, 3)
                        .map(([cat, score]) => (
                          <div key={cat} className="popup-category">
                            <span>{cat}:</span>
                            <span style={{ color: colors.fill, fontWeight: 'bold' }}>{score}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapSection;
