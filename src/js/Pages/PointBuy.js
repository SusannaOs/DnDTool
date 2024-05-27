import React, { useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const pointCost = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

const initialRaces = {
  human: {
    strength: 1,
    dexterity: 1,
    constitution: 1,
    intelligence: 1,
    wisdom: 1,
    charisma: 1,
  },
  elf: {
    strength: 0,
    dexterity: 2,
    constitution: 0,
    intelligence: 0,
    wisdom: 1,
    charisma: 0,
  },
  dwarf: {
    strength: 0,
    dexterity: 0,
    constitution: 2,
    intelligence: 0,
    wisdom: 1,
    charisma: 0,
  },
};

const initialScores = {
  strength: 8,
  dexterity: 8,
  constitution: 8,
  intelligence: 8,
  wisdom: 8,
  charisma: 8,
};

const initialNewRace = {
  name: "",
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
};

const Pointbuy = () => {
  const [scores, setScores] = useState(initialScores);
  const [points, setPoints] = useState(27);
  const [selectedRace, setSelectedRace] = useState("human");
  const [races, setRaces] = useState(initialRaces);
  const [newRace, setNewRace] = useState(initialNewRace);
  const [errorMessage, setErrorMessage] = useState("");

  const calculatePoints = (newScores) => {
    const totalPoints = Object.values(newScores).reduce(
      (sum, score) => sum + pointCost[score],
      0
    );
    return 27 - totalPoints;
  };

  const handleScoreChange = (ability, newScore) => {
    const newScores = { ...scores, [ability]: newScore };
    const newPoints = calculatePoints(newScores);
    if (newPoints >= 0) {
      setScores(newScores);
      setPoints(newPoints);
    }
  };

  const handleRaceChange = (event) => {
    setSelectedRace(event.target.value);
  };

  const getFinalScore = (ability) => {
    return scores[ability] + races[selectedRace][ability];
  };

  const handleNewRaceChange = (event) => {
    const { name, value } = event.target;
    setNewRace((prev) => ({ ...prev, [name]: parseInt(value) || value }));
  };

  const handleAddRace = () => {
    if (newRace.name.trim() === "") {
      // If the race name is empty, set an error message and return
      setErrorMessage("Race name cannot be empty");
      return;
    }
    // If the race name is not empty, clear any existing error message
    setErrorMessage("");

    // Add the new race
    setRaces((prevRaces) => ({
      ...prevRaces,
      [newRace.name.toLowerCase()]: {
        strength: newRace.strength,
        dexterity: newRace.dexterity,
        constitution: newRace.constitution,
        intelligence: newRace.intelligence,
        wisdom: newRace.wisdom,
        charisma: newRace.charisma,
      },
    }));
    setNewRace(initialNewRace);
  };

  const handleReset = () => {
    setScores(initialScores);
    setPoints(27);
    setSelectedRace("human");
  };

  return (
    <div>
      <Header />
      <div className="pointbuy">
        <h1>DnD Point Buy System</h1>

        <div>
          <label htmlFor="race">Select Race:</label>
          <select id="race" value={selectedRace} onChange={handleRaceChange}>
            {Object.keys(races).map((race) => (
              <option key={race} value={race}>
                {race.charAt(0).toUpperCase() + race.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <PointsRemaining points={points} />

        <div className="abilities">
          {Object.keys(scores).map((ability) => (
            <AbilityScoreInput
              key={ability}
              ability={ability}
              score={scores[ability]}
              finalScore={getFinalScore(ability)}
              onScoreChange={handleScoreChange}
            />
          ))}
        </div>
        <button onClick={handleReset}>Reset</button>

        <h2>Add Custom Race</h2>
        <div className="custom-race-form">
          <input
            type="text"
            name="name"
            value={newRace.name}
            onChange={handleNewRaceChange}
            placeholder="Race Name"
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {Object.keys(scores).map((ability) => (
            <div key={ability}>
              <label htmlFor={ability}>
                {ability.charAt(0).toUpperCase() + ability.slice(1)}
              </label>
              <input
                id={ability}
                type="number"
                name={ability}
                value={newRace[ability]}
                onChange={handleNewRaceChange}
                placeholder={
                  ability.charAt(0).toUpperCase() +
                  ability.slice(1) +
                  " Modifier"
                }
              />
            </div>
          ))}
          <button onClick={handleAddRace}>Add Race</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PointsRemaining = ({ points }) => (
  <div className="points-remaining">
    <h2>Points Remaining: {points}</h2>
  </div>
);

const AbilityScoreInput = ({ ability, score, finalScore, onScoreChange }) => (
  <div className="ability-score-input">
    <label>{ability.charAt(0).toUpperCase() + ability.slice(1)}</label>
    <input
      type="number"
      value={score}
      min="8"
      max="15"
      onChange={(e) => onScoreChange(ability, parseInt(e.target.value))}
    />
    <span>Final Score: {finalScore}</span>
  </div>
);

export default Pointbuy;
