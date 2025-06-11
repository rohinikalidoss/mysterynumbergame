import React, { useState } from 'react';
import './MysteryGame.css';

export default function MysteryGame() {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('🔒 The vault is locked...');
  const [score, setScore] = useState(10);
  const [hint, setHint] = useState('');
  const [gameStatus, setGameStatus] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 10));

  // Confetti burst effect
  function burstConfetti() {
    const container = document.querySelector('.confetti-container');
    if (!container) return;
    container.innerHTML = ''; // clear previous confetti

    const colors = ['#f9d71c', '#ff4b1f', '#1affd5', '#ff2d8a', '#1f8fff'];
    const count = 40;

    for (let i = 0; i < count; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      // Random size
      const size = Math.random() * 6 + 4;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      // Random color
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      // Random direction and distance
      const angle = Math.random() * 2 * Math.PI; // 0 to 2π radians
      const radius = Math.random() * 150 + 50;  // distance in px

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius * -1; // negative y for upward burst

      // Set CSS variables for animation
      confetti.style.setProperty('--x', `${x.toFixed(2)}px`);
      confetti.style.setProperty('--y', `${y.toFixed(2)}px`);

      // Random animation duration and delay
      confetti.style.animation = `confetti-burst ${2 + Math.random()}s ease forwards`;
      confetti.style.animationDelay = `${Math.random() * 0.5}s`;

      container.appendChild(confetti);
    }
  }

  const checkGuess = () => {
    const guessNumber = parseInt(guess, 10);
    if (isNaN(guessNumber)) {
      setMessage('🚫 Please enter a number!');
      return;
    }

    if (guessNumber === randomNumber) {
      setMessage('🔓 Vault opened!');
      setGameStatus('🎉 You cracked the code!');
      setHint('');
      burstConfetti();  // Trigger confetti on win
    } else {
      const newScore = score - 1;
      setScore(newScore);
      setMessage('🔒 Still locked...');
      setHint(guessNumber > randomNumber ? '🔥 Too high...' : '❄️ Too low...');
      if (newScore === 0) {
        setGameStatus('💀 All attempts used. Try again!');
        setHint(`💡 The number was ${randomNumber}`);
      }
    }
  };

  const restartGame = () => {
    setRandomNumber(Math.floor(Math.random() * 10));
    setGuess('');
    setScore(10);
    setMessage('🔒 The vault is locked...');
    setHint('');
    setGameStatus('');
    const container = document.querySelector('.confetti-container');
    if (container) container.innerHTML = ''; // clear confetti on restart
  };

  return (
    <div className="mystery-background">
      <div className="mystery-container">
        <h1>🕵️ Guess the Secret Number</h1>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter your guess..."
          disabled={score === 0 || gameStatus === '🎉 You cracked the code!'}
        />
        <button onClick={checkGuess} disabled={score === 0 || gameStatus === '🎉 You cracked the code!'}>
          Unlock
        </button>
        <p className="message">{message}</p>
        <p className="hint">{hint}</p>
        <p className="score">🧠 Score: {score}</p>
        <p className="status">{gameStatus}</p>
        <button onClick={restartGame} className="restart-btn">🔁 Restart</button>

        {/* Confetti container */}
        <div className="confetti-container" />
      </div>
    </div>
  );
}
