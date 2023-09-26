import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import imageLogo from './Screenshot 2023-09-25 233753.png'
import './style.css'

function Navbar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to the search results page with the search term as a query parameter
    navigate(`/search?name=${searchTerm}`);
    setSearchTerm("")
  };

  return (
    <div className="navbar">
      <Link to="/" className="navbar-logo">
       <img src={imageLogo} width={"60px"}/>
       <span className='titleNav'>Rick & Morty Character</span>
       </Link>
       <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}

export default Navbar;
