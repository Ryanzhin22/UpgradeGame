const sounds = {
  click: new Audio('/sounds/click.mp3'),
  purchase: new Audio('/sounds/buy.mp3'),
};

Object.values(sounds).forEach(sound => {
  sound.volume = 0.7;
});

export const playSound = (soundName) => {
  const sound = sounds[soundName];

  if (sound) {
    sound.currentTime = 0;
    
    sound.play().catch(error => {
      console.error(`Error playing sound ${soundName}:`, error);
    });
  }
};