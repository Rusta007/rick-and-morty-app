import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "./style.css"

function EpisodeDetails() {
  const { id } = useParams();
  const [episode, setEpisode] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Construct the URL for the episode API
    const apiUrl = `https://rickandmortyapi.com/api/episode/${id}`;

    // Make the API request to fetch episode details
    axios.get(apiUrl)
      .then((response) => {
        setEpisode(response.data);
        // Extract character URLs and fetch details for the first 5 characters
        const characterUrls = response.data.characters.slice(0, 5);
        const characterPromises = characterUrls.map((characterUrl) =>
          axios.get(characterUrl).then((res) => res.data)
        );
        Promise.all(characterPromises)
          .then((characterData) => {
            setCharacters(characterData);
            setLoading(false); // Set loading to false when data is loaded
          })
          .catch((error) => {
            setError('Error fetching character details');
            setLoading(false); // Set loading to false on error
          });
      })
      .catch((error) => {
        setError("Episode not found");
        setLoading(false); // Set loading to false on error
      });
  }, [id]);

  const loadMoreCharacters = () => {
    setLoadingMore(true);
    // Fetch details for the next 5 characters
    const characterUrls = episode.characters.slice(characters.length, characters.length + 5);
    const characterPromises = characterUrls.map((characterUrl) =>
      axios.get(characterUrl).then((res) => res.data)
    );
    Promise.all(characterPromises)
      .then((characterData) => {
        setCharacters((prevCharacters) => [...prevCharacters, ...characterData]);
        setLoadingMore(false);
      })
      .catch((error) => {
        setError('Error fetching additional character details');
        setLoadingMore(false);
      });
  };

  if (loading) {
    return <div> 
        <img src="https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif" alt="Loading..." style={{width: "100%" ,marginTop: "-12%"}}/>
    </div>;
  }

  if (error) {
    return <div> <img src='https://freefrontend.com/assets/img/tailwind-404-page-templates/404-page-not-found.png' alt='Episode not found!' width="100%"/>
    </div>;
  }

  return (
    <div className='character-details'>
    <div className='cardAllDetails'>
      {/* <h2>Episode Details</h2> */}
      <p className='title'>{episode.name}</p>
      <p className='title'>Episode: {episode.episode}</p>
      <p className='title'> Air Date: {episode.air_date}</p>
      <p className='title'>Characters:{episode.characters.length}</p>
      <dl style={{listStyleType:"none", background: "#52555b"}}>
        {characters.map((character) => (
          <dd key={character.id}>
            <Link to={`/character/${character.id}`}>
              <img src={character.image} alt={character.name} className='EpisodeImg'/>
            </Link>
          </dd>
        ))}
      </dl>
      {characters.length < episode.characters.length && (
        <button onClick={loadMoreCharacters} disabled={loadingMore} className='loadMore '>
          {loadingMore ? 'Loading...' : 'Load More Characters'}
        </button>
      )}
    </div>
    </div>
  );
}

export default EpisodeDetails;
