import { initSnake, drawSnake, moveSnake } from './snake.js';
import { initStars, initMilkyWay, initSquare, shineStars, drawSquare, drawMilkyWay } from './utils.js';
import { resetScoreAndTime, startCount, stopCount } from './score.js';
import { showMessage } from './ui.js';

let isGameRunning = false;
let isPaused = false;
let gameDelay;
let gameIntervalId;

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

  // Initialiser le fond
  initStars(ctx, canvas.width, canvas.height);
  initMilkyWay(ctx, canvas.width, canvas.height);

  // Initialiser le serpent
  initSnake();
  drawSnake(ctx);
  initSquare(ctx, canvas);

  resetScoreAndTime(); // Initialiser le score et le temps à 0

  setTimeout(() =>
    showMessage("Appuie sur l'une des fleches pour commencer.\n \n \u2190\n \u2191\n \u2192\n \u2193"), 4000);

  // Lancer les fonctions toutes les 200 ms
  gameIntervalId = setInterval(() => {
    if (!isGameRunning) {
      shineStars(ctx, canvas.width, canvas.height);
      drawMilkyWay(ctx, canvas.width);
      drawSnake(ctx);
      drawSquare(ctx, canvas);
    } else {
      clearInterval(gameIntervalId); // Arrêter l'intervalle si le jeu démarre
      console.log("Intervalle arrêté, le jeu est en cours.");
    }
  }, 200); // Exécuter toutes les 200 ms
}

// Fonction pour démarrer le jeu
export function startGame(ctx, canvas) {
  showMessage("Le jeu démarre.\nBonne Chance !");

  startCount(); // Démarre le compteur
  gameLoop(ctx, canvas); // Démarrer la boucle de jeu
}

export function endGame() {
  showMessage("GAME OVER !\n\nAppuie sur ESPACE pour reessayer !")

  isGameRunning = false;
  stopCount(); // Arrête le compteur
}

export function restartGame(ctx, canvas) {
  initGame(ctx, canvas);
}

export function gameLoop(ctx, canvas) {
  if (!isGameRunning) return;

  shineStars(ctx, canvas.width, canvas.height);
  drawMilkyWay(ctx, canvas.width);

  moveSnake(ctx,canvas);
  drawSnake(ctx);
  drawSquare(ctx, canvas);

  setTimeout(() => gameLoop(ctx, canvas), gameDelay);
}

export function togglePause(ctx, canvas) {
  if (isPaused) {
      // Reprendre le jeu
      isPaused = false;
      showMessage("Le jeu reprend !");
      setGameRunning(true); // Relancer le jeu
      startCount();

      gameLoop(ctx, canvas);
  } else {
      // Mettre en pause le jeu
      isPaused = true;
      showMessage('Jeu en pause.\n\nAppuie sur ESPACE pour reprendre !');
      setGameRunning(false); // Arrêter le jeu

      stopCount();
  }
}

export function changeDelay(NewDelay) {
  gameDelay = NewDelay
}
