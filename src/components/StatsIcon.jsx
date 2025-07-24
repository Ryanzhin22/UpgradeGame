import React from 'react';
import { FaChartBar } from 'react-icons/fa'; // Ícone de estatísticas
import '../styles/StatsIcon.css';

function StatsIcon({ onClick }) {
  return (
    <button className="stats-icon" onClick={onClick} title="Estatísticas">
      <FaChartBar />
    </button>
  );
}

export default StatsIcon;