import React from 'react';

// A helper to get unique, sorted values from the character data
const getUniqueOptions = (characters, keyAccessor) => {
  const allValues = characters.flatMap(keyAccessor).filter(Boolean);
  return [...new Set(allValues)].sort();
};

const FilterSidebar = (props) => {
  const {
    searchQuery, onSearchChange,
    selectedVillage, onVillageChange, villages,
    selectedRank, onRankChange, ranks,
    selectedGender, onGenderChange,
    selectedNature, onNatureChange,
    selectedKekkei, onKekkeiChange,
    selectedMonth, onMonthChange,
    allCharacters, onClearFilters
  } = props;

  // Derive unique options for dynamic filters
  const natureTypes = getUniqueOptions(allCharacters, c => c.natureType);
  const kekkeiGenkai = getUniqueOptions(allCharacters, c => c.personal?.kekkeiGenkai);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <aside className="filters-sidebar">
      <div className="filters-header">
        <h2>Filters</h2>
        <button onClick={onClearFilters} className="clear-filters-button">Clear</button>
      </div>
      
      <input type="text" placeholder="Search by name..." value={searchQuery} onChange={onSearchChange} />
      
      <select value={selectedVillage} onChange={onVillageChange}>
        <option value="">All Villages</option>
        {villages.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
      </select>

      <select value={selectedRank} onChange={onRankChange}>
        <option value="">All Ranks</option>
        {ranks.map(r => <option key={r} value={r}>{r}</option>)}
      </select>

      {/* --- NEW FILTERS --- */}
      <select value={selectedGender} onChange={onGenderChange}>
        <option value="">All Genders</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      
      <select value={selectedNature} onChange={onNatureChange}>
        <option value="">All Chakra Natures</option>
        {natureTypes.map(n => <option key={n} value={n}>{n.replace(' (Affinity)', '')}</option>)}
      </select>

      <select value={selectedKekkei} onChange={onKekkeiChange}>
        <option value="">All Kekkei Genkai</option>
        {kekkeiGenkai.map(k => <option key={k} value={k}>{k}</option>)}
      </select>

      <select value={selectedMonth} onChange={onMonthChange}>
        <option value="">All Birth Months</option>
        {months.map(m => <option key={m} value={m}>{m}</option>)}
      </select>
    </aside>
  );
};

export default FilterSidebar;