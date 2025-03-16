// const canvas = document.getElementById("gameCanvas");
// const ctx = canvas.getContext("2d");
// const canvasWidth = 400;
// const canvasHeight = 600;

// // Classe pour représenter un fragment d'explosion
// class Fragment {
//   constructor(x, y, size, color, velocityX, velocityY) {
//     this.x = x;
//     this.y = y;
//     this.size = size;
//     this.color = color;
//     this.velocityX = velocityX;
//     this.velocityY = velocityY;
//     this.alpha = 1; // Opacité initiale
//   }

//   // Mettre à jour la position et l'opacité du fragment
//   update() {
//     this.x += this.velocityX;
//     this.y += this.velocityY;
//     this.alpha -= 0.01; // Réduire l'opacité progressivement
//   }

//   // Dessiner le fragment
//   draw(ctx) {
//     ctx.save();
//     ctx.globalAlpha = this.alpha; // Appliquer l'opacité
//     ctx.fillStyle = this.color;
//     ctx.fillRect(this.x, this.y, this.size, this.size);
//     ctx.restore();
//   }
// }

// // Fonction pour créer une explosion
// function createExplosion(x, y, baseSize, color, numFragments) {
//   const fragments = [];

//   for (let i = 0; i < numFragments; i++) {
//     // Calculer une vitesse aléatoire pour chaque fragment
//     const angle = Math.random() * 2 * Math.PI; // Direction aléatoire
//     const speed = Math.random() * 5 + 2; // Vitesse aléatoire
//     const velocityX = Math.cos(angle) * speed;
//     const velocityY = Math.sin(angle) * speed;

//     // Créer un fragment
//     const fragment = new Fragment(
//       x, // Position X initiale
//       y, // Position Y initiale
//       Math.random() * 5 + 2, // Taille aléatoire
//       color, // Couleur du fragment
//       velocityX, // Vitesse horizontale
//       velocityY // Vitesse verticale
//     );

//     fragments.push(fragment);
//   }

//   return fragments;
// }

// // Tableau pour stocker les fragments d'explosion
// let explosions = [];

// // Fonction pour animer l'explosion
// function animateExplosion() {
//   ctx.clearRect(0, 0, canvasWidth, canvasHeight);

//   // Mettre à jour et dessiner chaque fragment
//   explosions.forEach((explosion, index) => {
//     explosion.fragments.forEach((fragment) => {
//       fragment.update();
//       fragment.draw(ctx);
//     });

//     // Supprimer l'explosion si tous les fragments sont invisibles
//     if (explosion.fragments.every((fragment) => fragment.alpha <= 0)) {
//       explosions.splice(index, 1);
//     }
//   });

//   // Continuer l'animation
//   requestAnimationFrame(animateExplosion);
// }


// export function explosion() {
//   // Démarrer l'animation
//   animateExplosion();



//   // Exemple : Créer une explosion au centre du canvas
//   const centerX = canvasWidth / 2;
//   const centerY = canvasHeight / 2;
//   explosions.push({
//     fragments: createExplosion(centerX, centerY, 20, "orange", 50), // 50 fragments
//   });
// }
