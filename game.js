import { drawSnake, initSnake, moveSnake } from './snake.js';
import { drawSquare } from './utils.js';
import { startScoreCounter, stopScoreCounter, resetScore } from './score.js';
import { showModal } from './ui.js';

let isGameRunning = false;
let color = 'black';

// Variables globales pour gérer l'état de pause
let isPaused = false;

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

// Fonction pour mettre en pause ou reprendre le jeu
export function togglePause(ctx, canvas) {
  if (isPaused) {
      // Reprendre le jeu
      isPaused = false;
      console.log('Jeu repris');
      setGameRunning(true); // Relancer le jeu
      startScoreCounter();
      gameLoop(ctx, canvas);
  } else {
      // Mettre en pause le jeu
      isPaused = true;
      console.log('Jeu en pause');
      setGameRunning(false); // Arrêter le jeu
      stopScoreCounter();
  }
}
