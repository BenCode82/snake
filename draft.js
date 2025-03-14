
const div1 = document.getElementById("container");
const div2 = document.getElementById("gameContainer");
const div3 = document.getElementById("countdown");

const rect1 = div1.getBoundingClientRect();
console.log(`X: ${rect1.left}, Y: ${rect1.top}`);

const rect2 = div2.getBoundingClientRect();
console.log(`X: ${rect2.left}, Y: ${rect2.top}`);

const rect3 = div3.getBoundingClientRect();
console.log(`X: ${rect3.left}, Y: ${rect3.top}`);
