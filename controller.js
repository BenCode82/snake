import { startGame, initGame, setGameRunning, getGameRunning, restartGame } from './game.js';
import { setDirectionX, setDirectionY } from './snake.js';

// Set up the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Écouteur pour le bouton de réinitialisation
document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    restartGame(ctx, canvas);
  });
});

// Écouteur pour démarrer le jeu
document.addEventListener('keydown', (event) => {

  // !getGameRunning &&
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {

    if (!getGameRunning()) {
      setGameRunning(true); // Le jeu démarre
      startGame(ctx, canvas); // Appeler la fonction qui contient la boucle de jeu
    }
  }
});

// Add event listener for arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') { setDirectionX(0); setDirectionY(-20); }
    if (event.key === 'ArrowDown') { setDirectionX(0); setDirectionY(20); }
    if (event.key === 'ArrowLeft') { setDirectionX(-20); setDirectionY(0); }
    if (event.key === 'ArrowRight') { setDirectionX(20); setDirectionY(0); }
});

initGame(ctx, canvas); // Initialiser le jeu
