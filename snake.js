import { getGameRunning, endGame } from './game.js';
import { newRandomColor, drawRoundedRect, getSquareColor, setRandomX, getRandomX, getRandomY } from './utils.js';
import { addCollision } from './score.js';


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
  const newColor = newRandomColor();
  snake = [
    { x: 180, y: 180, color: newColor },
    { x: 160, y: 180, color: newColor }
  ];
}

export function collisionDetected(canvasWidth, canvasHeight) {
  // Collision avec les murs
  if ((snake[0].x < 0 || snake[0].x > canvasWidth-20) || (snake[0].y < 0 || snake[0].y > canvasHeight-20)) {
    console.log('game over');
    endGame();
  }

  // Collision avec le corps
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      console.log('game over');
      endGame();
    }
  }

  // Collision avec le carré
  if (directionX == 20) {
    if (snake[0].x === getRandomX()-20 && snake[0].y === getRandomY()) {
      addCollision();
      return true;
    }
  }
  else if (directionX == -20) {
    if (snake[0].x === getRandomX()+20 && snake[0].y === getRandomY()) {
      addCollision();
      return true;
    }
  }
  else if (directionY == 20) {
    if (snake[0].x === getRandomX() && snake[0].y === getRandomY()-20) {
      addCollision();
      return true;
    }
  }
  else if (directionY == -20) {
    if (snake[0].x === getRandomX() && snake[0].y === getRandomY()+20) {
      addCollision();
      return true;
    }
  }

  return false;
}

// Déplacement du serpent
export function moveSnake(ctx, canvas) {

  if (collisionDetected(canvas.width, canvas.height) === true) {
    // invertColors(ctx, canvas);

    const newHead = {
        x: snake[0].x + directionX,
        y: snake[0].y + directionY,
        color: getSquareColor()
    };
    snake.unshift(newHead);

    // Ne pas retirer la queue pour que le serpent grossisse
    setRandomX(0);

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

export function drawSnake(ctx) {
  snake.forEach(segment => {
    ctx.fillStyle = segment.color;
    drawRoundedRect(ctx, segment.x, segment.y, 20, 20, 5);
  });
}

// function invertRGBColor(rgbString) {
//   // Extraire les valeurs r, g, b de la chaîne
//   const matches = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

//   if (!matches) {
//       throw new Error('Format RGB invalide. Utilisez le format "rgb(r, g, b)".');
//   }

//   // Convertir les valeurs en nombres
//   const r = parseInt(matches[1], 10);
//   const g = parseInt(matches[2], 10);
//   const b = parseInt(matches[3], 10);

//   // Inverser les couleurs
//   const invertedR = 255 - r;
//   const invertedG = 255 - g;
//   const invertedB = 255 - b;

//   // Reconstruire la chaîne RGB inversée
//   return `rgb(${invertedR}, ${invertedG}, ${invertedB})`;
// }

// function invertColors(ctx, canvas) {
//   // Inverser les couleurs
//   snake.forEach(segment => {
//     segment.color = invertRGBColor(segment.color);
//   });
// }
