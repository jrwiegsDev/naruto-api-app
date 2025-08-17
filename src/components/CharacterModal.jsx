import React from 'react';

const CharacterModal = ({ character, onClose }) => {
  // Prevent clicks inside the modal from closing it
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={handleModalContentClick}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2>{character.name}</h2>
        <p><em>More details will go here!</em></p>
      </div>
    </div>
  );
};

export default CharacterModal;