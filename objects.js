import { newRandomColorA, drawRoundedRect } from './utils.js';

// Tableau des objets à afficher
let objects;

export function initObjects(ctx, canvas) {
  objects = [];
}

export function getObjects() {
  return objects;
}

export function createObject(ctx, canvasWidth, canvasHeight) {

  const xpos = (Math.floor(Math.random() * ((canvasWidth - 40) / 20)) * 20) + 20;
  const ypos = (Math.floor(Math.random() * ((canvasHeight - 40) / 20)) * 20) + 20;
  const dim = Math.floor(Math.random() * 2)+2; // dimension 2 ou 3

  const metallicSquare = {
    x: xpos,
    y: ypos,
    dimension: dim,
    dimensions : dim * 20,
    size: 20,
    spacing: 20,
    radius: 5,
    shadowColor: "rgba(100, 200, 200, 0.5)",
    shadowBlur: 8,
    shadowOffsetX: 3,
    shadowOffsetY: 5,
    fillColor: newRandomColorA(0.3),
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

          // Ajouter un reflet lumineux (dégradé)
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

  objects.push(metallicSquare);
}

export function moveObjects(ctx, canvasWidth, canvasHeight) {
  // On se limite à 10 objets maximum
  while (objects.length > 10) {
    objects.shift();
  }

  objects.forEach((element) => {

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
