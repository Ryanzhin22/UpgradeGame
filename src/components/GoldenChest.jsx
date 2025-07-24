import React, { useEffect } from 'react';
import { FaBoxOpen } from 'react-icons/fa'; // Ícone de exemplo para o baú
import '../styles/GoldenChest.css';

function GoldenChest({ position, onClick }) {
  useEffect(() => {
  }, []);

  return (
    <div 
      className="golden-chest" 
      style={{ top: position.top, left: position.left }}
      onClick={onClick}
    >
      <FaBoxOpen />
    </div>
  );
}

export default GoldenChest;