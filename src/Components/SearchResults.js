import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCharacters } from '../api'; // Assuming you have an API function for fetching characters
import CharacterCard from './CharacterCard'; // Assuming you have a CharacterCard component

function SearchResults() {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      // Extract the search term from the query parameter
      const searchParams = new URLSearchParams(location.search);
      const nameParam = searchParams.get('name');
      if (nameParam) {
        setSearchTerm(nameParam);
        // Fetch characters based on the search term
        fetchCharactersByName(nameParam);
      }
    }, [location.search]);
  
    const fetchCharactersByName = async (name) => {
      try {
        const characters = await fetchCharacters(1); // Assuming page 1 for search results
        // Filter characters by name
        const filteredCharacters = characters.filter(
          (character) =>
            character.name.toLowerCase().includes(name.toLowerCase())
        );
        setSearchResults(filteredCharacters);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };
  
    return (
      <div className="search-results">
        <h2>Search Results for "{searchTerm}"</h2>
        <div className="character-grid">
          {searchResults.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </div>
    );
  }
  
  export default SearchResults;
  