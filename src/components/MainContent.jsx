import React from 'react';

function MainContent({ score, cps, onMainButtonClick, isSidebarOpen, isButtonUpgraded }) {
  return (
    <main id="main-content" style={{ transform: isSidebarOpen ? 'translateX(320px)' : 'translateX(0)' }}>
      <div className="score-container">
        <h1>Score: <span id="score-display">{Math.floor(score).toLocaleString('pt-BR')}</span></h1>
        <small id="cps-display">{cps.toLocaleString('pt-BR')} per second</small>
      </div>

      <div className="clicker-area">
        <button 
          id="clicker-button" 
          className={isButtonUpgraded ? 'upgraded' : ''}
          onClick={onMainButtonClick}
        >Click Me</button>
      </div>
    </main>
  );
}

export default MainContent;