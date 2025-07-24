import React, { useState, useEffect, useCallback } from 'react';
import { FaBug } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/ReactionGame.css';

function ReactionGame({ onGameEnd, onClose }) {
  const { translate } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('facil'); // Estado para a dificuldade (padrão: fácil)
  const [bugVisible, setBugVisible] = useState(false);
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);

  // Efeito para o timer do jogo (depende do timeLeft)
  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      setIsActive(false);
      setIsGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  // Efeito para o ciclo do bug (depende da dificuldade)
  useEffect(() => {
    if (!isActive) {
      setBugVisible(false);
      return;
    }

    let spawnDelayBase = 1300; 
    let spawnVariation = 500;
    let visibleDuration = 800; 

    if (difficulty === 'medio') {
      spawnDelayBase = 1000;
      spawnVariation = 400;
      visibleDuration = 600;
    } else if (difficulty === 'dificil') {
      spawnDelayBase = 700;
      spawnVariation = 300;
      visibleDuration = 400;
    }

    const showAndHideBug = () => {
      const newTop = Math.random() * 85 + '%';
      const newLeft = Math.random() * 85 + '%';
      setPosition({ top: newTop, left: newLeft });
      setBugVisible(true);
      setTimeout(() => setBugVisible(false), visibleDuration);
    };

    const bugSpawner = setInterval(showAndHideBug, Math.random() * spawnVariation + spawnDelayBase);
    return () => clearInterval(bugSpawner);
  }, [isActive, difficulty]); // Agora depende da dificuldade

  const handleBugClick = () => {
    if (bugVisible) {
      setScore(prev => prev + 1);
      setBugVisible(false);
    }
  };

  const handleRedeem = () => {
    onGameEnd(score, difficulty);
    onClose();
  };

  const handlePlayAgain = () => {
    onGameEnd(score, difficulty);
    startGame();
  };

  const setGameDifficulty = (newDifficulty) => {
    setDifficulty(newDifficulty);
  };

  const startGame = (selectedDifficulty = difficulty) => {
    setScore(0);
    setIsGameOver(false);
    setIsActive(true);
    setDifficulty(selectedDifficulty); // Garante que a dificuldade seja definida no início
    setTimeLeft(15); // O tempo pode ser ajustado por dificuldade se quiser
  };

  if (isGameOver) {
    return (
      <div className="reaction-game-container game-over-screen">
        <h3 className='bugHunterFinalTitle'>{translate('minigame_reaction_end_title')}</h3>
        <p className='bugHunterFinalDesc'>{translate('minigame_reaction_end_desc', { score: score })}</p>
        <div className="button-group-final">
          <button className="redeem-button" onClick={handleRedeem}>{translate('minigame_reaction_redeem')} ({score})</button>
          <button className="play-again-button" onClick={handlePlayAgain}>{translate('minigame_reaction_play_again')}</button>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className="reaction-game-container">
        <h3 className='bugHunterTitle'>{translate('minigame_reaction_title')}</h3>
        <p className='bugHunterDifficultyChoice'>{translate('minigame_reaction_difficulty_choice')}</p>
        <div className="button-group">
          <button className={difficulty === 'facil' ? 'active' : ''} onClick={() => setGameDifficulty('facil')}>{translate('minigame_reaction_difficulty_easy')}</button>
          <button className={difficulty === 'medio' ? 'active' : ''} onClick={() => setGameDifficulty('medio')}>{translate('minigame_reaction_difficulty_medium')}</button>
          <button className={difficulty === 'dificil' ? 'active' : ''} onClick={() => setGameDifficulty('dificil')}>{translate('minigame_reaction_difficulty_hard')}</button>
        </div>
        <p className='bugHunterDesc'>{translate('minigame_reaction_desc', { timeLeft: timeLeft })}</p>
        <button className="start-button" onClick={() => startGame()}>{translate('minigame_reaction_start')}</button>
      </div>
    );
  }

  return (
    <div className="reaction-game-container">
      <div className="game-stats">
        <span>{translate('minigame_reaction_time')}: {timeLeft}s</span>
        <span>{translate('minigame_reaction_score')}: {score}</span>
      </div>
      <div className="game-area">
        {bugVisible && (
          <div className="bug" style={position} onClick={handleBugClick}>
            <FaBug />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReactionGame;