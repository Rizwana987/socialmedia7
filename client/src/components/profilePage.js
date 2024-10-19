// src/components/ProfilePage.js
import React, { useState } from 'react';
import LogoSearch from './LogoSearch'; // Adjust the path as necessary
import FollowersCard from './FollowersCard'; // Adjust the path as necessary
import InfoCard from './InfoCard'; // If you have an InfoCard, include it

const ProfilePage = () => {
  const [searchResults, setSearchResults] = useState([]); // State for search results

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/followers/search?q=${query}`); // Call the search API
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSearchResults(data); // Set search results in state
      console.log('Search Results:', data); // Log search results for debugging
    } catch (error) {
      console.error('Error fetching followers:', error); // Log errors
    }
  };

  return (
    <div className="ProfilePage">
      <div className="ProfileSide">
        <LogoSearch onSearch={handleSearch} /> {/* Pass the handleSearch function */}
        <InfoCard /> {/* Include InfoCard if you have one */}
      </div>
      <div className="MainContent">
        <FollowersCard followers={searchResults} /> {/* Pass search results to FollowersCard */}
      </div>
    </div>
  );
};

export default ProfilePage;
