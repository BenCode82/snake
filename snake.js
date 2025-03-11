import { setGameRunning, getGameRunning, endGame } from './game.js';
import { setRandomX, getRandomX, getRandomY, drawCheckerboard  } from './utils.js';

export let snake = [];
let directionX;
let directionY;

const headImage = new Image();
headImage.src = './snake_head_20x20.png';

// Fonctions pour manipuler les variables directionX et directionY
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
    { x: 100, y: 100, color: 'black' },
    { x: 80, y: 100, color: 'black' }
  ];

  directionX = 20; // Initial direction ?????????
  directionY = 0;
}

// Fonction pour détecter une collision
export function collisionDetected(canvas) {
  // Collision avec les murs
  if ((snake[0].x < 0 || snake[0].x > 380) || (snake[0].y < 0 || snake[0].y > 380)) {
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
  if (snake[0].x === getRandomX() && snake[0].y === getRandomY()) {
    setRandomX(0);
    return true;
  }

  return false;
}

// Déplacement du serpent
export function moveSnake(canvas, newcolor) {

  if (collisionDetected(canvas) === true) {
    const newHead = {
        x: snake[0].x + directionX,
        y: snake[0].y + directionY,
        color: newcolor
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
    
    // Decale les couoleurs
    snake.forEach((segment, index) => {
    if (index > 0 && index < snake.length - 1) {
      segment.color = snake[index + 1].color; // Couleur du segment suivant
    }});

    // Retire le dernier segment si pas de collision
    snake.pop();
  }

}

// Function to clear the canvas and redraw the rectangle at the new position
export function drawSnake(ctx, canvas) {

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Dessiner le damier
  drawCheckerboard(ctx, canvas.width, canvas.height, 20);

  snake.forEach(segment => {
    // console.log(segment);

    ctx.fillStyle = segment.color;
    ctx.fillRect(segment.x, segment.y, 20, 20);
  });
}
