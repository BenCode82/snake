import { getGameRunning, endGame } from './game.js';
import { addCollision } from './score.js';
import { startCountdown, stopCountdown } from './ui.js';
import { getSquareColor, setSquarePosX, getSquarePosX, getSquarePosY } from './square.js';
import { newRandomColor, drawRoundedRect } from './utils.js';
import { isCollidingObject } from './objects.js';

export let snake = [];
let directionX;
let directionY;

export function setDirectionX(newValue) {
  directionX = newValue;
}
export function setDirectionY(newValue) {
  directionY = newValue;
}
export function getDirectionX() {
  return directionX;
}
export function getDirectionY() {
  return directionY;
}

// Initialisation du serpent
export function initSnake() {
  snake = [
    { x: 180, y: 180, color: newRandomColor() },
    { x: 160, y: 180, color: newRandomColor() }
  ];
}

export function collisionDetected(canvasWidth, canvasHeight) {
  // Collision avec les murs
  if ((snake[0].x < 0 || snake[0].x > canvasWidth-20) || (snake[0].y < 0 || snake[0].y > canvasHeight-20)) {
    endGame();
  }

  // Collision avec le corps
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      endGame();
    }
  }

  // Collision avec les objets
  const head = snake[0]; // Tête du serpent
  if (isCollidingObject(head.x, head.y, 20)) {
    endGame();
  }

  // Collision avec le carré
  if (directionX == 20) {
    if (snake[0].x === getSquarePosX()-20 && snake[0].y === getSquarePosY()) {
      return true;
    }
  }
  else if (directionX == -20) {
    if (snake[0].x === getSquarePosX()+20 && snake[0].y === getSquarePosY()) {
      return true;
    }
  }
  else if (directionY == 20) {
    if (snake[0].x === getSquarePosX() && snake[0].y === getSquarePosY()-20) {
      return true;
    }
  }
  else if (directionY == -20) {
    if (snake[0].x === getSquarePosX() && snake[0].y === getSquarePosY()+20) {
      return true;
    }
  }

  return false;
}

// Déplacement du serpent
export function moveSnake(ctx, canvas) {

  if (collisionDetected(canvas.width, canvas.height) === true) {
    addCollision();
    invertColors(ctx);
    stopCountdown();

    const newHead = {
        x: snake[0].x + directionX,
        y: snake[0].y + directionY,
        color: getSquareColor()
    };
    snake.unshift(newHead);

    // Ne pas retirer la queue pour que le serpent grossisse
    setSquarePosX(0);

    // Lance un decompte avant d'envoyer un evenement
    startCountdown(ctx, canvas.width, canvas.height);

  } else if (getGameRunning() === true) {
    const newHead = {
        x: snake[0].x + directionX,
        y: snake[0].y + directionY,
        color: snake[0].color
    };
    // Rajoute la tete
    snake.unshift(newHead);

    // Decale les couleurs
    snake.forEach((segment, index) => {
    if (index > 0 && index < snake.length - 1) {
      segment.color = snake[index + 1].color; // Couleur du segment suivant
    }});

    // Retire le dernier segment si pas de collision
    snake.pop();
  }
}

export function drawSnake(ctx, canvasWidth, canvasHeight) {

  snake.forEach(segment => {
    ctx.fillStyle = segment.color;

    drawRoundedRect(ctx, segment.x, segment.y, 20, 20, 5);
  });
}

function invertRGBColor(color) {
  // Extraire les valeurs r, g, b de la chaîne
  const regex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)/;
  const match = color.match(regex);

  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const o = parseInt(match[4], 10);

  // Inverser les couleurs
  const invertedR = 255 - r;
  const invertedG = 255 - g;
  const invertedB = 255 - b;

  return `rgba(${invertedR}, ${invertedG}, ${invertedB}, ${o})`;
}

function invertColors(ctx) {
  const numberOfIterations = 6;
  const interval = 300; // en millisecondes

  for (let i = 0; i < numberOfIterations; i++) {
    setTimeout(() => {
      snake.forEach(segment => {
        segment.color = invertRGBColor(segment.color);
      });
      drawSnake(ctx);
    }, i * interval);
  }
}

export function isCollidingSnake(x, y, dimensions) {

  // Collision avec le corps
  for (let i = 1; i < snake.length; i++) {
    if (
      snake[i].x < x + dimensions &&
      snake[i].x + 20 > x &&
      snake[i].y < y + dimensions &&
      snake[i].y + 20 > y
    ) {
      return true; // Collision détectée
    }
    return false; // Pas de collision
  }
}
