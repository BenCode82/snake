import { newRandomColor, drawRoundedRect, interpolateColor } from './utils.js';

let squarePosX,squarePosY,newPosX,newPosY;
let squareColor,squareOpacity;

export function initSq() {
  squarePosX = 0;
  squarePosY = 0;

  squareColor = '';
  squareOpacity = 1;
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

function updateOpacity() {
  const regex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/;
  const match1 = squareColor.match(regex);

  const r1 = parseInt(match1[1], 10);
  const g1 = parseInt(match1[2], 10);
  const b1 = parseInt(match1[3], 10);

  squareColor = `rgba(${r1}, ${g1}, ${b1}, ${squareOpacity})`;
}

export function initSquare(ctx, canvas) {
  if (squarePosX === 0) {
    squarePosX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    squarePosY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;

    squareColor = newRandomColor();
  }

  ctx.fillStyle = squareColor;
  drawRoundedRect(ctx, squarePosX, squarePosY, 20, 20, 5);
}

export function drawSquare(ctx, canvas) {
  if (squarePosX === 0) {
    squarePosX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    squarePosY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;

    newPosX = squarePosX
    newPosY = squarePosY
  }

  if (squarePosX > newPosX) { squarePosX -= 20; }
  else if (squarePosX < newPosX) { squarePosX += 20; }

  if (squarePosY > newPosY) { squarePosY -= 20; }
  else if (squarePosY < newPosY) { squarePosY += 20; }

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
}
