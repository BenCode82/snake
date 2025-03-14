import { resetScoreAndTime } from './score.js';
import { drawRoundedRect } from './utils.js';

const countdownElement = document.getElementById("countdown");
countdownElement.style.display = "none";
countdownElement.style.fontSize = `200px`; // Taille des chiffres du decompte

let currentInterval;
let isCountdowning;
let count;

export function updateScoreDisplay(newScore) {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.textContent = newScore; // Afficher directement le score
}

export function updateTimeDisplay(newTime) {
  const timeBoard = document.getElementById('timeBoard');
  timeBoard.textContent = newTime; // Afficher directement le nombre
}

export function initInterface(canvas) {
  currentInterval = null;
  isCountdowning = false;

  centerCountdown(canvas);
  resetScoreAndTime(); // Initialiser le score et le temps à 0

  showMessage("Bonjour, aventurier ! Prêt à explorer ce monde mystérieux ?");

  setTimeout(() =>
    showMessage("Appuie sur l'une des fleches pour commencer.\n \n \u2190\n \u2191\n \u2192\n \u2193"), 4000);
}

export function showMessage(message, speed = 50) {
  const messageContent = document.getElementById('messageContent');
  const messageWindow = document.getElementById('messageWindow');

  // Afficher la fenêtre
  messageWindow.style.display = 'block';

  // Arrêter l'affichage du message en cours (s'il y en a un)
  if (currentInterval) {
    clearInterval(currentInterval);
    currentInterval = null;
  }

  // Réinitialiser le contenu
  messageContent.textContent = '';

  let index = 0;
  currentInterval = setInterval(() => {
    if (index < message.length) {
      // Ajouter une lettre à la fois
      messageContent.textContent += message[index];
      index++;
    } else {
      // Arrêter l'animation
      clearInterval(currentInterval);
      currentInterval = null;
    }
  }, speed); // Vitesse d'affichage (en millisecondes)
}

// Fonction pour centrer le décompte sur le canvas
function centerCountdown(canvas) {
  // Obtenir les dimensions et la position du canvas par rapport à son conteneur
  const canvasRect = canvas.getBoundingClientRect();
  const containerRect = canvas.parentElement.getBoundingClientRect();

  // Calculer la position relative du canvas dans son conteneur
  const canvasTop = canvasRect.top - containerRect.top;

  // Centrer verticalement le décompte sur le canvas
  countdownElement.style.top = `${canvasTop + canvas.height/2}px`;
  countdownElement.style.transform = "translate(-50%, -50%)";
}

export function startCountdown() {
  if (isCountdowning) return;

  isCountdowning = true;

  count = 3; // Commence à 3
  const intervalId = setInterval(() => {
    if (count === 0) {
      clearInterval(intervalId); // Arrête l'intervalle
      countdownElement.style.display = "none"; // Cache l'élément

      isCountdowning = false;
    } else {
      countdownElement.textContent = count; // Met à jour le chiffre
      countdownElement.style.display = "block"; // Affiche l'élément
      count -= 1;
    }
  }, 1000); // Intervalle de 1 seconde
}

export function insertMetallicSquare(ctx) {
  // Configurer l'ombre
  ctx.shadowColor = "rgba(100, 200, 200, 0.5)"; // Couleur de l'ombre
  ctx.shadowBlur = 8; // Flou de l'ombre
  ctx.shadowOffsetX = 3 ; // Décalage horizontal de l'ombre
  ctx.shadowOffsetY = 5; // Décalage vertical de l'ombre

  // Dessiner le rectangle rempli (avec transparence)
  ctx.fillStyle = "rgba(10, 10, 230, 0.6)";
  drawRoundedRect(ctx, 200, 200, 20, 20, 5)
  drawRoundedRect(ctx, 220, 200, 20, 20, 5)
  drawRoundedRect(ctx, 200, 220, 20, 20, 5)
  drawRoundedRect(ctx, 220, 220, 20, 20, 5)

  ctx.fillStyle = "black";

  // Désactiver l'ombre pour les prochains rectangles à dessiner
  ctx.shadowColor = "transparent";
}
