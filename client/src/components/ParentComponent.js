import React, { useState } from "react";
import LogoSearch from "./LogoSearch"; // Adjust the path as necessary

const ParentComponent = () => {
  const [followers, setFollowers] = useState([]); // Store the fetched followers
  const [searchResults, setSearchResults] = useState([]); // Store search results

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/followers/search?q=${query}`); // Call the search API
      const data = await response.json();
      console.log('Search Results:', data); // Log the search results
      setSearchResults(data); // Update search results
    } catch (error) {
      console.error('Error fetching followers:', error); // Log any errors
    }
  };

  return (
    <div>
      <h1>Follower Search</h1>
      <LogoSearch onSearch={handleSearch} /> {/* Pass the handleSearch function as a prop */}
      <ul>
        {searchResults.length > 0 ? (
          searchResults.map((follower) => (
            <li key={follower._id}>{follower.name} - {follower.email}</li>
          ))
        ) : (
          <li>No followers found.</li>
        )}
      </ul>
    </div>
  );
};

export default ParentComponent;
