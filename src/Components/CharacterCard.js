// CharacterCard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";


// ...

function CharacterCard({ character }) {
  const [episodeInfo, setEpisodeInfo] = useState(null);

  useEffect(() => {
    // Fetch episode details when the component mounts
    fetch(character.episode[0]) // Assuming you want the first episode's details
      .then((response) => response.json())
      .then((data) => setEpisodeInfo(data))
      .catch((error) => console.error('Error fetching episode details:', error));
  }, [character.episode]);

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
    <>
      <div className="cards">
        <img
          src={character.image}
          alt={character.name}
          className="ImageOfChar"
        />

        <div style={{ padding: "13px 0px" }}>
          <Link to={`/character/${character.id}`}>
            <h2 className="NameOfChar">{character.name}</h2>
          </Link>
          <p className="NameOfStatus">
            {" "}
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
          <p className="firstSeen">Last known location:</p>
          <Link to={`/location/${character.location.url.split("/").pop()}`}>
            <p className="NameOfSpecies">{character.location.name}</p>
          </Link>
          <p className="firstSeen">First seen in:</p>
          {episodeInfo ? (
            <Link to={`/episode/${episodeInfo.id}`}>
              <p className="NameOfSpecies">{episodeInfo.name}</p>
            </Link>
          ) : (
            <p className="NameOfSpecies">Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default CharacterCard;