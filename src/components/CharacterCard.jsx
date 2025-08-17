import React, { useState, useEffect } from 'react';

const CharacterCard = ({ character }) => {
  // State to track which image to show (0 for Part I, 1 for Part II, etc.)
  const [imageIndex, setImageIndex] = useState(0);

  // Effect to reset the image to the first one whenever the character prop changes
  useEffect(() => {
    setImageIndex(0);
  }, [character]);

  // --- Helper functions to safely get and format data ---
  const getLatestRank = () => {
    const rank = character.rank?.ninjaRank;
    if (!rank) return 'N/A';
    return rank['Part II'] || rank.Gaiden || rank['Blank Period'] || rank['Part I'] || 'N/A';
  };

  const getPrimaryAffiliation = () => character.personal?.affiliation?.[0] || 'Unknown';
  
  const getClassification = () => {
    const classification = character.personal?.classification;
    if (!classification) return 'N/A';
    return Array.isArray(classification) ? classification.join(', ') : classification;
  };
  
  const getLatestHeight = () => {
    const height = character.personal?.height;
    if (!height) return 'N/A';
    return height['Part II'] || height['Blank Period'] || height['Gaiden'] || height['Part I'] || 'N/A';
  };

  const getNatureTypes = () => {
    const natureTypes = character.natureType;
    if (!natureTypes || natureTypes.length === 0) return 'N/A';
    return natureTypes.map(type => type.replace(' (Affinity)', '')).join(', ');
  };

  const getAge = () => {
    const age = character.personal?.age;
    if (!age) return 'N/A';
    const parts = [];
    if (age['Part I']) parts.push(`Part I: ${age['Part I']}`);
    if (age['Part II']) parts.push(`Part II: ${age['Part II']}`);
    return parts.length > 0 ? parts.join(' | ') : 'N/A';
  };

  const getKekkeiGenkai = () => {
    const kekkei = character.personal?.kekkeiGenkai;
    if (!kekkei) return 'None';
    return Array.isArray(kekkei) ? kekkei.join(', ') : kekkei;
  };

  return (
    <div className="character-card-detailed">
      <div className="card-main-content">
        
        <div className="card-left-column">
          <img 
            src={character.images[imageIndex]} 
            alt={character.name} 
            className="character-image-detailed"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x400/3e4451/f0f0f0?text=Image+Not+Found"; }}
          />

          {character.images.length > 1 && (
            <div className="image-switcher">
              <button onClick={() => setImageIndex(0)} className={imageIndex === 0 ? 'active' : ''}>Part I</button>
              <button onClick={() => setImageIndex(1)} className={imageIndex === 1 ? 'active' : ''}>Part II</button>
            </div>
          )}
          
          <div className="card-summary-info">
            <h2>{character.name}</h2>
            <p><strong>Rank:</strong> {getLatestRank()}</p>
            <p><strong>Affiliation:</strong> {getPrimaryAffiliation()}</p>
            <p><strong>Classification:</strong> {getClassification()}</p>
          </div>
        </div>

        <div className="card-right-column">
          <h3>Personal Data</h3>
          <p><strong>Clan:</strong> {character.personal?.clan || 'N/A'}</p>
          <p><strong>Age:</strong> {getAge()}</p>
          <p><strong>Sex:</strong> {character.personal?.sex || 'N/A'}</p>
          <p><strong>Status:</strong> {character.personal?.status || 'Active'}</p>
          <p><strong>Height:</strong> {getLatestHeight()}</p>
          <p><strong>Birthdate:</strong> {character.personal?.birthdate || 'N/A'}</p>
          
          <h3>Shinobi Abilities</h3>
          <p><strong>Chakra Nature:</strong> {getNatureTypes()}</p>
          <p><strong>Kekkei Genkai:</strong> {getKekkeiGenkai()}</p>
          
          {character.personal?.tailedBeast && (
            <p><strong>Tailed Beast:</strong> {character.personal.tailedBeast}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;