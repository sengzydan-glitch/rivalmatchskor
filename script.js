const players = {
  1: { score: 0, name: 'PLAYER ONE' },
  2: { score: 0, name: 'PLAYER TWO' }
};

const scoreElements = {
  1: document.getElementById('score-1'),
  2: document.getElementById('score-2')
};

const nameElements = {
  1: document.getElementById('name-1'),
  2: document.getElementById('name-2')
};

function renderPlayer(playerNumber) {
  const player = players[playerNumber];
  scoreElements[playerNumber].textContent = player.score;
  nameElements[playerNumber].textContent = player.name;
  document.querySelector(`[data-player="${playerNumber}"] .score-button`)
    .setAttribute('aria-label', `Tambah skor ${player.name}, skor saat ini ${player.score}`);
}

function addPoint(playerNumber) {
  players[playerNumber].score += 1;
  renderPlayer(playerNumber);
}

function editName(playerNumber) {
  const currentName = players[playerNumber].name;
  const enteredName = window.prompt(`Masukkan nama untuk pemain ${playerNumber}:`, currentName);

  if (enteredName === null) return;

  const cleanName = enteredName.trim().replace(/\s+/g, ' ').slice(0, 20);
  if (cleanName.length === 0) {
    window.alert('Nama tidak boleh kosong.');
    return;
  }

  players[playerNumber].name = cleanName.toUpperCase();
  renderPlayer(playerNumber);
}

function resetScores() {
  const shouldReset = window.confirm('Reset skor kedua pemain ke 0?');
  if (!shouldReset) return;

  players[1].score = 0;
  players[2].score = 0;
  renderPlayer(1);
  renderPlayer(2);
}

document.querySelectorAll('.score-card').forEach((card) => {
  const playerNumber = Number(card.dataset.player);
  card.querySelector('.score-button').addEventListener('click', () => addPoint(playerNumber));
});

document.getElementById('edit-1').addEventListener('click', () => editName(1));
document.getElementById('edit-2').addEventListener('click', () => editName(2));
document.getElementById('reset').addEventListener('click', resetScores);

renderPlayer(1);
renderPlayer(2);
