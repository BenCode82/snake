import { initSnake, drawSnake, moveSnake } from './snake.js';
import { initStars, initMilkyWay, initSquare, shineStars, drawSquare, drawMilkyWay } from './utils.js';
import { startCount, stopCount } from './score.js';
import { showMessage, updateCanvas } from './ui.js';
// import { explosion } from './explosion.js';

let isGameRunning;
let gameDelay;
let isPaused = false;
let gameIntervalId;
let squareAcceleration = false;

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

  // Initialiser le fond
  initStars(ctx, canvas.width, canvas.height);
  initMilkyWay(ctx, canvas.width, canvas.height);

  // Initialiser le serpent
  initSnake();
  drawSnake(ctx);
  initSquare(ctx, canvas);


  // Lancer les fonctions toutes les 200 ms
  gameIntervalId = setInterval(() => {
    if (!isGameRunning) {
      shineStars(ctx, canvas.width, canvas.height);
      drawMilkyWay(ctx, canvas.width);
      drawSnake(ctx);
      drawSquare(ctx, canvas);
    } else {
      clearInterval(gameIntervalId); // Arrêter l'intervalle si le jeu démarre
    }
  }, 200);
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

  // explosion();
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

  updateCanvas(ctx, canvas.width, canvas.height);
  drawSquare(ctx, canvas);

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
