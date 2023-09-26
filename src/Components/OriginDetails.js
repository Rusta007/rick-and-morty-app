import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchEpisodeInfo } from '../api';
import './style.css';

function OriginDetails() {
  const { id } = useParams();
  const [originInfo, setOriginInfo] = useState(null);

  useEffect(() => {
    // Fetch origin details using the provided id
    // You can use the id parameter to fetch data from the API
    // Replace the following line with your API request
    // Example: fetchOriginDetails(id).then((data) => setOriginInfo(data));
  }, [id]);

  if (!originInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="origin-details">
      <h2>Origin: {originInfo.name}</h2>
      {/* Display other origin details here */}
    </div>
  );
}

export default OriginDetails;
