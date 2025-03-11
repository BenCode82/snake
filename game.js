import { drawSnake, initSnake, moveSnake } from './snake.js';
import { drawSquare } from './utils.js';
import { startScoreCounter, stopScoreCounter, resetScore } from './score.js';
import { showModal } from './ui.js';

let isGameRunning = false;
let color = 'black';

export function setGameRunning(newValue) {
  isGameRunning = newValue;
  console.log("Le jeu est en cours :", isGameRunning);
}

export function getGameRunning() {
  return isGameRunning;
}

// Fonction pour démarrer le jeu
export function startGame(ctx, canvas) {
  console.log("Le jeu démarre !");

  startScoreCounter(); // Démarre le compteur de score
  gameLoop(ctx, canvas); // Démarrer la boucle de jeu
}

export function endGame() {
  console.log("Le jeu se termine !");

  isGameRunning = false;
  stopScoreCounter(); // Arrête le compteur

  showModal(); // Affiche la modale
}

// Fonction pour initialiser le jeu
export function initGame(ctx, canvas) {
  console.log("Initialisation du jeu");

  // Initialiser le serpent
  initSnake();
  drawSnake(ctx, canvas);
  drawSquare(ctx, canvas);

  // Initialiser le score à 0
  resetScore()

  // Initialiser le jeu
  isGameRunning = false; // ????????????
}

// Fonction pour redémarrer le jeu
export function restartGame(ctx, canvas) {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';

  console.log("Le jeu redémarre");

  initGame(ctx, canvas);
}

// Exemple de boucle de jeu
export function gameLoop(ctx, canvas) {
  if (!isGameRunning) return;

  moveSnake(canvas, color);
  drawSnake(ctx, canvas);
  color = drawSquare(ctx, canvas);

  setTimeout(() => gameLoop(ctx, canvas), 200);
}
