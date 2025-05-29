import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './SortDropdown.css';

const SortDropdown = ({ options, selectedOption, onOptionSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const handleApply = () => {
    setIsOpen(false); // close dropdown on apply
  };

  return (
    <div className="sort-dropdown-container">
      <button
        className="sort-dropdown-trigger"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>Sort by: {selectedOption.label}</span>
        <ChevronDown size={16} className={isOpen ? "rotate-180" : ""} />
      </button>

      {isOpen && (
        <div className="sort-dropdown-menu">
          <ul role="listbox" className="sort-dropdown-options-list">
            {options.map((option) => (
              <li
                key={`${option.value}-${option.direction}`}
                className={`sort-dropdown-option ${selectedOption.value === option.value && selectedOption.direction === option.direction ? 'selected' : ''}`}
                onClick={() => handleOptionSelect(option)}
                role="option"
                aria-selected={selectedOption.value === option.value && selectedOption.direction === option.direction}
              >
                <span>{option.label}</span>
                {selectedOption.value === option.value && selectedOption.direction === option.direction && (
                  <span className="checkmark">✓</span>
                )}
              </li>
            ))}
          </ul>
          
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
