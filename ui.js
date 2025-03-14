let currentInterval = null; // Stocker l'identifiant de l'intervalle en cours
const countdownElement = document.getElementById("countdown");

export function updateScoreDisplay(newScore) {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.textContent = newScore; // Afficher directement le score
}

export function updateTimeDisplay(newTime) {
  const timeBoard = document.getElementById('timeBoard');
  timeBoard.textContent = newTime; // Afficher directement le nombre
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
export function centerCountdown(canvas) {
  const canvasRect = canvas.getBoundingClientRect(); // Obtenir les dimensions du canvas
  countdownElement.style.left = `${canvasRect.left + canvas.width / 2}px`; // Centrer horizontalement
  countdownElement.style.top = `${canvasRect.top + canvas.height / 2}px`; // Centrer verticalement
  countdownElement.style.transform = "translate(-50%, -50%)"; // Ajuster le centrage
}

export function startCountdown(ctx, canvas) {
  let count = 3; // Commence à 3
  countdownElement.style.display = "block"; // Affiche l'élément

  const intervalId = setInterval(() => {
    if (count === 0) {
      clearInterval(intervalId); // Arrête l'intervalle
      countdownElement.style.display = "none"; // Cache l'élément
      callback(); // Exécute la fonction de rappel après le décompte
    } else {
      countdownElement.textContent = count; // Met à jour le chiffre
      countdownElement.style.fontSize = `${100 + (3 - count) * 50}px`; // Fait grossir le chiffre
      count--;
    }
  }, 1000); // Intervalle de 1 seconde
}
