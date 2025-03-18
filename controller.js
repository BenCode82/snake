import { startGame, setGameRunning, restartGame, initGame, getGameRunning, getPauseStatus, togglePause, acceleration } from './game.js';
import { setDirectionX, setDirectionY, getDirectionX, getDirectionY } from './snake.js';
import { initUI } from './ui.js';
import { initBackdrop } from './backdrop.js';
import { initSquareVariables } from './square.js';
import { initObjects } from './objects.js';
import { resetScoreAndTime } from './score.js';

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
      initUI(canvas);
      initUtils();
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

// Initialiser les variables du jeu
initUI(canvas);
resetScoreAndTime(); // Initialiser le score et le temps à 0

initBackdrop(ctx, canvas.width, canvas.height);
initSquareVariables();
initObjects(ctx, canvas);

initGame(ctx, canvas);
