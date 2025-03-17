let stars,milkyStars;

const starCount = 200;
const milkyStarCount = 5000; // Nombre de points pour la Voie lactée

export function initBackdrop() {
  stars = [];
  milkyStars = [];
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
