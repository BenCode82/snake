import { initUI } from './ui.js';
import { initBackdrop } from './backdrop.js';
import { initSquareVariables } from './square.js';
import { initObjects } from './objects.js';
import { initScoreAndTime } from './score.js';

import { startGame, setGameRunning, restartGame, initGame, getGameRunning, getPauseStatus, togglePause, acceleration } from './game.js';
import { setDirectionX, setDirectionY, getDirectionX, getDirectionY } from './snake.js';

// Set up the canvas and context
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

function adjustCanvasSize() {
  const canvas = document.getElementById("mainCanvas");
  const ctx = canvas.getContext("2d");

  if (window.innerWidth >= 768) {
    // Écran d'ordinateur
    canvas.width = 660;
    canvas.height = 440;
  } else {
    // Écran de téléphone
    canvas.width = 380;
    canvas.height = 600;
  }

  // Efface l'ancien contenu et redessine si nécessaire
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Ajuste au chargement et au redimensionnement
window.addEventListener("load", adjustCanvasSize);
window.addEventListener("resize", adjustCanvasSize);

// Fonction pour redimensionner le canvas
export function resizeCanvas() {
  let iteration = 4;
  if (canvas.width >= 500) {
    const resizeCanvasInterval = setInterval(() => {
      if (iteration === 0) {
        clearInterval(resizeCanvasInterval); // Arrête l'intervalle
        resizeCanvasInterval = null;
      }
      else {
        canvas.width -= 20;
        canvas.height += 20;
        iteration -= 1;
      }
    }, 600); // Intervalle de 1 seconde
  }
}

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
      initialization()
    }
    else {
      togglePause(ctx, canvas);
    }
  }
});

// Initialiser les variables du jeu
function initialization() {
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  console.log(canvasWidth);
  console.log(canvasHeight);

  initUI(canvas);
  initScoreAndTime(); // Initialiser le score et le temps à 0

  initBackdrop(canvas.width, canvas.height);
  initSquareVariables();
  initObjects();

  initGame(ctx, canvas);
}

// // OUTIL pour connaitre la position du pointeur !
// document.addEventListener("mousemove", (event) => {
//   console.log(`X: ${event.clientX}, Y: ${event.clientY}`);
// });

initialization();
