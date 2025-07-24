import React, { useState, useEffect, useRef } from 'react';
import '../styles/BuffsPanel.css'; // Reutiliza o mesmo CSS

const MAX_CHARGE_SECONDS = 5;

function BuffButton({ buffId, buffInfo, activateBuff, icon, name }) {
  const [charge, setCharge] = useState(0); // Carga atual em segundos
  const chargeTimeoutRef = useRef(null);

  const isActive = buffInfo.activeUntil > Date.now();
  const chargePercentage = (charge / MAX_CHARGE_SECONDS) * 100;

  const handleMouseDown = () => {
    if (isActive) return;

    // Aumenta a carga
    setCharge(prev => Math.min(prev + 0.1, MAX_CHARGE_SECONDS)); // Aumenta 100ms por clique

    // Reseta o timer para ativar o buff
    clearTimeout(chargeTimeoutRef.current);
    chargeTimeoutRef.current = setTimeout(() => {
      if (charge > 0) {
        activateBuff(buffId, charge);
        setCharge(0);
      }
    }, 1000); // Se parar de clicar por 1s, o buff ativa
  };

  useEffect(() => {
    return () => clearTimeout(chargeTimeoutRef.current); // Limpeza
  }, []);

  const timeLeft = isActive ? Math.ceil((buffInfo.activeUntil - Date.now()) / 1000) : 0;

  return (
    <div className={`buff-button ${isActive ? 'active' : ''}`} onMouseDown={handleMouseDown}>
      <div className="charge-bar" style={{ width: `${chargePercentage}%` }}></div>
      <div className="buff-content">
        <span className="buff-icon">{icon}</span>
        <span className="buff-name">{name}</span>
        {isActive && <span className="buff-timer">{timeLeft}s</span>}
      </div>
    </div>
  );
}

export default BuffButton;