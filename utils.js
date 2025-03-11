export let randomX = 0;
export let randomY = 0;
export let randomColor = '';
export let colors = 0


// Fonctions pour manipuler les variables RandomX et RandomY
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
export function getRandomColor() {
  return randomColor;
}

export function drawSquare(ctx, canvas) {
  if (randomX === 0) {
    randomX = (Math.floor(Math.random() * ((canvas.width - 40) / 20)) * 20) + 20;
    randomY = (Math.floor(Math.random() * ((canvas.height - 40) / 20)) * 20) + 20;

    colors = [255, 0, Math.floor(Math.random() * 256)];
    colors.sort(() => Math.random() - 0.5); // Mélanger les composantes
    randomColor = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
  }

  ctx.fillStyle = randomColor;
  ctx.fillRect(randomX, randomY, 20, 20);

  return randomColor
}

export function drawCheckerboard(ctx, canvasWidth, canvasHeight, tileSize) {
  // console.log("Dessiner le damier");
  for (let y = 0; y < canvasHeight; y += tileSize) {

    for (let x = 0; x < canvasWidth; x += tileSize) {
      // Déterminer la couleur du carreau

      const isLightTile = (x / tileSize + y / tileSize) % 2 === 0;
      ctx.fillStyle = isLightTile ? '#D4EED1' : '#AEE3A1'; // Vert clair ou vert normal
      ctx.fillRect(x, y, tileSize, tileSize);
    }
  }
}
