import { updateScoreDisplay, updateTimeDisplay, showMessage} from './ui.js';
import { changeDelay } from './game.js';

let score = 0;
let time = 0;

let isCounting = false;

let messageSent400 = false;
let messageSent800 = false;
let messageSent1200 = false;
let messageSent1600 = false;
let messageSent2000 = false;
let messageSent2500 = false;
let messageSent3500 = false;
let messageSent5000 = false;
let messageSent7000 = false;

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


    if (score > 7000 && !messageSent7000) {
      changeDelay(80);
      showMessage("Tu entres dans le couloir de la mort. \nBonne chance \n \n 💀💀💀");
      messageSent7000 = true;
    }
    else if (score > 5000 && !messageSent5000) {
      changeDelay(100);
      showMessage("Tu es bon...\non accelere !");
      messageSent5000 = true;
    }
    else if (score > 3500 && !messageSent3500) {
      changeDelay(110);
      showMessage("Tu es bon...\non accelere !");
      messageSent3500 = true;
    }
    else if (score > 2500 && !messageSent2500) {
      changeDelay(120);
      showMessage("Tu es bon...\non accelere !");
      messageSent2500 = true;
    }
    else if (score > 2000 && !messageSent2000) {
      changeDelay(130);
      showMessage("Tu es bon...\non accelere !");
      messageSent2000 = true;
    }
    else if (score > 1600 && !messageSent1600) {
      changeDelay(140);
      showMessage("Tu es bon...\non accelere !");
      messageSent1600 = true;
    }
    else if (score > 1200 && !messageSent1200) {
      changeDelay(150);
      showMessage("Tu es bon...\non accelere !");
      messageSent1200 = true;
    }
    else if (score > 800 && !messageSent800) {
      changeDelay(160);
      showMessage("Tu es bon...\non accelere !");
      messageSent800 = true;
    }
    else if (score > 400 && !messageSent400) {
      changeDelay(180);
      showMessage("Tu es bon...\non accelere !");
      messageSent400 = true;
     }
  }
}
