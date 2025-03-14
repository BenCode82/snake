import { startGame, setGameRunning, restartGame, initGame, getGameRunning, getPauseStatus, togglePause, acceleration } from './game.js';
import { setDirectionX, setDirectionY, getDirectionX, getDirectionY } from './snake.js';
import { initInterface } from './ui.js';

// Set up the canvas and context
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');

// Écouteur pour le bouton de réinitialisation
document.addEventListener('DOMContentLoaded', () => {
  const resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    restartGame(ctx, canvas);
  });
});

// Add event listener for arrow keys and space
document.addEventListener('keydown', (event) => {

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {

    if (event.key === 'ArrowUp' && getDirectionY() !== 20) {
      setDirectionX(0);
      setDirectionY(-20);
      if (event.key === 'ArrowUp' && getDirectionY() === -20) {
        acceleration();
      }
    }
    else if (event.key === 'ArrowDown' && getDirectionY() !== -20) {
      setDirectionX(0);
      setDirectionY(20);
      if (event.key === 'ArrowDown' && getDirectionY() === 20) {
        acceleration();
      }
    }
    else if (event.key === 'ArrowLeft' && getDirectionX() !== 20) {
      setDirectionX(-20);
      setDirectionY(0);
      if (event.key === 'ArrowLeft' && getDirectionX() === -20) {
        acceleration();
      }
    }
    else if (event.key === 'ArrowRight' && getDirectionX() !== -20) {
      setDirectionX(20);
      setDirectionY(0);
      if (event.key === 'ArrowRight' && getDirectionX() === 20) {
        acceleration();
      }
    }

    if (!getGameRunning() && !getPauseStatus()) {
      setGameRunning(true); // Le jeu démarre
      startGame(ctx, canvas); // Appeler la fonction qui contient la boucle de jeu
    }
  }

  // Mettre en pause ou reprendre le jeu
  if (event.code === 'Space') {
    if (!getGameRunning() && !getPauseStatus()) {
      initGame(ctx, canvas);
    }
    else {
      togglePause(ctx, canvas);
    }
  }
});

// // OUTIL pour connaitre la position du pointeur !
// document.addEventListener("mousemove", (event) => {
//   console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
// });

initInterface(canvas);
initGame(ctx, canvas); // Initialiser le jeu
