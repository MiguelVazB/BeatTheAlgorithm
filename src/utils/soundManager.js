// src/utils/soundManager.js
const sounds = {
  countDown: "/BeatTheAlgorithm/sounds/countDownSound.mp3",
  start: "/BeatTheAlgorithm/sounds/startSound.wav",
  game: "/BeatTheAlgorithm/sounds/gameSound.mp3",
  userWon: "/BeatTheAlgorithm/sounds/userWonSound.mp3",
  algoWon: "/BeatTheAlgorithm/sounds/algoWonSound.mp3"
};

export class SoundManager {
  static play(soundName, volume = 0.5) {
    try {
      const audio = new Audio(sounds[soundName]);
      audio.volume = volume;
      audio.play().catch(e => console.log('Audio play failed:', e));
      return audio;
    } catch (error) {
      console.log('Sound loading failed:', error);
      return null;
    }
  }

  static createBackgroundMusic() {
    const audio = new Audio(sounds.game);
    audio.volume = 0.1;
    audio.loop = true;
    return audio;
  }
}