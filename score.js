import { updateScoreDisplay } from './ui.js';

let score = 0;
let isCounting = false;

export function getScore() {
  return score;
}

export function resetScore() {
  score = 0;
  updateScoreDisplay(score);
}

export function startScoreCounter() {
  isCounting = true;
  asyncScoreCounter();
}

export function stopScoreCounter() {
  isCounting = false;
}

async function asyncScoreCounter() {
  while (isCounting) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Incrémente toutes les secondes
    score += 1; // Augmenter le score
    // console.log(`Score : ${score}`); // Afficher le score
    updateScoreDisplay(score); // Mettre à jour l'affichage si nécessaire
  }
}
