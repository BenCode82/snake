export function shiftSquare() {
  let iteration = 4;

  // showMessage("OOOhhhhHHH, ça bouge.............");

  shiftInterval = setInterval(() => {

    if (Math.floor(Math.random() > 0.8)) { squarePosX += 20 }
    else if (Math.floor(Math.random() > 0.6)) { squarePosY += 20 }


  }, 1000); // Intervalle de 1 seconde
}
