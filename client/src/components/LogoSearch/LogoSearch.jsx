import React, { useState } from "react";
import Logo from "../../img/logo.png";
import './LogoSearch.css';
import { UilSearch } from '@iconscout/react-unicons';

const LogoSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) { // Ensure query is not just whitespace
      onSearch(query); // Call the onSearch function passed from the parent component
      setQuery(''); // Clear the input field after search
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch(); // Trigger search on Enter key press
    }
  };

  return (
    <div className="LogoSearch">
      <img src={Logo} alt="Logo" />
      <div className="Search">
        <input
          type="text"
          placeholder="#Explore"
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query state on input change
          onKeyDown={handleKeyDown} // Listen for key down
        />
        <div className="s-icon" onClick={handleSearch}> {/* Call handleSearch on icon click */}
          <UilSearch />
        </div>
      </div>
    </div>
  );
};

export default LogoSearch;
