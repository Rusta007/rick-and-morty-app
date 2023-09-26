import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CharacterGrid from "./Components/CharacterGrid";
import CharacterDetails from "./Components/CharacterDetails";
import SearchResults from "./Components/SearchResults"; // Create a component for search results
import Navbar from "./Components/Navbar"; // Import the Navbar component
import OriginDetails from "./Components/OriginDetails";
import EpisodeDetails from "./Components/EpisodeDetails";
import LocationDetails from "./Components/LocationDetails";
import '../src/Components/style.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar /> 
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/location/:id" element={<LocationDetails />} />
          <Route path="/episode/:id" element={<EpisodeDetails />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/origin/:id" element={<OriginDetails />} />
          <Route path="/" element={<CharacterGrid />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
