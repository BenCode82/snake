let stars,milkyStars;

const starCount = 400;
const milkyStarCount = 8000; // Nombre de points pour la Voie lactée
let maxWidthHeight;

export function initBackdrop(canvasWidth, canvasHeight) {
  stars = [];
  milkyStars = [];

  maxWidthHeight = Math.max(canvasWidth, canvasHeight);

  initStars(maxWidthHeight);
  initMilkyWay(maxWidthHeight);
}

export function drawBackdrop(ctx, canvasWidth, canvasHeight) {
  // Efface le canvas avant de redessiner
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // Remplir le fond en noir
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  shineStars(ctx, canvasWidth, canvasHeight);
  drawMilkyWay(ctx, canvasWidth, canvasHeight);
}

function initStars(maxWidthHeight) {
  // Dessiner les étoiles
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * maxWidthHeight;
    const y = Math.random() * maxWidthHeight;
    const radius = Math.random() * 2 + 1;
    const opacity = Math.random() * 0.5 + 0.5;

    stars.push({ x, y, radius, opacity });
  }
}

function shineStars(ctx, canvasWidth, canvasHeight) {
  // Redessine les etoiles
  for (const star of stars) {
    if (star.x <= canvasWidth && star.y <= canvasHeight) {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity })`;
      ctx.beginPath();
      ctx.arc(star.x+(Math.random() * 2 - 1)*0.2, star.y+(Math.random() * 2 - 1)*0.2, star.radius + ((Math.random() * 2 - 1)*0.2), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function initMilkyWay(maxWidthHeight) {
  const minRadius = 0.5; // Rayon minimal des points
  const maxRadius = 1.5; // Rayon maximal des points
  const minOpacity = 0.1; // Opacité minimale
  const maxOpacity = 0.3; // Opacité maximale
  const centerX = maxWidthHeight / 2;
  const centerY = maxWidthHeight / 3;
  const spread = maxWidthHeight / 2; // Étendue de la région dense

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

function drawMilkyWay(ctx, canvasWidth, canvasHeight) {
  for (const star of milkyStars) {
    // Mettre à jour la position x de l'étoile
    star.x += star.speed;

    // Si l'étoile sort du canvas à droite, la replacer à gauche
    if (star.x > maxWidthHeight) {
      star.x = 0;
    }

    // Dessiner l'étoile
    if (star.x <= canvasWidth && star.y <= canvasHeight) {
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
