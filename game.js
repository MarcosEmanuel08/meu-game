const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 180, y: 520, size: 20, speed: 5 };
let enemies = [];
let score = 0;
let gameRunning = false;

const hitSound = document.getElementById("hitSound");

// Criar inimigos
function spawnEnemy() {
  enemies.push({
    x: Math.random() * 380,
    y: -20,
    size: 20,
    speed: 3 + Math.random() * 3
  });
}

// Resetar jogo
function resetGame() {
  enemies = [];
  score = 0;
  player.x = 180;
  gameRunning = false;
  document.getElementById("scoreDisplay").innerText = score;
}

// Colisão
function isColliding(a, b) {
  return !(
    a.x + a.size < b.x ||
    a.x > b.x + b.size ||
    a.y + a.size < b.y ||
    a.y > b.y + b.size
  );
}

// Movimentação por toque
let touchX = null;

canvas.addEventListener("touchstart", e => {
  touchX = e.touches[0].clientX;
});

canvas.addEventListener("touchmove", e => {
  let delta = e.touches[0].clientX - touchX;
  touchX = e.touches[0].clientX;
  player.x += delta;
});

canvas.addEventListener("touchend", () => {
  touchX = null;
});

// Loop do jogo
function update() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, 400, 600);

  // Jogador
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Atualizar inimigos
  for (let e of enemies) {
    e.y += e.speed;

    ctx.fillStyle = "red";
    ctx.fillRect(e.x, e.y, e.size, e.size);

    if (isColliding(player, e)) {
      hitSound.play();
      gameOver();
    }
  }

  // Remover inimigos fora da tela e contar pontos
  enemies = enemies.filter(e => {
    if (e.y > 620) {
      score++;
      document.getElementById("scoreDisplay").innerText = score;
      return false;
    }
    return true;
  });

  // Spawn contínuo
  if (Math.random() < 0.03) {
    spawnEnemy();
  }

  requestAnimationFrame(update);
}

// Game Over
function gameOver() {
  gameRunning = false;
  document.getElementById("btnRestart").style.display = "block";
}

// Botões
document.getElementById("btnStart").onclick = () => {
  resetGame();
  document.getElementById("btnStart").style.display = "none";
  document.getElementById("btnRestart").style.display = "none";
  gameRunning = true;
  update();
};

document.getElementById("btnRestart").onclick = () => {
  resetGame();
  document.getElementById("btnRestart").style.display = "none";
  gameRunning = true;
  update();
};