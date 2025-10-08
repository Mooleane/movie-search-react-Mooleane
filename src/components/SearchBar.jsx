import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import '../styles/SearchBar.css';

export default function SearchBar({
  value,
  onChange,
  onClear,
  placeholder = "Search for movies...",
  disabled = false
}) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(localValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-input-container">
        <div className="search-icon-container">
          <MagnifyingGlassIcon className="search-icon" aria-hidden="true" />
        </div>
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="search-input"
          aria-label="Search movies"
        />
        {localValue && (
          <div className="clear-button-container">
            <button
              type="button"
              onClick={handleClear}
              className="clear-button"
              aria-label="Clear search"
            >
              <XMarkIcon className="clear-icon" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}