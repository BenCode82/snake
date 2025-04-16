import { moveSquare, setSquareOpacity, shiftSquare, clearShiftInterval } from './square.js';
import { createObject } from './objects.js';
import { getGameRunning } from './game.js';
import { resizeCanvas } from './controller.js';

// const messageContent = document.getElementById('messageContent');
// const messageWindow = document.getElementById('messageWindow');
const countdownElement = document.getElementById("countdown");

let currentMessageInterval,currentCountdownInterval,disparitionInterval;
let isCountdowning;

export function initUI(canvas) {
  currentMessageInterval = null;
  currentCountdownInterval = null;
  disparitionInterval = null;

  isCountdowning = false;

  countdownElement.style.fontSize = `${canvas.height}px`;
  countdownElement.style.display = "none";

  centerCountdown(canvas);

  showMessage("Bonjour, aventurier ! Prêt à explorer ce monde mystérieux ?");

  setTimeout(() =>
    showMessage("Appuie sur l'une des fleches pour commencer.\n \n \u2190\n \u2191\n \u2192\n \u2193"), 4000);
}

export function stopCountdown() {
  clearInterval(currentCountdownInterval);
  currentCountdownInterval = null;

  clearInterval(disparitionInterval);
  disparitionInterval = null;
  setSquareOpacity(1);

  clearShiftInterval();

  countdownElement.textContent = "";
  isCountdowning = false;
}

export function updateScoreDisplay(newScore) {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.textContent = newScore; // Afficher directement le score
}

export function updateTimeDisplay(newTime) {
  const timeBoard = document.getElementById('timeBoard');
  timeBoard.textContent = newTime; // Afficher directement le nombre
}

export function showMessage(message, speed = 40) {
    // Afficher la fenêtre
  // messageWindow.style.display = 'block';

  // Arrêter l'affichage du message en cours (s'il y en a un)
  if (currentMessageInterval) {
    clearInterval(currentMessageInterval);
    currentMessageInterval = null;
  }

  // Réinitialiser le contenu
  // messageContent.textContent = '';

  let index = 0;
  currentMessageInterval = setInterval(() => {
    if (index < message.length) {
      // Ajouter une lettre à la fois
      // messageContent.textContent += message[index];
      index++;
    } else {
      // Arrêter l'animation
      clearInterval(currentMessageInterval);
      currentMessageInterval = null;
    }
  }, speed); // Vitesse d'affichage (en millisecondes)

  setTimeout(() => {
    if(getGameRunning()) {
      clearInterval(currentMessageInterval);
      currentMessageInterval = null;
      // messageContent.textContent = '';
      // messageWindow.style.display = 'none';
    }
  }, 12000);
}

// Fonction pour centrer le décompte sur le canvas
function centerCountdown(canvas) {

  console.log("window.innerWidth");
  console.log(window.innerHeight);

  console.log("canvas.width");
  console.log(canvas.width);

  // // Obtenir les dimensions et la position du canvas par rapport à son conteneur
  // const canvasRect = canvas.getBoundingClientRect();
  // const containerRect = canvas.parentElement.getBoundingClientRect();

  // // Calculer la position relative du canvas dans son conteneur
  // const canvasTop = canvasRect.top - containerRect.top;
  // const canvasLeft = canvasRect.left - containerRect.left;

  // Centrer verticalement le décompte sur le canvas
  countdownElement.style.top = `${(canvas.height / 2) - 50}px`;
  countdownElement.style.left = `${(canvas.width) / 2}px`;
  countdownElement.style.transform = "translate(-50%, -50%)";
}

export function startCountdown(ctx, canvasWidth, canvasHeight) {
  if (isCountdowning) return;

  isCountdowning = true;
  let count = Math.floor(Math.random()*3 + 3); // Commence à 3 avec entre 0 et 2 sec de delai
  currentCountdownInterval = setInterval(() => {
    if (getGameRunning()) {
      if (count === 0) {
        clearInterval(currentCountdownInterval); // Arrête l'intervalle
        currentCountdownInterval = null;
        countdownElement.textContent = "";
        countdownElement.style.display = "none"; // Cache l'élément
        isCountdowning = false;

        // Tableau contenant les fonctions "evenements"
        const events = [
          { func: moveSquare, args: [canvasWidth, canvasHeight] },
          { func: opacitySquare, args: [] },
          { func: shiftSquare, args: [canvasWidth, canvasHeight] },
          // { func: resizeCanvas, args: [] }
        ];

        // Sélection aléatoire d'un evenement
        const randomIndex = Math.floor(Math.random() * events.length);
        const selectedEvent = events[randomIndex];
        selectedEvent.func(...selectedEvent.args);
        createObject(ctx, canvasWidth, canvasHeight);

      } else if (count < 4 && isCountdowning) {
        countdownElement.textContent = count; // Met à jour le chiffre
        countdownElement.style.display = "block"; // Affiche l'élément
        count -= 1;
        if (count == 2 && Math.random() > 0.8) {
          // showMessage("Vite !\n\n........");
        }
      } else if (count >= 4 && isCountdowning) {
        countdownElement.textContent = "";
        countdownElement.style.display = "none"; // Cache l'élément
        count -= 1;
      } else if (isCountdowning === false) {
        countdownElement.textContent = "";
        countdownElement.style.display = "none"; // Cache l'élément
      }
    }
    else {
      countdownElement.textContent = "";
      countdownElement.style.display = "none"; // Cache l'élément
    }
  }, 1000); // Intervalle de 1 seconde
}

function opacitySquare() {
  let iteration = 8;
  setSquareOpacity(0.8);

  disparitionInterval = setInterval(() => {
    if (iteration === 0) {
      clearInterval(disparitionInterval); // Arrête l'intervalle
      disparitionInterval = null;

      setSquareOpacity(1);
    }
    else if (iteration < 5) {
      setSquareOpacity(0);
      iteration -= 1;
    }
    else if (iteration === 5) {
      setSquareOpacity(0.15);
      showMessage("Ou suis-je ?\n\n👀");

      iteration -= 1;
    }
    else if (iteration === 6) {
      setSquareOpacity(0.25);
      iteration -= 1;
    }
    else if (iteration === 8) {
      setSquareOpacity(0.6);
      iteration -= 1;
    }
    else {
      iteration -= 1;
    }
  }, 1200); // Intervalle de 1 seconde
}
