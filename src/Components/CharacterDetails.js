import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCharacterDetails, fetchEpisodeInfo } from "../api";
import "./style.css";

function CharacterDetails() { // Updated component name
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodeInfo, setEpisodeInfo] = useState(null);

  useEffect(() => {
    // Fetch character details
    fetchCharacterDetails(id)
      .then((data) => {
        setCharacter(data);

        // Fetch episode info only if character data is available
        fetchEpisodeInfo(data?.episode[0])
          .then((episodeData) => setEpisodeInfo(episodeData))
          .catch((error) => console.error("Error fetching episode details:", error));
      })
      .catch((error) => console.error("Error fetching character details:", error));
  }, [id]);

  if (!character || !episodeInfo) {
    return <div>
      <img src="https://i.pinimg.com/originals/90/80/60/9080607321ab98fa3e70dd24b2513a20.gif" alt="Loading..." style={{width: "100%" ,marginTop: "-12%"}}/>
    </div>;
  }

  function getStatusColor(status) {
    switch (status) {
      case "Alive":
        return "green";
      case "Dead":
        return "red";
      default:
        return "gray";
    }
  }

  return (
    <div className="character-details">
      <div className="cardAllDetails">
        <img
          src={character.image}
          alt={character.name}
          style={{ borderRadius: "17px 17px 0px 0px"}} className="detailsImg"/>
        <h2 className='title'>{character.name}</h2>
        <p className='title'>
          <span
            style={{
              paddingRight: "5px",
              color: getStatusColor(character.status),
            }}
          >
            ●
          </span>
          {character.status} - {character.species}
        </p>
        <p className='title'>Gender: {character.gender}</p>
        <p className='title'>Type: {character.type}</p>
        <p className='title'>
          Origin:{" "}
          {character.origin.url ? (
            <Link to={`/location/${character.origin.url.split("/").pop()}`}>
              {character.origin.name}
            </Link>
          ) : (
            character.origin.name
          )}
        </p>

        <p className='title'>
          Location:{" "}
          <Link to={`/location/${character.location.url.split("/").pop()}`}>
            {character.location.name}
          </Link>
        </p>

        <p className='title'>Episode:
          <Link to={`/episode/${id}`}> {episodeInfo.name}</Link>
        </p>
      </div>
    </div>
  );
}

export default CharacterDetails;
