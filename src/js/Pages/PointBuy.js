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

  const calculateModifier = (score) => {
    return Math.floor((score - 10) / 2);
  };

  const handleNewRaceChange = (ability, newScore) => {
    setNewRace((prev) => ({ ...prev, [ability]: newScore }));
  };

  const handleAddRace = () => {
    if (newRace.name.trim() === "") {
      setErrorMessage("Race name cannot be empty");
      return;
    }
    setErrorMessage("");
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
        <h2>Point Buy Calculator</h2>
        <div className="calculator-container">
          <div>
            <label htmlFor="race">Select Race: </label>
            <select
              id="race"
              value={selectedRace}
              onChange={handleRaceChange}
              className="race-select"
            >
              {Object.keys(races).map((race) => (
                <option key={race} value={race}>
                  {race.charAt(0).toUpperCase() + race.slice(1)}
                </option>
              ))}
            </select>
            <PointsRemaining points={points} />
          </div>

          <div className="abilities">
            {Object.keys(scores).map((ability) => (
              <AbilityScoreInput
                key={ability}
                ability={ability}
                score={scores[ability]}
                finalScore={getFinalScore(ability)}
                modifier={calculateModifier(scores[ability])}
                onScoreChange={handleScoreChange}
              />
            ))}
          </div>
          <button onClick={handleReset}>Reset</button>
        </div>

        <div className="custom-race-container">
          <h2>Add Custom Race</h2>
          <div className="custom-race-form">
            <input
              type="text"
              name="name"
              value={newRace.name}
              onChange={(e) => setNewRace({ ...newRace, name: e.target.value })}
              placeholder="Race Name"
              className="race-name"
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {Object.keys(initialScores).map((ability) => (
              <div key={ability} className="ability-score-input">
                <label htmlFor={ability}>
                  {ability.charAt(0).toUpperCase() + ability.slice(1)}
                </label>
                <div className="score-controls">
                  <button
                    type="button"
                    onClick={() =>
                      handleNewRaceChange(ability, newRace[ability] - 1)
                    }
                    disabled={newRace[ability] <= 0}
                  >
                    -
                  </button>
                  <input
                    id={ability}
                    type="number"
                    name={ability}
                    value={newRace[ability]}
                    readOnly
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleNewRaceChange(ability, newRace[ability] + 1)
                    }
                    disabled={newRace[ability] >= 2}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
            <button onClick={handleAddRace}>Add Race</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const PointsRemaining = ({ points }) => (
  <div className="points-remaining">
    <span>Points Remaining: {points}</span>
  </div>
);

const AbilityScoreInput = ({
  ability,
  score,
  finalScore,
  modifier,
  onScoreChange,
}) => (
  <div className="ability-score-input">
    <label>{ability.charAt(0).toUpperCase() + ability.slice(1)}</label>
    <div className="score-controls">
      <button
        type="button"
        onClick={() => onScoreChange(ability, score - 1)}
        disabled={score <= 8}
      >
        -
      </button>
      <input type="number" value={score} readOnly />
      <button
        type="button"
        onClick={() => onScoreChange(ability, score + 1)}
        disabled={score >= 15}
      >
        +
      </button>
    </div>
    <span>Modifier: {modifier >= 0 ? `+${modifier}` : modifier}</span>
    <span>Final Score: {finalScore}</span>
  </div>
);

export default Pointbuy;
