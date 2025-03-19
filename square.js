import { newRandomColor, drawRoundedRect, interpolateColor } from './utils.js';
import { showMessage } from './ui.js';
import { isCollidingObject } from './objects.js';

let squarePosX,squarePosY,newPosX,newPosY;
let squareColor,squareOpacity;

let shiftInterval;

export function initSquareVariables() {
  squarePosX = 0;
  squarePosY = 0;

  squareColor = newRandomColor();
  squareOpacity = 1;

  shiftInterval = null;
}

export function setSquarePosX(newValue) {
  squarePosX = newValue;
}
export function setSquarePosY(newValue) {
  squarePosY = newValue;
}
export function getSquarePosX() {
  return squarePosX;
}
export function getSquarePosY() {
  return squarePosY;
}
export function getSquareColor() {
  return squareColor;
}
export function setSquareOpacity(opacityValue) {
  squareOpacity = opacityValue;
}

export function clearShiftInterval() {
  clearInterval(shiftInterval);
  shiftInterval = null;
}

function updateOpacity() {
  const regex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/;
  const match1 = squareColor.match(regex);

  const r1 = parseInt(match1[1], 10);
  const g1 = parseInt(match1[2], 10);
  const b1 = parseInt(match1[3], 10);

  squareColor = `rgba(${r1}, ${g1}, ${b1}, ${squareOpacity})`;
}

export function drawSquare(ctx, canvasWidth, canvasHeight) {
  if (squarePosX === 0) {
    squarePosX = (Math.floor(Math.random() * ((canvasWidth - 40) / 20)) * 20) + 20;
    squarePosY = (Math.floor(Math.random() * ((canvasHeight - 40) / 20)) * 20) + 20;

    while (isCollidingObject(squarePosX, squarePosY, 20)) {
      squarePosX = (Math.floor(Math.random() * ((canvasWidth - 40) / 20)) * 20) + 20;
      squarePosY = (Math.floor(Math.random() * ((canvasHeight - 40) / 20)) * 20) + 20;
    }

    newPosX = squarePosX
    newPosY = squarePosY
  }

  if (squarePosX > newPosX) {
    squarePosX -= 20;
  }
  else if (squarePosX < newPosX) {
    squarePosX += 20;
  }

  if (squarePosY > newPosY) {
    squarePosY -= 20;
  }
  else if (squarePosY < newPosY) {
    squarePosY += 20;
  }

  // Configurer l'ombre
  ctx.shadowColor = "rgba(200, 200, 200, 0.3)"; // Couleur de l'ombre (noir semi-transparent)
  ctx.shadowBlur = 20; // Flou de l'ombre

  squareColor = interpolateColor(squareColor, newRandomColor());
  updateOpacity();
  ctx.fillStyle = squareColor;

  // for (let i = 0; i < 5; i++) {
  //   ctx.shadowOffsetX = Math.cos(i) * 5; // Décalage horizontal
  //   ctx.shadowOffsetY = Math.sin(i) * 5; // Décalage vertical
  //   drawRoundedRect(ctx, squarePosX, squarePosY, 20, 20, 5);
  // }
  drawRoundedRect(ctx, squarePosX, squarePosY, 20, 20, 5);

  // Désactiver l'ombre pour les prochains rectangles à dessiner
  ctx.shadowColor = "transparent";
}

export function moveSquare(canvasWidth, canvasHeight) {
  newPosX = (Math.floor(Math.random() * ((canvasWidth - 40) / 20)) * 20) + 20;
  newPosY = (Math.floor(Math.random() * ((canvasHeight - 40) / 20)) * 20) + 20;

  while (isCollidingObject(newPosX, newPosY, 20)) {
    newPosX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    newPosY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;
  }
}

export function shiftSquare(canvasWidth, canvasHeight) {
  let iteration = 40;

  showMessage("OOOhhhhHHH, ça bouge.............");

  shiftInterval = setInterval(() => {
    if (iteration === 0) {
      clearInterval(shiftInterval); // Arrête l'intervalle
      shiftInterval = null;
    }
    else if (iteration > 0) {
      const aleajactaest = Math.random();

      if (aleajactaest > 0.8 && newPosX < canvasWidth && !isCollidingObject(squarePosX + 20, squarePosY, 20)) {
        newPosX += 20;
      }
      else if (aleajactaest > 0.4 && newPosX > 0  && !isCollidingObject(squarePosX - 20, squarePosY, 20)) {
        newPosX -= 20;
      }
      else if (aleajactaest > 0.6 && newPosY < canvasHeight && !isCollidingObject(squarePosX, squarePosY + 20, 20)) {
        newPosY += 20;
      }
      else if (aleajactaest > 0.2 && newPosY > 0  && !isCollidingObject(squarePosX, squarePosY -20, 20)) {
        newPosY -= 20;
      }

      iteration -= 1;
    }
  }, 300);
}

export function isCollidingSquare(x, y, dimensions) {
  if (
    squarePosX < x + dimensions &&
    squarePosX + 20 > x &&
    squarePosY < y + dimensions &&
    squarePosY + 20 > y
  ) {
    return true; // Collision détectée
  }
  return false; // Pas de collision
}
