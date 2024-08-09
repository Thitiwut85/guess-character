import React, { useState } from 'react';
import ActressImageGuess from './components/ActressImageGuess';
import AnimeImageGuess from './components/AnimalImageGuess';
import characters from './components/actress';
import './App.css';

function App() {
  const [targetCharacter, setTargetCharacter] = useState(null); // เริ่มต้นยังไม่เลือกตัวละคร
  const [mode, setMode] = useState(''); // เริ่มต้นยังไม่เลือกโหมด

  const handleModeSelect = (selectedMode) => {
    setMode(selectedMode);
    // สุ่มตัวละครเมื่อเลือกโหมด
    setTargetCharacter(characters[Math.floor(Math.random() * characters.length)]);
  };

  const handleBackToHome = () => {
    setMode('');
    setTargetCharacter(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess the Character</h1>
        {!mode ? (
          <div className="button-container">
            <button onClick={() => handleModeSelect('animal')}>Animal Mode</button>
            <button onClick={() => handleModeSelect('actress')}>Actress Mode</button>
          </div>
        ) : (
          <div>
            <button className="back-button" onClick={handleBackToHome}>Back to Home</button>
            {mode === 'animal' ? (
              <AnimeImageGuess targetCharacter={targetCharacter} />
            ) : (
              <ActressImageGuess targetCharacter={targetCharacter} />
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
