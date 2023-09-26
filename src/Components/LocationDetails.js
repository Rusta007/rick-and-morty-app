import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import "./style.css"

function LocationDetails() {
  const { id } = useParams();
  const [location, setLocation] = useState(null);
  const [residentDetails, setResidentDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Initial loading state
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Construct the URL for the location API
    const apiUrl = `https://rickandmortyapi.com/api/location/${id}`;

    // Make the API request to fetch location details
    axios.get(apiUrl)
      .then((response) => {
        setLocation(response.data);
        // Extract resident URLs and fetch details for the first 5 residents
        const residentUrls = response.data.residents.slice(0, 5);
        const residentPromises = residentUrls.map((residentUrl) =>
          axios.get(residentUrl).then((res) => res.data)
        );
        Promise.all(residentPromises)
          .then((residentData) => {
            setResidentDetails(residentData);
            setLoading(false); // Set loading to false when data is loaded
          })
          .catch((error) => {
            setError('Error fetching resident details');
            setLoading(false); // Set loading to false on error
          });
      })
      .catch((error) => {
        setError('Location not found!');
        setLoading(false); // Set loading to false on error
      });
  }, [id]);

  const loadMoreResidents = () => {
    setLoadingMore(true);
    // Fetch details for the next 5 residents
    const residentUrls = location.residents.slice(residentDetails.length, residentDetails.length + 5);
    const residentPromises = residentUrls.map((residentUrl) =>
      axios.get(residentUrl).then((res) => res.data)
    );
    Promise.all(residentPromises)
      .then((residentData) => {
        setResidentDetails((prevResidents) => [...prevResidents, ...residentData]);
        setLoadingMore(false);
      })
      .catch((error) => {
        setError('Error fetching additional resident details');
        setLoadingMore(false);
      });
  };

  if (loading) {
    return <div>  <img src="https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif" alt="Loading..." style={{width: "100%" ,marginTop: "-12%"}}/></div>;
  }

  if (error) {
    return <div>
      <img src='https://freefrontend.com/assets/img/tailwind-404-page-templates/404-page-not-found.png' alt='Location not found!'/>
    </div>;
  }

  return (
    <div className='character-details'>
    <div className='cardAllDetails'>
        <p className='title'>{location.name}</p>
      <p className='title'>Type: {location.type}</p>
      <p className='title'>Dimension: {location.dimension}</p>
      <p className='title'>Amount of Residents: {location.residents.length}</p>
      <dl style={{listStyleType:"none", background: "#52555b"}}>
        {residentDetails.map((resident) => (
          <dd key={resident.id}>
            <Link to={`/character/${resident.id}`}>
              <img src={resident.image} alt={resident.name} className='EpisodeImg'/>
            </Link>
          </dd>
        ))}
      </dl>
      {residentDetails.length < location.residents.length && (
        <button onClick={loadMoreResidents} disabled={loadingMore} className='loadMore '>
          {loadingMore ? 'Loading...' : 'Load More Residents'}
        </button>
      )}
    </div>
    </div>
  );
}

export default LocationDetails;
