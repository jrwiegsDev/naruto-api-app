import React from 'react';

const CharacterGallery = ({ characters, onSelect, loading, error }) => {
  return (
    <aside className="image-gallery">
      <h2>Choose Your Character</h2>
      {loading && <p>Loading data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul className="image-gallery-grid">
          {characters.map((character) => (
            <li
              key={character.id}
              className="gallery-image-container"
              onClick={() => onSelect(character)}
            >
              <img
                src={character.images[0]}
                alt={character.name}
                title={character.name}
                className="gallery-image"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/3e4451/f0f0f0?text=N/A"; }}
              />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default CharacterGallery;