import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import { fetchCharacters } from '../api';
import './style.css';

function CharacterGrid() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchCharacters(currentPage)
      .then((data) => setCharacters(data))
      .catch((error) => console.error('Error fetching characters:', error));
  }, [currentPage]);

  // Function to load more characters when the "Load More" button is clicked
  const loadMoreCharacters = () => {
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  
    // Increment the current page
    setCurrentPage((prevPage) => prevPage + 1);
  };
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div style={{ background: '#272b33' }}>
      <div className="character-grid">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      <button onClick={loadMoreCharacters}
      className='loadMore'
      >Load More</button>

      {/* Sticky icons for scrolling */}
      <div className="scroll-icons">
        <button className="scroll-icon" onClick={scrollToTop}>
          <i className="fa fa-arrow-up"></i> {/* Up arrow icon */}
        </button>
        <button className="scroll-icon" onClick={scrollToBottom}>
          <i className="fa fa-arrow-down"></i> {/* Down arrow icon */}
        </button>
      </div>
    </div>
  );
}

export default CharacterGrid;
