import React from 'react';
import { FaTrophy } from 'react-icons/fa';
import '../styles/AchievementsIcon.css';

function AchievementsIcon({ onClick }) {
  return (
    <button className="achievements-icon" onClick={onClick} title="Conquistas">
      <FaTrophy />
    </button>
  );
}

export default AchievementsIcon;