let randomX,randomY,newX,newY;
let stars,milkyStars;
let squareColor = '';

const starCount = 200;
const milkyStarCount = 5000; // Nombre de points pour la Voie lactée

export function initUtils() {
  randomX = 0;
  randomY = 0;

  stars = [];
  milkyStars = [];
}

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
  let colors = [255, Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)];
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
  const minRadius = 0.5; // Rayon minimal des points
  const maxRadius = 1.5; // Rayon maximal des points
  const minOpacity = 0.1; // Opacité minimale
  const maxOpacity = 0.3; // Opacité maximale
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const spread = 300; // Étendue de la région dense

  for (let i = 0; i < milkyStarCount; i++) {
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

    // Vitesse aléatoire pour chaque étoile
    const speed = Math.random() * 0.5 + 0.1; // Vitesse entre 0.1 et 0.6

    milkyStars.push({ x, y, radius, color, speed });
  }
}

export function drawMilkyWay(ctx, canvasWidth) {
  for (const star of milkyStars) {
    // Mettre à jour la position x de l'étoile
    star.x += star.speed;

    // Si l'étoile sort du canvas à droite, la replacer à gauche
    if (star.x > canvasWidth) {
      star.x = 0;
    }

    // Dessiner l'étoile
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

function interpolateColor(color1, color2) {
  const regex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
  const match1 = color1.match(regex);
  const match2 = color2.match(regex);

  const r1 = parseInt(match1[1], 10);
  const g1 = parseInt(match1[2], 10);
  const b1 = parseInt(match1[3], 10);
  const r2 = parseInt(match2[1], 10);
  const g2 = parseInt(match2[2], 10);
  const b2 = parseInt(match2[3], 10);

  // Interpoler chaque composante
  const r = Math.round((r1 + r2)/2);
  const g = Math.round((g1 + g2)/2);
  const b = Math.round((b1 + b2)/2);

  return `rgb(${r}, ${g}, ${b})`;
}

export function drawSquare(ctx, canvas) {
  if (randomX === 0) {
    randomX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    randomY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;

    newX = randomX
    newY = randomY
  }

  if (randomX > newX) { randomX -= 20; }
  else if (randomX < newX) { randomX += 20; }

  if (randomY > newY) { randomY -= 20; }
  else if (randomY < newY) { randomY += 20; }

  // Configurer l'ombre
  ctx.shadowColor = "rgba(200, 200, 200, 0.5)"; // Couleur de l'ombre (noir semi-transparent)
  ctx.shadowBlur = 10; // Flou de l'ombre
  ctx.shadowOffsetX = 5; // Décalage horizontal de l'ombre
  ctx.shadowOffsetY = 5; // Décalage vertical de l'ombre

  squareColor = interpolateColor(squareColor, newRandomColor());
  ctx.fillStyle = squareColor;
  drawRoundedRect(ctx, randomX, randomY, 20, 20, 5);

  // Désactiver l'ombre pour les prochains rectangles à dessiner
  ctx.shadowColor = "transparent";
}

export function moveSquare(canvasWidth, canvasHeight) {
  newX = (Math.floor(Math.random() * ((canvasWidth - 40) / 20)) * 20) + 20;
  newY = (Math.floor(Math.random() * ((canvasHeight - 40) / 20)) * 20) + 20;
}
