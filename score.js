import { updateScoreDisplay, updateTimeDisplay, showMessage} from './ui.js';
import { changeDelay } from './game.js';

let score,time;

let isCounting;

let messageSent8000;
let messageSent6000;
let messageSent4500;
let messageSent3500;
let messageSent2800;
let messageSent2200;
let messageSent1800;
let messageSent1400;
let messageSent1000;
let messageSent600;
let messageSent300;

export function getScore() {
  return score;
}

export function initScoreAndTime() {
  isCounting = false;

  messageSent8000 = false;
  messageSent6000 = false;
  messageSent4500 = false;
  messageSent3500 = false;
  messageSent2800 = false;
  messageSent2200 = false;
  messageSent1800 = false;
  messageSent1400 = false;
  messageSent1000 = false;
  messageSent600 = false;
  messageSent300 = false;

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

    if (score > 8000 && !messageSent8000) {
      changeDelay(70);
      messageSent8000 = true;
    }
    else if (score > 6000 && !messageSent6000) {
      changeDelay(80);
      // showMessage("Tu entres dans le couloir de la mort. \nBonne chance \n \n 💀💀💀");
      messageSent6000 = true;
    }
    else if (score > 4500 && !messageSent4500) {
      changeDelay(90);
      messageSent4500 = true;
    }
    else if (score > 3500 && !messageSent3500) {
      changeDelay(100);
      messageSent3500 = true;
    }
    else if (score > 2800 && !messageSent2800) {
      changeDelay(110);
      messageSent2800 = true;
    }
    else if (score > 2200 && !messageSent2200) {
      changeDelay(120);
      // showMessage("Allons un peu plus vite !");
      messageSent2200 = true;
    }
    else if (score > 1800 && !messageSent1800) {
      changeDelay(130);
      messageSent1800 = true;
    }
    else if (score > 1400 && !messageSent1400) {
      changeDelay(140);
      messageSent1400 = true;
    }
    else if (score > 1000 && !messageSent1000) {
      changeDelay(150);
      // showMessage("Tu es bon...\non accelere !");
      messageSent1000 = true;
    }
    else if (score > 600 && !messageSent600) {
      changeDelay(160);
      messageSent600 = true;
    }
    else if (score > 300 && !messageSent300) {
      changeDelay(180);
      messageSent300 = true;
     }
  }
}
