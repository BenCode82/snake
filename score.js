import { updateScoreDisplay, updateTimeDisplay, showMessage} from './ui.js';
import { changeDelay } from './game.js';

let score = 0;
let time = 0;

let isCounting = false;

export function getScore() {
  return score;
}

export function resetScoreAndTime() {
  score = 0;
  time = 0;
  updateScoreDisplay(score);
  updateTimeDisplay(time);
}

export function startCount() {
  isCounting = true;
  asyncTimeCounter();
}

export function stopCount() {
  isCounting = false;
}

export function addCollision() {
  score += 100;
}

async function asyncTimeCounter() {
  while (isCounting) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Incrémente toutes les secondes
    score += 10; // Augmenter le score
    time += 1;

    updateScoreDisplay(score);
    updateTimeDisplay(time);

    if (score > 420) {
      changeDelay(80); }
    else if (score > 390) { changeDelay(100); }
    else if (score > 360) { changeDelay(110); }
    else if (score > 330) { changeDelay(120); }
    else if (score > 300) { changeDelay(130); }
    else if (score > 250) { changeDelay(140); }
    else if (score > 200) { changeDelay(150); }
    else if (score > 150) { changeDelay(160); }
    else if (score > 100) {
      changeDelay(180);
      // showMessage("On accelere !");
     }
  }
}
