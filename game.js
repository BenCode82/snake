import { initSnake, drawSnake, moveSnake } from './snake.js';
import { initStars, initMilkyWay, initSquare, shineStars, drawSquare, drawMilkyWay } from './utils.js';
import { resetScoreAndTime, startCount, stopCount } from './score.js';
import { showMessage, showModal } from './ui.js';
//

let isGameRunning = false;
let isPaused = false;
let gameDelay = 200;

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
  // Initialiser le jeu
  console.log("Initialisation du jeu");
  isGameRunning = false;

  // Initialiser le fond
  initStars(ctx, canvas.width, canvas.height);
  initMilkyWay(ctx, canvas.width, canvas.height);

  // Initialiser le serpent
  initSnake();
  drawSnake(ctx);
  initSquare(ctx, canvas);

  resetScoreAndTime(); // Initialiser le score et le temps à 0

  showMessage("Bonjour, aventurier ! Prêt à explorer ce monde mystérieux ?");
}

// Fonction pour démarrer le jeu
export function startGame(ctx, canvas) {
  showMessage("Le jeu démarre !");

  startCount(); // Démarre le compteur
  gameLoop(ctx, canvas); // Démarrer la boucle de jeu
}

export function endGame() {
  console.log("Le jeu se termine !");

  isGameRunning = false;
  stopCount(); // Arrête le compteur
  showModal(); // Affiche la modale
}

export function restartGame(ctx, canvas) {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  console.log("Le jeu redémarre");
  initGame(ctx, canvas);
}

export function gameLoop(ctx, canvas) {
  if (!isGameRunning) return;

  shineStars(ctx, canvas.width, canvas.height);
  drawMilkyWay(ctx);

  moveSnake(ctx,canvas);
  drawSnake(ctx);

  drawSquare(ctx, canvas);
  // animateSquareColor(ctx);

  setTimeout(() => gameLoop(ctx, canvas), gameDelay);
}

export function togglePause(ctx, canvas) {
  if (isPaused) {
      // Reprendre le jeu
      isPaused = false;
      console.log('Jeu repris');
      setGameRunning(true); // Relancer le jeu
      startCount();

      gameLoop(ctx, canvas);
  } else {
      // Mettre en pause le jeu
      isPaused = true;
      console.log('Jeu en pause');
      setGameRunning(false); // Arrêter le jeu

      stopCount();
  }
}

export function changeDelay(NewDelay) {
  gameDelay = NewDelay
}
