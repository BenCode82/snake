export let randomX = 0;
export let randomY = 0;
export let squareColor = '';
export let colors = 0;

const stars = [];
const milkyStars = [];

export function setRandomX(newValue) {
  randomX = newValue;
}
export function setRandomY(newValue) {
  randomY = newValue;
}
export function getRandomX() {
  return randomX;
}
export function getRandomY() {
  return randomY;
}
export function getSquareColor() {
  return squareColor;
}

export function newRandomColor() {
  colors = [255, Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)];
  colors.sort(() => Math.random() - 0.5); // Mélanger les composantes

  return `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
}

export function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // Coin supérieur gauche (départ)
  ctx.lineTo(x + width - radius, y); // Ligne horizontale supérieure
  ctx.arcTo(x + width, y, x + width, y + radius, radius); // Coin supérieur droit
  ctx.lineTo(x + width, y + height - radius); // Ligne verticale droite
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius); // Coin inférieur droit
  ctx.lineTo(x + radius, y + height); // Ligne horizontale inférieure
  ctx.arcTo(x, y + height, x, y + height - radius, radius); // Coin inférieur gauche
  ctx.lineTo(x, y + radius); // Ligne verticale gauche
  ctx.arcTo(x, y, x + radius, y, radius); // Coin supérieur gauche
  ctx.closePath();
  ctx.fill();
}

export function initStars(ctx, canvasWidth, canvasHeight) {
  // Remplir le fond en noir
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Dessiner les étoiles
  const starCount = 100;
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const radius = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.5 + 0.5;

    stars.push({ x, y, radius, opacity });

    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function shineStars(ctx, canvasWidth, canvasHeight) {
  // Efface le canvas avant de redessiner
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Remplir le fond en noir
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // Redessine les etoiles
  for (const star of stars) {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity })`;
    ctx.beginPath();
    ctx.arc(star.x+(Math.random() * 2 - 1)*0.2, star.y+(Math.random() * 2 - 1)*0.2, star.radius + ((Math.random() * 2 - 1)*0.2), 0, Math.PI * 2);
    ctx.fill();
  }
}

export function initMilkyWay(ctx, canvasWidth, canvasHeight) {
  const starCount = 1000; // Nombre de points pour la Voie lactée
  const minRadius = 0.5; // Rayon minimal des points
  const maxRadius = 1.5; // Rayon maximal des points
  const minOpacity = 0.1; // Opacité minimale
  const maxOpacity = 0.3; // Opacité maximale
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const spread = 300; // Étendue de la région dense

  for (let i = 0; i < starCount; i++) {
    // Position aléatoire autour du centre
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * spread;
    const x = centerX + Math.cos(angle) * distance;
    const y = centerY + Math.sin(angle) * distance;

    // Rayon et opacité aléatoires
    const radius = Math.random() * (maxRadius - minRadius) + minRadius;
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;

    // Couleur légèrement bleutée pour certains points
    const colorVariation = Math.random();
    const color = colorVariation < 0.2 ? `rgba(200, 220, 255, ${opacity})` : `rgba(255, 255, 255, ${opacity})`;


    milkyStars.push({ x, y, radius, color});

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawMilkyWay(ctx) {
  // Redessine la voie lactée
  for (const star of milkyStars) {
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function initSquare(ctx, canvas) {
  if (randomX === 0) {
    randomX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    randomY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;

    squareColor = newRandomColor();
  }

  ctx.fillStyle = squareColor;
  drawRoundedRect(ctx, randomX, randomY, 20, 20, 5);
}

export function drawSquare(ctx, canvas) {
  if (randomX === 0) {
    randomX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    randomY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;

    colors = [255, 0, Math.floor(Math.random() * 256)];
    colors.sort(() => Math.random() - 0.5); // Mélanger les composantes
    squareColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
  }

  ctx.fillStyle = squareColor;
  drawRoundedRect(ctx, randomX, randomY, 20, 20, 5);
}


// export function animateSquareColor(ctx) {
//   let startTime = null;

//   function step(timestamp) {
//     if (!startTime) startTime = timestamp;
//     const elapsed = timestamp - startTime;

//     duration = 1; // Choix d'un effet d'1 seconde
//     const progress = Math.min(elapsed / duration, 1);

//     // Calculer la couleur intermédiaire
//     const currentColor = interpolateColor(squareColor, newRandomColor(), progress);

//     // Dessiner un carré avec la couleur interpolée
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
//     ctx.fillStyle = currentColor;
//     // ctx.fillRect(randomX, randomY, 20, 20);
//     drawRoundedRect(ctx, randomX, randomY, 20, 20, 5)

//     // Continuer l'animation
//     if (progress < 1) {
//       requestAnimationFrame(step);
//     }
//   }

//   requestAnimationFrame(step);
// }
