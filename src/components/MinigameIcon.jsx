import React from 'react';
import { FaBug } from 'react-icons/fa'; 
import '../styles/MinigameIcon.css';

function MinigameIcon({ onClick }) {
  return (
    <button className="minigame-icon" onClick={onClick} title="Jogar 'Caça ao Bug'">
      <FaBug />
    </button>
  );
}

export default MinigameIcon;