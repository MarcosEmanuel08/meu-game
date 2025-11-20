window.addEventListener("load", resizeGame);
window.addEventListener("resize", resizeGame);

function resizeGame() {
  const canvas = document.getElementById("gameCanvas");
  const container = document.getElementById("game-container");

  let maxHeight = window.innerHeight * 0.95;
  let scale = maxHeight / 600;

  canvas.style.width = `${400 * scale}px`;
}