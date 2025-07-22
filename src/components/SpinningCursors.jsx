import React from 'react';
import cursorIcon from '../assets/cursor-icon.png';
import '../styles/SpinningCursors.css';

function SpinningCursors({ cursorCount, isSidebarOpen }) {
  if (cursorCount === 0) {
    return null;
  }

  const radius = 230;
  const slideContainerClass = `slide-container ${isSidebarOpen ? 'sidebar-open' : ''}`;

  return (
    <div className={slideContainerClass}>
      <div className="rotation-container" style={{ width: radius * 2, height: radius * 2 }}>
        {Array.from({ length: cursorCount }).map((_, index) => {
          const angle = (index / cursorCount) * 360;
          return (
            <div
              key={index}
              className="orbiting-cursor"
              style={{ transform: `rotate(${angle}deg) translateX(${radius}px)` }}
            >
              <img 
                src={cursorIcon} 
                alt="cursor" 
                className="cursor-image"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SpinningCursors;