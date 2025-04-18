let stars, milkyStars, starCount, milkyStarCount;
let backdropCanvas, ctx;

export function initBackdrop(canvasWidth, canvasHeight) {
  stars = [];
  milkyStars = [];

  starCount = canvasWidth * canvasHeight / 1000;
  milkyStarCount = canvasWidth * canvasHeight / 100;

  // Set up the canvas and context
  backdropCanvas = document.getElementById('backdrop');
  ctx = backdropCanvas.getContext('2d');

  backdropCanvas.width = canvasWidth;
  backdropCanvas.height = canvasHeight;

  // console.log("backdropCanvas.width =");
  // console.log(backdropCanvas.width);
  // console.log("backdropCanvas.height =");
  // console.log(backdropCanvas.height);

  initStars();
  initMilkyWay();

  drawBackdrop();
}

export function drawBackdrop() {
  // Efface le canvas avant de redessiner
  ctx.clearRect(0, 0, backdropCanvas.width, backdropCanvas.height);

  shineStars();
  drawMilkyWay();

  setTimeout(() => drawBackdrop(), 200);
}

function initStars() {
  // Dessiner les étoiles
  for (let i = 0; i < starCount; i++) {
    const x = Math.random() * backdropCanvas.width;
    const y = Math.random() * backdropCanvas.height;
    const radius = Math.random() + 1;
    const opacity = Math.random() * 0.5 + 0.5;

    stars.push({ x, y, radius, opacity });
  }
}

function shineStars() {
  // Redessine les etoiles
  for (const star of stars) {
    if (star.x <= backdropCanvas.width && star.y <= backdropCanvas.height) {
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity })`;
      ctx.beginPath();
      ctx.arc(star.x+(Math.random() * 1 + 1)*0.5, star.y+(Math.random() * 1 + 1)*0.5, star.radius + ((Math.random() * 1)*0.2), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function initMilkyWay() {
  const minRadius = 0.5; // Rayon minimal des points
  const maxRadius = 1.5; // Rayon maximal des points
  const minOpacity = 0.5; // Opacité minimale
  const maxOpacity = 0.15; // Opacité maximale
  const centerX = backdropCanvas.width / 2;
  const centerY = backdropCanvas.height / 2;

  let spread;
  if (backdropCanvas.width > backdropCanvas.height) {
    spread = backdropCanvas.width / 2; // Étendue de la région dense
  } else {
    spread = backdropCanvas.height / 2; // Étendue de la région dense
  }


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
    const speed = Math.random() * 0.3 + 0.1;

    milkyStars.push({ x, y, radius, color, speed });
  }
}

function drawMilkyWay() {
  for (const star of milkyStars) {
    // Mettre à jour la position x de l'étoile
    star.x += star.speed;

    // Si l'étoile sort du canvas à droite, la replacer à gauche
    if (star.x > backdropCanvas.width) {
      star.x = 0;
    }

    // Dessiner l'étoile
    if (star.x <= backdropCanvas.width && star.y <= backdropCanvas.height) {
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
