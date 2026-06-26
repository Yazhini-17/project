import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './EnhancedExport.css';

function EnhancedExport({ data, selectedDistrict, businessCategories }) {
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);

    try {
      switch (exportFormat) {
        case 'csv':
          await exportToCSV();
          break;
        case 'json':
          await exportToJSON();
          break;
        default:
          await exportToCSV();
      }
    } catch (error) {
      // Export failed silently
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = async () => {
    if (!data || data.length === 0) {
      return;
    }

    try {
      let headers = ['Pincode', 'Area', 'District', 'Population', 'Growth Rate', 'Income Level', 'Urban Development'];

      businessCategories.forEach(cat => {
        headers.push(`${cat.name} Competitors`);
        headers.push(`${cat.name} Demand Score`);
        headers.push(`${cat.name} Market Gap Score`);
      });

      let csvRows = [headers.join(',')];

      data.forEach(pincode => {
        const row = [
          pincode.pincode,
          pincode.area,
          pincode.district,
          pincode.population,
          pincode.populationGrowth,
          pincode.incomeLevel,
          pincode.urbanDevelopment
        ];

        businessCategories.forEach(cat => {
          row.push((pincode.competitors && pincode.competitors[cat.name]) || 0);
          row.push((pincode.demandScores && pincode.demandScores[cat.name]) || 0);
          row.push((pincode.marketGapScores && pincode.marketGapScores[cat.name]) || 0);
        });

        csvRows.push(row.join(','));
      });

      let csvContent = csvRows.join('\n');
      downloadFile(csvContent, `market-gap-analysis-${selectedDistrict}.csv`, 'text/csv');
    } catch (error) {
      // CSV export error
    }
  };



  const exportToJSON = async () => {
    if (!data || data.length === 0) {
      return;
    }

    try {
      const jsonData = {
        metadata: {
          district: selectedDistrict,
          exportDate: new Date().toISOString(),
          totalPincodes: data.length,
          businessCategories: businessCategories.map(cat => cat.name)
        },
        data: data.map(pincode => ({
          pincode: pincode.pincode,
          area: pincode.area,
          district: pincode.district,
          population: pincode.population,
          populationGrowth: pincode.populationGrowth,
          incomeLevel: pincode.incomeLevel,
          urbanDevelopment: pincode.urbanDevelopment,
          competitors: pincode.competitors,
          demandScores: pincode.demandScores,
          marketGapScores: pincode.marketGapScores
        }))
      };

      const jsonContent = JSON.stringify(jsonData, null, 2);
      downloadFile(jsonContent, `market-gap-analysis-${selectedDistrict}.json`, 'application/json');
    } catch (error) {
      // JSON export error
    }
  };

  const downloadFile = (content, filename, mimeType) => {
    try {
      // Add UTF-8 BOM for CSV/Text files to ensure character compatibility
      const isText = mimeType.includes('text') || mimeType.includes('csv');
      const blobContent = isText ? ['\ufeff', content] : [content];
      
      const blob = new Blob(blobContent, { type: `${mimeType};charset=utf-8` });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      // Download failed
    }
  };

  const formatOptions = [
    { value: 'csv', label: 'CSV', icon: '📊', description: 'Comma-separated values' },
    { value: 'json', label: 'JSON', icon: '🔧', description: 'Structured data format' }
  ];

  return (
    <div className="enhanced-export">
      <div className="export-header">
        <h3>📥 Enhanced Export</h3>
        <button 
          className="options-toggle"
          onClick={() => setShowOptions(!showOptions)}
        >
          {showOptions ? '▼' : '▶'} Options
        </button>
      </div>

      <motion.div 
        className="export-options"
        initial={{ height: 'auto' }}
        animate={{ height: showOptions ? 'auto' : '0px' }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="format-selector">
          <h4>Select Format</h4>
          <div className="format-grid">
            {formatOptions.map(format => (
              <div
                key={format.value}
                className={`format-card ${exportFormat === format.value ? 'selected' : ''}`}
                onClick={() => setExportFormat(format.value)}
              >
                <span className="format-icon">{format.icon}</span>
                <span className="format-label">{format.label}</span>
                <span className="format-description">{format.description}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="export-summary">
          <h4>Export Summary</h4>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">District</span>
              <span className="summary-value">{selectedDistrict}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Pincodes</span>
              <span className="summary-value">{data?.length || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Categories</span>
              <span className="summary-value">{businessCategories?.length || 0}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Format</span>
              <span className="summary-value">{exportFormat.toUpperCase()}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <button 
        className="export-button"
        onClick={handleExport}
        disabled={isExporting || !data || data.length === 0}
      >
        {isExporting ? 'Exporting...' : `Export as ${exportFormat.toUpperCase()}`}
      </button>
    </div>
  );
}

export default EnhancedExport;
