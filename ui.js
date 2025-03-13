export function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

export function hideModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

export function updateScoreDisplay(newScore) {
  const scoreBoard = document.getElementById('scoreBoard');
  scoreBoard.textContent = newScore; // Afficher directement le score
}

export function updateTimeDisplay(newTime) {
  const timeBoard = document.getElementById('timeBoard');
  timeBoard.textContent = newTime; // Afficher directement le nombre
}

let currentInterval = null; // Stocker l'identifiant de l'intervalle en cours

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
