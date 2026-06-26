import React from 'react';
import './FilterPanel.css';

function FilterPanel({ onFilter, selectedCategory, categories }) {
  const allCategories = ['all', ...categories.map(cat => cat.name)];

  return (
    <div className="filter-panel">
      <h3>Filter by Business Category</h3>
      <div className="filter-buttons">
        {allCategories.map((category) => (
          <button
            key={category}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterPanel;
