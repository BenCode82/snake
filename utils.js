
export function newRandomColor() {
  let colors = [255, Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)];
  colors.sort(() => Math.random() - 0.5); // Mélanger les composantes

  return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, 1)`;
}

export function newRandomColorA(newOpacity) {
  let colors = [255, Math.floor(Math.random() * 128), Math.floor(Math.random() * 128)];
  colors.sort(() => Math.random() - 0.5); // Mélanger les composantes

  return `rgba(${colors[0]}, ${colors[1]}, ${colors[2]}, ${newOpacity})`;
}

export function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y); // Coin supérieur gauche (départ)
  ctx.lineTo(x + width - radius, y); // Ligne horizontale supérieure
  ctx.arcTo(x + width, y, x + width, y + radius, radius); // Coin supérieur droit
  ctx.lineTo(x + width, y + height - radius); // Ligne verticale droite
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius); // Coin inférieur droit
  ctx.lineTo(x + radius, y + height); // Ligne horizontale inférieure
  ctx.arcTo(x, y + height, x, y + height - radius, radius); // Coin inférieur gauche
  ctx.lineTo(x, y + radius); // Ligne verticale gauche
  ctx.arcTo(x, y, x + radius, y, radius); // Coin supérieur gauche
  ctx.closePath();
  ctx.fill();
}

export function interpolateColor(color1, color2) {
  const regex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d+.*)\)/;
  const match1 = color1.match(regex);
  const match2 = color2.match(regex);

  const r1 = parseInt(match1[1], 10);
  const g1 = parseInt(match1[2], 10);
  const b1 = parseInt(match1[3], 10);
  const r2 = parseInt(match2[1], 10);
  const g2 = parseInt(match2[2], 10);
  const b2 = parseInt(match2[3], 10);

  // Interpoler chaque composante
  const r = Math.round((r1 + r2)/2);
  const g = Math.round((g1 + g2)/2);
  const b = Math.round((b1 + b2)/2);

  return `rgba(${r}, ${g}, ${b}, 1)`;
}
