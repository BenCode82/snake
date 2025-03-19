import { initSnake, drawSnake, moveSnake } from './snake.js';
import { startCount, stopCount } from './score.js';
import { showMessage, stopCountdown } from './ui.js';
import { drawSquare } from './square.js';
import { drawBackdrop } from './backdrop.js';
import { moveObjects, createObject } from './objects.js';

let isGameRunning;
let gameDelay;
let isPaused = false;
let gameIntervalId;
let squareAcceleration = false;

let countdownElement

export function changeDelay(NewDelay) {
  gameDelay = NewDelay
}

export function acceleration() {
  squareAcceleration = true;
}

export function getPauseStatus() {
  return isPaused
}

export function setGameRunning(newValue) {
  isGameRunning = newValue;
  console.log("Le jeu est en cours :", isGameRunning);
}

export function getGameRunning() {
  return isGameRunning;
}

export function initGame(ctx, canvas) {
  console.log("Initialisation du jeu");
  isGameRunning = false;
  gameDelay = 200;

  // Initialiser le serpent
  initSnake();

  let i = 0;
  while (i < 2) {
    createObject(ctx, canvas.width, canvas.height);
    i += 1;
  }

  // Lancer les fonctions toutes les 200 ms
  gameIntervalId = setInterval(() => {
    if (!isGameRunning) {
      drawBackdrop(ctx, canvas.width, canvas.height);
      drawSnake(ctx);
      drawSquare(ctx, canvas.width, canvas.height);
      moveObjects(ctx, canvas.width, canvas.height);
    } else {
      clearInterval(gameIntervalId); // Arrêter l'intervalle si le jeu démarre
    }
  }, 200);
}

export function startGame(ctx, canvas) {
  showMessage("Le jeu démarre.\nBonne Chance !");

  startCount(); // Démarre le compteur
  gameLoop(ctx, canvas); // Démarrer la boucle de jeu
}

export function endGame() {
  console.log('game over');

  if (isGameRunning) {
    countdownElement = document.getElementById("countdown");
    // Afficher "GAME OVER"
    setTimeout(() => {
      countdownElement.textContent = "GAME OVER";
      countdownElement.style.display = "block";
    }, 0);

    // Arrêter le compteur et le compte à rebours
    stopCount();
    stopCountdown();

    // Afficher un message pour rejouer
    showMessage("Appuie sur ESPACE pour rejouer !");

    // Mettre à jour l'état du jeu
    isGameRunning = false;
  }

  isGameRunning = false;
  setTimeout(() => {
    countdownElement.textContent = "";
    countdownElement.style.display = "none";
  }, 1000);
}

export function restartGame(ctx, canvas) {
  initGame(ctx, canvas);
}

export function gameLoop(ctx, canvas) {
  if (!isGameRunning) return;

  drawBackdrop(ctx, canvas.width, canvas.height);

  moveSnake(ctx,canvas);
  drawSnake(ctx);
  drawSquare(ctx, canvas.width, canvas.height);

  moveObjects(ctx, canvas.width, canvas.height);

  if (squareAcceleration) {
    squareAcceleration = false;
    setTimeout(() => gameLoop(ctx, canvas), gameDelay/3);
  }
  else {
    setTimeout(() => gameLoop(ctx, canvas), gameDelay);
  }
}

export function togglePause(ctx, canvas) {
  if (isPaused) {
      // Reprendre le jeu
      isPaused = false;
      showMessage("Le jeu reprend !");
      isGameRunning = true; // Relancer le jeu
      startCount();

      gameLoop(ctx, canvas);
  } else {
      // Mettre en pause le jeu
      isPaused = true;
      showMessage('Jeu en pause.\n\nAppuie sur ESPACE pour reprendre !');
      isGameRunning = false; // Arrêter le jeu

      stopCount();
  }
}
