import { resetScoreAndTime } from './score.js';
import { drawRoundedRect, moveSquare, newRandomColorA } from './utils.js';
import { addElement, getElements } from './controller.js';

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

export function initUI(canvas) {
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

export function startCountdown(ctx, canvasWidth, canvasHeight) {
  if (isCountdowning) return;

  isCountdowning = true;
  count = 3; // Commence à 3
  const intervalId = setInterval(() => {
    if (count === 0) {
      clearInterval(intervalId); // Arrête l'intervalle
      countdownElement.style.display = "none"; // Cache l'élément

      isCountdowning = false;

      if (Math.random() > 0.666) { // 1 chance sur 3
        insertMetallicSquare(ctx, canvasWidth, canvasHeight, 2);
      }

      // Tableau contenant les fonctions "evenements"
      const events = [
        { func: moveSquare, args: [canvasWidth, canvasHeight] },
        { func: insertMetallicSquare, args: [ctx, canvasWidth, canvasHeight, Math.floor(Math.random() * 2)+2] } // dimension 2 ou 3
      ];

      // Sélection aléatoire d'un evenement
      const randomIndex = Math.floor(Math.random() * events.length);
      const selectedEvent = events[randomIndex];
      selectedEvent.func(...selectedEvent.args);

    } else {
      countdownElement.textContent = count; // Met à jour le chiffre
      countdownElement.style.display = "block"; // Affiche l'élément
      count -= 1;
    }
  }, 1000); // Intervalle de 1 seconde
}

export function insertMetallicSquare(ctx, canvasWidth, canvasHeight, dim) {
  const xpos = (Math.floor(Math.random() * ((canvasWidth - 40) / 20)) * 20) + 20;
  const ypos = (Math.floor(Math.random() * ((canvasHeight - 40) / 20)) * 20) + 20;
  const newColor = newRandomColorA();

  const metallicSquare = {
    x: xpos,
    y: ypos,
    dimension: dim,
    size: 20,
    spacing: 20,
    radius: 5,
    shadowColor: "rgba(100, 200, 200, 0.5)",
    shadowBlur: 8,
    shadowOffsetX: 3,
    shadowOffsetY: 5,
    // fillColor: "rgba(100, 100, 196, 0.5)",
    fillColor: newColor,
    borderColor: "rgba(255, 255, 255, 0.6)", // Bordure claire pour l'effet de verre
    highlightColor: "rgba(255, 255, 255, 0.3)", // Reflet lumineux
    visible: true,

    draw(ctx) {
      if (!this.visible) return;

      // Sauvegarder l'état du contexte
      ctx.save();

      ctx.shadowColor = this.shadowColor;
      ctx.shadowBlur = this.shadowBlur;
      ctx.shadowOffsetX = this.shadowOffsetX;
      ctx.shadowOffsetY = this.shadowOffsetY;

      // ctx.shadowColor = "transparent";
      // Dessiner les petits carrés avec un effet de verre
      for (let i = 0; i < this.dimension; i++) {
        for (let j = 0; j < this.dimension; j++) {
          const x = this.x + i * this.spacing;
          const y = this.y + j * this.spacing;

          // Dessiner le fond transparent
          ctx.fillStyle = this.fillColor;
          drawRoundedRect(ctx, x, y, this.size, this.size, this.radius);

          // Ajouter une bordure claire pour l'effet de verre
          ctx.strokeStyle = this.borderColor;
          ctx.lineWidth = 0.05;
          ctx.stroke();

          // // Ajouter un reflet lumineux (dégradé)
          const gradient = ctx.createLinearGradient(x, y, x + this.size, y + this.size);
          gradient.addColorStop(0, this.highlightColor);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = gradient;
        }
      }
      // Restaurer l'état du contexte
      ctx.restore();
    },
  };

  addElement(metallicSquare);
}

export function updateCanvas(ctx, canvasWidth, canvasHeight) {
  const elements = getElements();

  elements.forEach((element) => {
    console.log((element.dimension * element.size));
    if (Math.random() > 0.99) {
      if (element.x < canvasHeight - (element.dimension * element.size)) { element.x += 20; }
    }
    else if (Math.random() > 0.98) {
      if (element.x > 0 ) { element.x -= 20; }
    }
    else if (Math.random() > 0.97) {
      if (element.y < canvasWidth - (element.dimension * element.size)) { element.y += 20; }
    }
    else if (Math.random() > 0.96) {
      if (element.y > 0 ) { element.y -= 20; }
    }

    element.draw(ctx);
  });
}
