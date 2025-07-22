import React, { useState } from 'react';
import '../styles/MinigameWindow.css';

function MinigameWindow({ title, children, onClose, position, onPositionChange }) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    // Calcula a diferença entre o clique do mouse e o canto superior esquerdo da janela
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      onPositionChange({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);


  return (
    <div className="minigame-window" style={{ top: position.y, left: position.x }}>
      <div className="title-bar" onMouseDown={handleMouseDown}>
        <span className="title">{title}</span>
        <div className="window-controls">
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
      </div>
      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default MinigameWindow;