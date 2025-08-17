import React, { useState, useEffect } from 'react';
import './App.css';
import { useCharacters } from './hooks/useCharacters';
import CharacterCard from './components/CharacterCard';
import FilterSidebar from './components/FilterSidebar';
import CharacterGallery from './components/CharacterGallery';

function App() {
  const { allCharacters, villages, ranks, loading, error } = useCharacters();
  
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // --- State for filter selections ---
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVillage, setSelectedVillage] = useState('');
  const [selectedRank, setSelectedRank] = useState('');
  // NEW filter states
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedNature, setSelectedNature] = useState('');
  const [selectedKekkei, setSelectedKekkei] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');


  useEffect(() => {
    let filtered = allCharacters;

    if (searchQuery) {
      filtered = filtered.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (selectedVillage) {
      filtered = filtered.filter(c => c.personal?.affiliation?.includes(selectedVillage));
    }
    if (selectedRank) {
      filtered = filtered.filter(c => Object.values(c.rank?.ninjaRank || {}).includes(selectedRank));
    }
    // NEW filtering logic
    if (selectedGender) {
      filtered = filtered.filter(c => c.personal?.sex === selectedGender);
    }
    if (selectedNature) {
      filtered = filtered.filter(c => c.natureType?.includes(selectedNature));
    }
    if (selectedKekkei) {
      filtered = filtered.filter(c => c.personal?.kekkeiGenkai?.includes(selectedKekkei));
    }
    if (selectedMonth) {
      filtered = filtered.filter(c => c.personal?.birthdate?.startsWith(selectedMonth));
    }
    
    setDisplayedCharacters(filtered);
  }, [searchQuery, selectedVillage, selectedRank, selectedGender, selectedNature, selectedKekkei, selectedMonth, allCharacters]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedVillage('');
    setSelectedRank('');
    // NEW: Reset new filters as well
    setSelectedGender('');
    setSelectedNature('');
    setSelectedKekkei('');
    setSelectedMonth('');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Naruto Character Encyclopedia</h1>
      </header>

      <FilterSidebar
        searchQuery={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
        selectedVillage={selectedVillage}
        onVillageChange={(e) => setSelectedVillage(e.target.value)}
        villages={villages}
        selectedRank={selectedRank}
        onRankChange={(e) => setSelectedRank(e.target.value)}
        ranks={ranks}
        // Pass new state and handlers
        selectedGender={selectedGender}
        onGenderChange={(e) => setSelectedGender(e.target.value)}
        selectedNature={selectedNature}
        onNatureChange={(e) => setSelectedNature(e.target.value)}
        selectedKekkei={selectedKekkei}
        onKekkeiChange={(e) => setSelectedKekkei(e.target.value)}
        selectedMonth={selectedMonth}
        onMonthChange={(e) => setSelectedMonth(e.target.value)}
        allCharacters={allCharacters} // Pass allCharacters to derive filter options
        onClearFilters={handleClearFilters}
      />

      <main className="main-content">
        {selectedCharacter ? (
          <>
            <button className="clear-button" onClick={() => setSelectedCharacter(null)}>
              Clear Selection
            </button>
            <CharacterCard character={selectedCharacter} />
          </>
        ) : (
          <div>
            <h2>Character Details</h2>
            <p>Select a character from the gallery to see their details.</p>
          </div>
        )}
      </main>

      <CharacterGallery
        characters={displayedCharacters}
        onSelect={setSelectedCharacter}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;