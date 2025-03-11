export function showModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
}

export function hideModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

let score = 0;

export function updateScoreDisplay(newScore) {
  const digits = Array.from(String(newScore), Number);  // Convertir le score en tableau de chiffres
  const scoreBoard = document.getElementById('scoreBoard');
  const digitElements = scoreBoard.querySelectorAll('.digit');

  // Ajuster la longueur des chiffres pour correspondre au nombre de divs
  while (digits.length < digitElements.length) {
    digits.unshift(0);  // Ajouter des 0 au début pour combler
  }

  digits.forEach((num, index) => {
    const digitElement = digitElements[index];
    const topSpan = digitElement.querySelector('.top');
    const bottomSpan = digitElement.querySelector('.bottom');

    if (topSpan.textContent != num) {
      digitElement.classList.add('flip');

      // Mettre à jour les chiffres après l'animation
      setTimeout(() => {
        topSpan.textContent = num;
        bottomSpan.textContent = num;
        digitElement.classList.remove('flip');
      }, 500);
    }
  });
}
