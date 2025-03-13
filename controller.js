import { startGame, setGameRunning, restartGame, initGame, getGameRunning, getPauseStatus, togglePause} from './game.js';
import { setDirectionX, setDirectionY } from './snake.js';

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

    if (event.key === 'ArrowUp') { setDirectionX(0); setDirectionY(-20); }
    if (event.key === 'ArrowDown') { setDirectionX(0); setDirectionY(20); }
    if (event.key === 'ArrowLeft') { setDirectionX(-20); setDirectionY(0); }
    if (event.key === 'ArrowRight') { setDirectionX(20); setDirectionY(0); }

    if (!getGameRunning() && !getPauseStatus()) {
      setGameRunning(true); // Le jeu démarre
      startGame(ctx, canvas); // Appeler la fonction qui contient la boucle de jeu
    }
  }

  // Mettre en pause ou reprendre le jeu
  if (event.code === 'Space') {
    togglePause(ctx, canvas);
  }
});

initGame(ctx, canvas); // Initialiser le jeu
console.log("TEST in controller.js")
