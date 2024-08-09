import React, { useState, useEffect } from 'react';
import characters from './actress';

const CharacterImageGuess = () => {
  const [targetCharacter, setTargetCharacter] = useState(
    characters[Math.floor(Math.random() * characters.length)]
  );
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [hints, setHints] = useState([]);
  const [imageSrc, setImageSrc] = useState('');
  const [clipPathStyle, setClipPathStyle] = useState('');
  const [guessedCharacters, setGuessedCharacters] = useState([]);

  useEffect(() => {
    const imagePath = `/actress/${targetCharacter.name.toLowerCase().replace(' ', '')}.jpg`;
    setImageSrc(imagePath);

    // สุ่มตำแหน่ง x, y และความกว้าง สูงของพื้นที่ที่ต้องการแสดง
    const randomX = Math.random() * 50; // สุ่ม x ให้เป็นค่าระหว่าง 0-30%
    const randomY = Math.random() * 50; // สุ่ม y ให้เป็นค่าระหว่าง 0-30%
    const width = 50; // กำหนดความกว้างของส่วนที่ต้องการแสดง
    const height = 50; // กำหนดความสูงของส่วนที่ต้องการแสดง

    // กำหนด clip-path ในรูปแบบ polygon โดยใช้พิกัดที่สุ่มมา
    const clipPath = `polygon(${randomX}% ${randomY}%, ${randomX + width}% ${randomY}%, ${randomX + width}% ${randomY + height}%, ${randomX}% ${randomY + height}%)`;
    setClipPathStyle({ clipPath });
  }, [targetCharacter]);

  const handleGuess = () => {
    if (guess === targetCharacter.name) {
      setMessage(`Correct! The character is ${targetCharacter.name}`);
      setHints([]);
      setGuess('');
      setGuessedCharacters([...guessedCharacters, targetCharacter.name]); // เพิ่มตัวละครที่ทายถูกแล้วไปยัง guessedCharacters

      // กรองตัวละครที่เหลือก่อนสุ่ม
      const remainingCharacters = characters.filter(
        (character) => !guessedCharacters.includes(character.name)
      );
      console.log(remainingCharacters)

      // สุ่มตัวละครใหม่จากรายการที่เหลือ
      if (remainingCharacters.length > 0) {
        setTargetCharacter(remainingCharacters[Math.floor(Math.random() * remainingCharacters.length)]);
      } else {
        setMessage('Congratulations! You have guessed all the characters.');
      }
    } else {
      const newHint = `Wrong guess: "${guess}". Hint: The character is ${targetCharacter.gender}, Age: ${targetCharacter.age}`;
      setHints([newHint, ...hints]);
      setMessage('Wrong guess! Try again.');
    }
  };

  return (
    <div className='container'>
      <img
        src={imageSrc}
        alt={targetCharacter.name}
        style={{
          height: 300,
          width: '100%',
          objectFit: 'cover',
          clipPath: clipPathStyle.clipPath, // ใช้ clip-path ที่สร้างจากสุ่มมา
        }}
      />
      <select value={guess} onChange={(e) => setGuess(e.target.value)}>
        <option value="">Select a character</option>
        {characters.map((character, index) => (
          <option key={index} value={character.name}>
            {character.name}
          </option>
        ))}
      </select>
      <button onClick={handleGuess}>Submit</button>
      <p>{message}</p>
      <div>
        {hints.map((hint, index) => (
          <p key={index}>{hint}</p>
        ))}
      </div>
    </div>
  );
};

export default CharacterImageGuess;
