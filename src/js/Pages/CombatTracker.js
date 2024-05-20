import React, { useState } from 'react';

// Character component
const Character = ({ name, initiative, hp }) => {
  return (
    <div className='char'>
      <h3>{name}</h3>
      <p>Initiative: {initiative}</p>
      <p>HP: {hp}</p>
      {/* Other character information */}
    </div>
  );
};

// Character list component
const CharacterList = ({ characters }) => {
  return (
    <div>
      {characters.map((character, index) => (
        <Character key={index} {...character} />
      ))}
    </div>
  );
};

function CombatTracker() {

  const [characters, setCharacters] = useState([
    { name: 'Character 1', initiative: 15, hp: 20 },
    { name: 'Character 2', initiative: 18, hp: 25 },
    { name: 'Character 3', initiative: 18, hp: 25 },
    { name: 'Character 4', initiative: 18, hp: 25 },
    // Add more characters as needed
  ]);

  return (
    <div>
      <h1>DND Combat Tracker</h1>
      <div className="CombatTrackerContainer">
        <CharacterList characters={characters} />
      </div>
    </div>
  );
}

export default CombatTracker;